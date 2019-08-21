import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { voices } from "../../data/voices";

@Component({
  selector: "app-polly-form",
  templateUrl: "./polly-form.component.html",
  styleUrls: ["./polly-form.component.scss"]
})
export class PollyFormComponent implements OnInit {
  @Output() voiceChange: EventEmitter<string> = new EventEmitter();
  model = { voice: "Joanna" };
  voices: string[];

  constructor() {}

  ngOnInit() {
    this.voices = voices;
  }

  onVoiceChange() {
    this.voiceChange.emit(this.model.voice);
  }
}
