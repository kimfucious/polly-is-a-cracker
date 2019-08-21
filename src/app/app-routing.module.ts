import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PollyJokeComponent } from "./components/polly-joke/polly-joke.component";
import { ByojJokeComponent } from "./components/byoj-joke/byoj-joke.component";

const routes: Routes = [
  { path: "", component: PollyJokeComponent },
  { path: "byoj", component: ByojJokeComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
