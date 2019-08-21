import { Component, OnInit } from "@angular/core";
import { JokeService } from "src/app/services/joke.service";
import { Joke } from "src/app/models/Joke";
import { SpeechParams } from "src/app/models/SpeechParams";
import { Subscription } from "rxjs";
import { config, CognitoIdentityCredentials, Polly } from "aws-sdk";
import { Alert } from "../../models/Alert";

config.region = "us-west-2";
config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: "us-west-2:ff9b3fd3-e705-489e-a20f-62a22f58b1b0"
});

@Component({
  selector: "app-byoj-joke",
  templateUrl: "./byoj-joke.component.html",
  styleUrls: ["./byoj-joke.component.scss"]
})
export class ByojJokeComponent implements OnInit {
  alerts: Alert[];
  audio = new Audio();
  audioSource: string;
  joke: Joke;
  temp: Joke;
  showSpinner: boolean;
  speechParams: SpeechParams;
  subscription: Subscription;
  constructor() {}

  ngOnInit() {
    this.speechParams = {
      Engine: "neural",
      OutputFormat: "mp3",
      SampleRate: "16000",
      Text: "",
      TextType: "text",
      VoiceId: "Joanna"
    };

    this.audio.addEventListener("canplaythrough", () => {
      this.showSpinner = false;
      this.joke = this.temp;
      this.audio.play();
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
  sayNewUserJoke(joke: string) {
    this.speechParams.Text = joke;
    this.showSpinner = true;
    this.speakText();
  }
  speakText() {
    const signer = new Polly.Presigner();

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
