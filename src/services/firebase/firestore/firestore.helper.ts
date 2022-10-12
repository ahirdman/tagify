import { v4 as uuidv4 } from 'uuid';
import { Playlist } from '../../../store/playlists/playlists.interface';
import { SavedTracksData } from '../../spotify/spotify.interface';

// interface TagObj {
//   color: string,
//   [string:] SavedTracksData[]
// }

// interface IMixedListMatch {
//   id: string;
//   name: string;
//   color: string;
// }

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

export const findMatchLists = (playlists: Playlist[]) => {};

export const createMatchLists = (playlists: Playlist[]): Playlist[] | [] => {
  const matches: Playlist[] = [];

  for (let currentPlaylist of playlists) {
    const remainingPlaylist = playlists.filter(
      otherList => otherList.name !== currentPlaylist.name
    );

    for (let iterationPlaylist of remainingPlaylist) {
      iterationPlaylist.tracks.forEach(iterationTrack => {
        currentPlaylist.tracks.forEach(currentTrack => {
          if (currentTrack.uri === iterationTrack.uri) {
            const previousMatch = matches.find(
              (matchList: Playlist) =>
                matchList.name === `${currentPlaylist.name} ${iterationPlaylist.name}` ||
                matchList.name === `${iterationPlaylist.name} ${currentPlaylist.name}`
            );

            if (previousMatch) {
              const index = matches.findIndex(
                (matchList: Playlist) =>
                  matchList.name === `${currentPlaylist.name} ${iterationPlaylist.name}` ||
                  matchList.name === `${iterationPlaylist.name} ${currentPlaylist.name}`
              );

              matches[index].tracks.push(currentTrack);
            } else {
              matches.push({
                id: uuidv4(),
                name: `${currentPlaylist.name} ${iterationPlaylist.name}`,
                color: `linear-gradient(to bottom right, ${currentPlaylist.color}, ${iterationPlaylist.color})`,
                type: 'MIXED',
                created: false,
                tracks: [currentTrack],
                exported: false,
                playlistId: '',
                snapshotId: '',
                isActive: false,
                status: {
                  sync: 'UNSYNCED',
                  exporting: false,
                  error: false,
                },
              });
            }
          }
        });
      });
    }
    return matches;
  }
  console.log(matches);
  return matches;
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
