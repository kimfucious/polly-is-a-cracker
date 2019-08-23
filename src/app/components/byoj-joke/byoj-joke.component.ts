import { Alert } from "../../models/Alert";
import { Component, OnInit, ApplicationRef } from "@angular/core";
import { Howl, Howler } from "howler";
import { PollyService } from "src/app/services/polly.service";
import { SpeechParams } from "src/app/models/SpeechParams";
import { Subscription } from "rxjs";

@Component({
  selector: "app-byoj-joke",
  templateUrl: "./byoj-joke.component.html",
  styleUrls: ["./byoj-joke.component.scss"]
})
export class ByojJokeComponent implements OnInit {
  alerts: Alert[];
  audio: Howl;
  audioSource: string;
  hasPlayed = false;
  isLoaded = false;
  isPlaying = false;
  joke: string;
  showSpinner = false;
  speechParams: SpeechParams;
  subscription: Subscription;
  constructor(
    private app: ApplicationRef,
    private pollyService: PollyService
  ) {}

  ngOnInit() {
    this.speechParams = {
      Engine: "neural",
      OutputFormat: "mp3",
      SampleRate: "16000",
      Text: "",
      TextType: "text",
      VoiceId: "Joanna"
    };

    // this.audio.addEventListener("canplaythrough", () => {
    //   this.showSpinner = false;
    //   this.audio.play();
    // });
  }
  changeJoke(joke: string) {
    this.joke = joke;
  }
  changeVoice(voice: string) {
    this.speechParams.VoiceId = voice;
    if (voice === "Matthew" || voice === "Joanna") {
      this.speechParams.Engine = "neural";
    } else {
      delete this.speechParams.Engine;
    }
    if (this.joke) {
      this.buildNewUserJoke(this.joke, true);
    }
  }
  closeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  clearAlerts() {
    this.alerts = [];
  }

  startNewUserJoke(joke: string) {
    this.joke = joke;
    this.buildNewUserJoke(joke);
  }
  async buildNewUserJoke(joke: string, isVoiceChanged: boolean = false) {
    if (this.speechParams.Text === joke && !isVoiceChanged) {
      console.log("Repeat!");
      this.audio.play();
    } else {
      this.hasPlayed = false;
      this.isLoaded = false;
      this.isPlaying = false;
      this.speechParams.Text = joke;
      this.showSpinner = true;
      try {
        const url = await this.pollyService.getPollyUrl(this.speechParams);
        this.audio = new Howl({ src: [url], format: ["mp3"] });
        this.audio.once("load", () => {
          this.showSpinner = false;
          this.isLoaded = true;
          this.app.tick();
        });
        this.audio.load();
      } catch (error) {
        this.alerts.push({ type: "danger", message: error });
      }
    }
  }
  sayNewUserJoke() {
    this.isPlaying = true;
    this.audio.play();
    this.audio.on("end", () => {
      this.isPlaying = false;
      this.hasPlayed = true;
      this.app.tick();
    });
  }
}
