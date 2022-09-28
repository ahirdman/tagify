export interface NewPlaylistBody {
  userId: string;
  token: string;
  playlistName: string;
  tracks: any[];
}

export interface ValidatePlaylistBody {
  playlistId: string;
  snapshotID: string;
  token: string;
}

export interface ValidatePlaylistReponse {
  snapshot_id: string;
}
