interface IUser {
  image: string;
  name: string;
  id: string;
}

interface ITrack {
  album: {
    images: [
      {
        url: string;
        height: number;
        width: number;
      }
    ];
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

interface ISDKTrack {
  name: string;
  album: {
    images: [{ url: string }];
  };
  artists: [{ name: string }];
}

interface ISavedObject {
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

interface ISavedTrack {
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

interface IDbTrack {
  artist: string;
  title: string;
  artwork: string;
  uri: string;
}

interface ITags {
  name: string;
  color: string;
}

export type {
  IUser,
  ITrack,
  ISDKTrack,
  ISavedObject,
  ISavedTrack,
  IDbTrack,
  ITags,
};
