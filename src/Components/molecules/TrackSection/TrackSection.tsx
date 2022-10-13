import * as React from 'react';
import { Spotify } from '../../../services';
import Play from '../../../assets/playback/play-green.svg';
import { useAppSelector } from '../../../store/hooks';
import { selectedTrackSelector } from '../../../store/savedTracks/savedTracks.slice';
import './TrackSection.scss';

const TrackSection = () => {
  const deviceId = useAppSelector(state => state.playback.deviceID);
  const selectedTrack = useAppSelector(selectedTrackSelector);
  const user = useAppSelector(state => state.user);

  return (
    <section className="track-section">
      <img src={selectedTrack.artworkMedium} alt="album" className="track-section__album" />
      <img
        onClick={() => {
          Spotify.playTrack(deviceId, user.spotify.token, selectedTrack.uri);
        }}
        src={Play}
        alt="playback"
        className="track-section__playback"
      />
      <div className="track-section__text">
        <p className="track-section__text--title">{selectedTrack.title}</p>
        <p className="track-section__text--artist">{selectedTrack.artist}</p>
        <p className="track-section__text--album">{selectedTrack.album}</p>
      </div>
    </section>
  );
};

export default TrackSection;
