import { useAppSelector } from '../../../store/hooks';
import * as React from 'react';
import { Pause, Play } from './PlaybackButton.svg';
import './PlaybackButton.scss';

interface IPlaybackButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const PlaybackButton = ({ onClick }: IPlaybackButtonProps) => {
  const isPaused = useAppSelector(state => state.playback.isPaused);

  return (
    <button className="playback-button" onClick={onClick}>
      {isPaused ? <Play /> : <Pause />}
    </button>
  );
};

export default PlaybackButton;
