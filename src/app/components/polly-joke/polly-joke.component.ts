import { Component, OnInit, HostListener } from "@angular/core";
import { JokeService } from "src/app/services/joke.service";
import { Joke } from "src/app/models/Joke";
import { Subscription } from "rxjs";
import { config, CognitoIdentityCredentials, Polly } from "aws-sdk";
import { Alert } from "../../models/Alert";
config.region = "us-west-2";
config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: "us-west-2:ff9b3fd3-e705-489e-a20f-62a22f58b1b0"
});

@Component({
  selector: "app-polly-joke",
  templateUrl: "./polly-joke.component.html",
  styleUrls: ["./polly-joke.component.scss"]
})
export class PollyJokeComponent implements OnInit {
  alerts: Alert[];
  audio = new Audio();
  audioSource: string;
  joke: Joke;
  temp: Joke;
  showSpinner: boolean;
  subscription: Subscription;

  speechParams = {
    Engine: "neural",
    OutputFormat: "mp3",
    SampleRate: "16000",
    Text: "",
    TextType: "text",
    VoiceId: "Joanna"
  };

  constructor(private jokeService: JokeService) {}

  ngOnInit() {
    this.audio.addEventListener("canplaythrough", () => {
      this.showSpinner = false;
      this.joke = this.temp;
      this.audio.play();
    });
  }
  getNewJoke() {
    this.clearAlerts();
    this.joke = { id: "", joke: "", status: null };
    this.showSpinner = true;
    this.subscription = this.jokeService.getRandomJoke().subscribe(res => {
      this.temp = res;
      this.speechParams.Text = res.joke;
      this.speakText();
    });
  }
  changeVoice(voice: string) {
    this.speechParams.VoiceId = voice;
    if (voice === "Matthew" || voice === "Joanna") {
      this.speechParams.Engine = "neural";
    } else {
      delete this.speechParams.Engine;
    }
  }
  closeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  clearAlerts() {
    this.alerts = [];
  }
  speakText() {
    // const polly = new Polly({ apiVersion: "2016-06-10" });
    const polly = new Polly();
    // I don't know why 'polly' is bitching about expectations.
    const signer = new Polly.Presigner(this.speechParams, polly);

    signer.getSynthesizeSpeechUrl(
      this.speechParams,
      700,
      (error: Error, url: string) => {
        if (error) {
          console.log(error);
          this.alerts.push({ type: "danger", message: error.message });
          this.showSpinner = false;
        } else {
          this.audio.src = url;
          this.audio.load();
        }
      }
    );
  }
}
