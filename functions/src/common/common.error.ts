import { CallableContext } from 'firebase-functions/v1/https';
import * as functions from 'firebase-functions';

export const isAuthenticated = (context: CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }
};

// TODO: Create function to validate all arguments
