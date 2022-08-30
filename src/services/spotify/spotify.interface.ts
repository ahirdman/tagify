interface ITrackImages {
  url: string;
  height: number;
  width: number;
}

/**
 * Used by firestore helper, passed in with "selectedTrack"
 */
export interface ITrack {
  album: {
    images: ITrackImages[];
    name: string;
    uri: string;
  };
  artists: [
    {
      name: string;
      uri: string;
    }
  ];
  duration_ms: number;
  id: string;
  is_playable: boolean;
  linked_from: {
    id?: string;
    uri?: string;
  };
  media_type: string;
  name: string;
  track_type: string;
  type: string;
  uid: string;
  uri: string;
}

/**
 * Interface for each saved track stored in redux state
 */
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

export interface ISavedTrack {
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
}

export interface HTTPUserTracksResponse {
  href: string;
  items: IUserSavedObject[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SavedTracksData {
  name: string;
  artist: string;
  album: string;
  artworkSmall: string;
  artworkMedium: string;
  uri: string;
}
