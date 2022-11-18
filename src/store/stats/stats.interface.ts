export interface IStatistics {
  taggedTracks: number;
  createdTags: number;
  createdMixes: number;
  totalSavedTracks: number;
}

export interface ISetTaggedTracksPayload {
  amount: number;
}
