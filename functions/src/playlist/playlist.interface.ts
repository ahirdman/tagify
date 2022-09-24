export interface NewPlaylistBody {
  userId: string;
  token: string;
  playlistName: string;
  tracks: any[];
}
