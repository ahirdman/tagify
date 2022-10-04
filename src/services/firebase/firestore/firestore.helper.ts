import { Playlist } from '../../../store/playlists/playlists.interface';
import { SavedTracksData } from '../../spotify/spotify.interface';

// interface TagObj {
//   color: string,
//   [string:] SavedTracksData[]
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

export const createMatchLists = (tagLists: Playlist[]) => {
  const matches: any = [];

  for (let playlist of tagLists) {
    const otherLists = tagLists.filter(otherList => otherList.name !== playlist.name);

    const currentTracks = playlist.tracks;

    for (let list of otherLists) {
      const listTracks = list.tracks;

      listTracks.forEach(listTrack => {
        currentTracks.filter(track => {
          if (track.uri === listTrack.uri) {
            const previousMatch = matches.find(
              (matchList: any) =>
                matchList.name === `${playlist.name} ${list.name}` ||
                matchList.name === `${list.name} ${playlist.name}`
            );

            if (previousMatch) {
              const index = matches.findIndex(
                (matchList: any) =>
                  matchList.name === `${playlist.name} ${list.name}` ||
                  matchList.name === `${list.name} ${playlist.name}`
              );

              matches[index].tracks.push(track);
            } else {
              matches.push({
                name: `${playlist.name} ${list.name}`,
                color: 'random',
                tracks: [track],
                exported: false,
                playlistId: '789',
                snapshotId: '789',
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
