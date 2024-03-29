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
  hasPlayed = false;
  isLoaded = false;
  isPlaying = false;
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
    this.hasPlayed = false;
    this.isLoaded = false;
    this.isPlaying = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.clearAlerts();
    this.joke = { id: "", joke: "", status: null };
    this.subscription = this.jokeService.getRandomJoke().subscribe(joke => {
      this.temp = joke;
      this.speechParams.Text = joke.joke;
      this.doPolly();
    });
  }

  changeVoice(voice: string) {
    this.speechParams.VoiceId = voice;
    if (voice === "Matthew" || voice === "Joanna") {
      this.speechParams.Engine = "neural";
    } else {
      delete this.speechParams.Engine;
    }
    this.doPolly();
  }
  closeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  clearAlerts() {
    this.alerts = [];
  }
  doPolly() {
    this.hasPlayed = false;
    this.isLoaded = false;
    this.isPlaying = false;
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
  }
  setupHowler(sourceUrl: string) {
    this.audio = new Howl({ src: [sourceUrl], format: ["mp3"] });
    this.audio.once("load", () => {
      this.isLoaded = true;
      this.app.tick();
    });
  }

  tellJoke() {
    this.joke = this.temp;
    this.audio.off();
    this.audio.on("end", () => {
      this.hasPlayed = true;
      this.isPlaying = false;
      setTimeout(() => {
        Howler.unload();
      }, 500);
      this.app.tick();
    });
    this.audio.play();
    this.isPlaying = true;
  }
}
