import { Injectable } from "@angular/core";
import * as AWS from "aws-sdk";
import { SpeechParams } from "../models/SpeechParams";

AWS.config.region = "us-west-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-west-2:ff9b3fd3-e705-489e-a20f-62a22f58b1b0"
});

@Injectable({
  providedIn: "root"
})
export class PollyService {
  constructor() {}

  getPollyUrl(speechParams: SpeechParams): Promise<string> {
    const signer = new AWS.Polly.Presigner();
    return new Promise((resolve, reject) => {
      signer.getSynthesizeSpeechUrl(
        speechParams,
        700,
        (error: Error, url: string) => {
          if (error) {
            console.log("Error getting Polly URL.");
            reject(error.message);
          } else {
            resolve(url);
          }
        }
      );
    });
  }
}
