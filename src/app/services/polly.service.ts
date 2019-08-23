import { Injectable } from "@angular/core";
import { config, CognitoIdentityCredentials, Polly } from "aws-sdk";
import { SpeechParams } from "../models/SpeechParams";

config.region = "us-west-2";
config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: "us-west-2:ff9b3fd3-e705-489e-a20f-62a22f58b1b0"
});

@Injectable({
  providedIn: "root"
})
export class PollyService {
  constructor() {}

  getPollyUrl(speechParams: SpeechParams): Promise<string> {
    console.log("Getting url from Polly...");
    const signer = new Polly.Presigner();
    console.log(typeof signer);
    return new Promise((resolve, reject) => {
      signer.getSynthesizeSpeechUrl(
        speechParams,
        700,
        (error: Error, url: string) => {
          if (error) {
            console.log("Error getting Polly URL.");
            reject(error.message);
          } else {
            console.log(speechParams.Text);
            resolve(url);
          }
        }
      );
    });
  }
}
