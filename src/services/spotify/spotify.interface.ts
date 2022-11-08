export interface IUserSavedObject {
  added_at: string;
  track: {
    album: {
      album_type: string;
      artists: [
        {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }
      ];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: [
        {
          height: number;
          url: string;
          width: number;
        },
        {
          height: number;
          url: string;
          width: number;
        },
        {
          height: number;
          url: string;
          width: number;
        }
      ];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: [
      {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }
    ];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
}

export interface SavedTracksData {
  id: string;
  title: string;
  artist: string;
  album: string;
  artworkSmall: string;
  artworkMedium: string;
  uri: string;
  duration: number;
}

export interface SavedTracksResponse {
  href: string;
  items: IUserSavedObject[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface TokenResponse {
  accessToken: string;
}

interface TopItem {
  artwork: string;
  aritst: string;
}

export interface TopItemsResponse {
  items: TopItem[];
}

export interface ProfileResponse {
  image: string;
  name: string;
  id: string;
}

export interface TokenBody {
  token: string;
}

export interface NextTracksBody {
  token: string;
  url: string;
}

export interface PlayTrackBody {
  uri: string;
  token: string;
  deviceId: string;
}

export interface PlaylistBody {
  playlistName: string;
  token: string;
  userId: string;
  tracks: string[];
}

export interface PlaylistResponse {
  playlistId: string;
  snapshotId: string;
}

export interface ValidateBody {
  playlistId: string;
  snapshotId: string;
  token: string;
}
export interface ValidateResponse {
  snapshotId: string;
}
