export interface UserResponse {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: any;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      height: any;
      url: string;
      width: any;
    }
  ];
  product: string;
  type: string;
  uri: string;
}

export interface ITopResponse {
  href: string;
  items: any[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface NextTracksBody {
  token: string;
  url: string;
}
