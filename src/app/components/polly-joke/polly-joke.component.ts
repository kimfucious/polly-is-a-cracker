import { Component, OnInit, OnDestroy, ApplicationRef } from "@angular/core";
import { Alert } from "../../models/Alert";
import { Howl, Howler } from "howler";
import { Joke } from "src/app/models/Joke";
import { JokeService } from "src/app/services/joke.service";
import { SpeechParams } from "src/app/models/SpeechParams";
import { Subscription } from "rxjs";
import { PollyService } from "src/app/services/polly.service";

@Component({
  selector: "app-polly-joke",
  templateUrl: "./polly-joke.component.html",
  styleUrls: ["./polly-joke.component.scss"]
})
export class PollyJokeComponent implements OnInit, OnDestroy {
  alerts: Alert[];
  audio: any;
  isLoaded = false;
  isPlayed = false;
  joke: Joke = { id: "9999", joke: "", status: null };
  temp: Joke = { id: "", joke: "", status: null };
  speechParams: SpeechParams;
  subscription: Subscription;

  constructor(
    private app: ApplicationRef,
    private jokeService: JokeService,
    private pollyService: PollyService
  ) {}
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.speechParams = {
      Engine: "neural",
      OutputFormat: "mp3",
      SampleRate: "16000",
      Text: "",
      TextType: "text",
      VoiceId: "Joanna"
    };

    this.getNewJoke();
  }

  getNewJoke() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.isLoaded = false;
    this.clearAlerts();
    this.joke = { id: "", joke: "", status: null };
    console.log("Getting new joke...");
    this.subscription = this.jokeService.getRandomJoke().subscribe(joke => {
      this.temp = joke;
      this.speechParams.Text = joke.joke;
      this.pollyService
        .getPollyUrl(this.speechParams)
        .then(url => {
          this.setupHowler(url);
        })
        .catch(error => {
          console.log("Error preparing joke: ", error);
          this.alerts.push({ type: "danger", message: error.message });
          this.app.tick();
        });
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

  setupHowler(sourceUrl: string) {
    console.log("creating howler...");
    console.log(sourceUrl);
    this.audio = new Howl({ src: [sourceUrl], format: ["mp3"] });
    console.log(this.audio._src);
    this.audio.once("load", () => {
      console.log("Loaded!");
      this.isLoaded = true;
      this.app.tick();
    });
  }

  tellJoke() {
    this.joke = this.temp;
    this.audio.play();
    this.audio.on("end", () => {
      console.log("Played!");
      this.isPlayed = true;
      Howler.unload();
      this.audio = {};
      this.app.tick();
    });
  }
}
