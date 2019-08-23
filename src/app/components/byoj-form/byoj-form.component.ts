import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { voices } from "../../data/voices";

@Component({
  selector: "app-byoj-form",
  templateUrl: "./byoj-form.component.html",
  styleUrls: ["./byoj-form.component.scss"]
})
export class ByojFormComponent implements OnInit {
  @Output() voiceChange: EventEmitter<string> = new EventEmitter();
  // @Output() newUserJoke: EventEmitter<string> = new EventEmitter();
  @Output() jokeChange: EventEmitter<string> = new EventEmitter();
  @Output() teachPolly: EventEmitter<string> = new EventEmitter();
  @Output() pollySpeak: EventEmitter<string> = new EventEmitter();
  @Input() showSpinner: boolean;
  @Input() hasPlayed: boolean;
  @Input() isLoaded: boolean;
  @Input() isPlaying: boolean;
  model = {
    voice: "Joanna",
    joke: ""
  };
  textAreaIsDirty = false;
  voices: string[];
  constructor() {}

  ngOnInit() {
    this.voices = voices;
  }
  onJokeChange() {
    this.textAreaIsDirty = true;
    this.jokeChange.emit(this.model.joke);
  }
  onTeachPolly() {
    console.log("teaching polly...");
    this.textAreaIsDirty = false;
    this.teachPolly.emit(this.model.joke);
  }
  onPollySpeak() {
    console.log("asking polly to speak...");
    this.textAreaIsDirty = false;
    this.pollySpeak.emit(this.model.joke);
  }
  onVoiceChange() {
    this.voiceChange.emit(this.model.voice);
  }
}
