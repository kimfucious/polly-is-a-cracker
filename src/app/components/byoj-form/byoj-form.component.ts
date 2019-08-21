import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from "@angular/core";
import { voices } from "../../data/voices";

@Component({
  selector: "app-byoj-form",
  templateUrl: "./byoj-form.component.html",
  styleUrls: ["./byoj-form.component.scss"]
})
export class ByojFormComponent implements OnInit {
  @Output() voiceChange: EventEmitter<string> = new EventEmitter();
  @Output() newUserJoke: EventEmitter<string> = new EventEmitter();
  @Input() showSpinner: boolean;
  model = {
    voice: "Joanna",
    joke: ""
  };
  voices: string[];
  constructor() {}

  ngOnInit() {
    this.voices = voices;
  }
  onVoiceChange() {
    this.voiceChange.emit(this.model.voice);
  }
  onSubmit() {
    console.log(this.model.joke);
    this.newUserJoke.emit(this.model.joke);
  }
}
