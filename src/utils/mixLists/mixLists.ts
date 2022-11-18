import { v4 as uuidv4 } from 'uuid';
import { IPlaylist } from '../../store/playlists/playlists.interface';
import { linearGradient } from '../../styles/style';

export interface IMixMatch {
  name: string;
  color: string;
  ids: string[];
}

// TODO::
// - Match on ids or name or both? - Currently names
// - What happens when a tag that was used to create a mix is deleted?

const uniqueMatch = (
  inputName: string,
  createdMixes: IPlaylist[],
  currentMatches: IMixMatch[]
): boolean => {
  const reversedName = inputName.split(' ').reverse().join(' ');
  const regExpInput = new RegExp(`${inputName}|${reversedName}`, 'i');

  const uniqueAgainstCreatedMixes = createdMixes
    .map(mixList => mixList.name)
    .every(createdName => !regExpInput.test(createdName));

  const uniqueAgainstCurrentMatches = currentMatches
    .map(mixList => mixList.name)
    .every(createdName => !regExpInput.test(createdName));

  return uniqueAgainstCreatedMixes && uniqueAgainstCurrentMatches;
};

export const findMixMatches = (playlists: IPlaylist[], currentMixes: IPlaylist[]): IMixMatch[] => {
  const matches: IMixMatch[] = [];

  for (let i = 0; i < playlists.length - 1; i++) {
    for (let j = 1; j < playlists.length; j++) {
      if (playlists[i].id === playlists[j].id) {
        continue;
      }

      const innerTagListTrackIds = playlists[j].tracks.map(track => track.id);
      const sameTrackInBothLists = playlists[i].tracks.some(outerTrack =>
        innerTagListTrackIds.includes(outerTrack.id)
      );

      if (!sameTrackInBothLists) {
        continue;
      }

      const name = `${playlists[i].name} ${playlists[j].name}`;

      if (uniqueMatch(name, currentMixes, matches)) {
        matches.push({
          name,
          color: linearGradient(playlists[i].color, playlists[j].color),
          ids: [playlists[i].id, playlists[j].id],
        });
      }
    }
  }

  return matches;
};

export const createListFromMatches = (mixMatch: IMixMatch, tagLists: IPlaylist[]): IPlaylist => {
  const [firstMatch, secondMatch] = tagLists.filter(list => mixMatch.ids.includes(list.id));

  const secondMatchIds = secondMatch.tracks.map(track => track.id);

  const matchedTracks = firstMatch.tracks.filter(track => secondMatchIds.includes(track.id));

  const mixedPlaylist: IPlaylist = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    favourite: false,
    name: mixMatch.name,
    color: mixMatch.color,
    type: 'MIXED',
    tracks: matchedTracks,
    exported: false,
    spotifyId: '',
    snapshotId: '',
    status: {
      sync: 'UNSYNCED',
      exporting: false,
      error: false,
    },
  };

  return mixedPlaylist;
};
