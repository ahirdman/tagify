import {CallableContext} from "firebase-functions/v1/https";
import {cloudFunction} from "../index";

export const isAuthenticated = (context: CallableContext) => {
  if (!context.auth) {
    throw new cloudFunction.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
    );
  }
};

// TODO: Create function to validate all arguments
