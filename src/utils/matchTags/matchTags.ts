import { SavedTracksData } from '../../services';

export const matchTag = (tagArr: any[], uri: string): any[] => {
  const matched = [];

  for (let tagTree of tagArr) {
    const [, tagName] = Object.keys(tagTree);
    const [tagColor, tracks]: any[] = Object.values(tagTree);

    const match = tracks.filter((track: SavedTracksData) => track.uri === uri);

    if (match.length > 0) {
      matched.push({ name: tagName, color: tagColor });
    }
  }

  return matched;
};
