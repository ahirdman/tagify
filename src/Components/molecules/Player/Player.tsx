import PlayButton from '../../../assets/playback/play-white.svg';
import PauseButton from '../../../assets/playback/pause-white.svg';
import './Player.scss';
import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';
import useSpotifySDK from '../../../hooks/useSpotifySDK';
import {
  isActiveSelector,
  playBackInfoSelector,
} from '../../../store/playback/playback.slice';

const Player = () => {
  const player = useSpotifySDK();
  const isActive = useAppSelector(isActiveSelector);

  console.log('player rendered');

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

export default Player;

export const PlayBackInfo = () => {
  const { image, name, artist } = useAppSelector(playBackInfoSelector);

  console.log('rendered info');

  return (
    <div className="player__track">
      <img src={image} alt="album cover" className="player__artwork" />
      <div className="player__info">
        <p className="player__info--name">{name}</p>
        <p className="player__info--artist">{artist}</p>
      </div>
    </div>
  );
};

interface IPlaybackButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const PlaybackButton = ({ onClick }: IPlaybackButtonProps) => {
  const isPaused = useAppSelector(state => state.playback.isPaused);

  return (
    <button className="player__control" onClick={onClick}>
      {isPaused ? (
        <img className="player__control--play" alt="PLAY" src={PlayButton} />
      ) : (
        <img className="player__control--pause" alt="PAUSE" src={PauseButton} />
      )}
    </button>
  );
};
