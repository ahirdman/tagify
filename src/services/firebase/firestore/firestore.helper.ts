import { SavedTracksData } from '../../spotify/spotify.interface';

export const matchTag = (tagArr: any[], uri: string): any[] => {
  const matched = [];

  for (let tagTree of tagArr) {
    const [, tagName] = Object.keys(tagTree);
    const [tagColor, tracks]: any[] = Object.values(tagTree);
    const match = tracks.filter((track: SavedTracksData) => track.uri === uri);
    if (match.length > 0) matched.push({ name: tagName, color: tagColor });
  }

  return matched;
};

export const randomizeTagColor = (): string => {
  const randomNumber = Math.floor(Math.random() * 7);

  switch (randomNumber) {
    case 0:
      return '#573D57';
    case 1:
      return '#874756';
    case 2:
      return '#B8433E';
    case 3:
      return '#DD542F';
    case 4:
      return '#F5823F';
    case 5:
      return '#F6A943';
    default:
      return '#FBD566';
  }
};
