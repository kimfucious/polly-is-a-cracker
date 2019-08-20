import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Joke } from "../models/Joke";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ Accept: "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class JokeService {
  url = "https://icanhazdadjoke.com/";
  joke: Observable<Joke>;
  jokes: Observable<Joke[]>;

  constructor(private http: HttpClient) {}

  getRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.url, httpOptions);
  }
}
