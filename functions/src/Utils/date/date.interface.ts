export interface ExperationObj {
  expired: boolean;
  expiresIn: number | null;
}

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}
