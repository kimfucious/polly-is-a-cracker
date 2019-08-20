import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-polly-form",
  templateUrl: "./polly-form.component.html",
  styleUrls: ["./polly-form.component.scss"]
})
export class PollyFormComponent implements OnInit {
  @Output() voiceChange: EventEmitter<string> = new EventEmitter();
  model = { voice: "Joanna" };
  voices = [
    "Aditi",
    "Brian",
    "Celine",
    "Emma",
    "Joanna",
    "Matthew",
    "Mathieu",
    "Mizuki",
    "Nicole",
    "Raveena",
    "Russell",
    "Seoyeon"
  ];
  constructor() {}

  ngOnInit() {}

  onVoiceChange() {
    this.voiceChange.emit(this.model.voice);
  }
}
