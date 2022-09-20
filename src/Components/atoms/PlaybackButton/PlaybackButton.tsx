import PlayButton from '../../../assets/playback/play-white.svg';
import PauseButton from '../../../assets/playback/pause-white.svg';
import { useAppSelector } from '../../../store/hooks';
import * as React from 'react'
import './PlaybackButton.scss'

interface IPlaybackButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const PlaybackButton = ({ onClick }: IPlaybackButtonProps) => {
  const isPaused = useAppSelector(state => state.playback.isPaused);

  return (
    <button className="playback-button" onClick={onClick}>
      {isPaused ? (
        <img className="playback-button--play" alt="PLAY" src={PlayButton} />
      ) : (
        <img className="playback-button--pause" alt="PAUSE" src={PauseButton} />
      )}
    </button>
  );
};

export default PlaybackButton;