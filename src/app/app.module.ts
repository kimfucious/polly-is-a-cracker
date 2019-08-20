import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PollyTitleComponent } from "./components/polly-title/polly-title.component";
import { PollyFormComponent } from "./components/polly-form/polly-form.component";
import { PollyFooterComponent } from "./components/polly-footer/polly-footer.component";
import { JokeService } from "./services/joke.service";
import { PollyJokeComponent } from "./components/polly-joke/polly-joke.component";
import { ModalComponent } from "./components/modal/modal.component";

@NgModule({
  declarations: [
    AppComponent,
    PollyTitleComponent,
    PollyFormComponent,
    PollyFooterComponent,
    PollyJokeComponent,
    ModalComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule],
  providers: [JokeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
