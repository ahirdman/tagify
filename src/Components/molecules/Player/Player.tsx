import './Player.scss';
import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';
import useSpotifySDK from '../../../hooks/useSpotifySDK';
import { Body, PlaybackButton } from '../../atoms';
import { isActiveSelector, playBackInfoSelector } from '../../../store/playback/playback.slice';

const Player = () => {
  const player = useSpotifySDK();
  const isActive = useAppSelector(isActiveSelector);

  if (!isActive) {
    return <section className="player player--inactive"></section>;
  } else {
    return (
      <div className="player">
        <PlayBackInfo />
        <PlaybackButton onClick={() => player.togglePlay()} />
      </div>
    );
  }
};

export const PlayBackInfo = () => {
  const { image, name, artist } = useAppSelector(playBackInfoSelector);

  return (
    <div className="player__track">
      <img src={image} alt="album cover" className="player__artwork" />
      <div className="player__info">
        <Body className="player__info--name">{name}</Body>
        <Body>{artist}</Body>
      </div>
    </div>
  );
};

export default Player;
