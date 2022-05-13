import { IDbTrack } from '../interface';

export const matchTag = (tagArr: any[], uri: string): string[] => {
  const matched = [];

  for (let tagTree of tagArr) {
    const [tagname] = Object.keys(tagTree);
    const [tracks]: any[] = Object.values(tagTree);
    const match = tracks.filter((track: IDbTrack) => track.uri === uri);
    if (match.length > 0) matched.push(tagname);
  }

  return matched;
};
