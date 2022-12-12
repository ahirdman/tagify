import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { IPlaylistStatus } from '../../../store/playlists/playlists.interface';
import { exportPlaylist } from '../../../store/playlists/playlists.slice';
import './Buttons.scss';
import { Add, Back, Delete, Pause, Play } from './Buttons.svg';

interface IButtonsProps {
  title: string;
  backgroundColor: string;
  textColor?: string;
  width?: string;
  border?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Button = ({
  title,
  backgroundColor,
  textColor,
  width,
  border,
  onClick,
}: IButtonsProps) => {
  return (
    <button
      className="button"
      style={{
        backgroundColor,
        color: textColor,
        width,
        border,
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

interface ITextButtonProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
}

export const TextButton = ({ title, active, onClick }: ITextButtonProps) => {
  return (
    <button className="text-button" onClick={onClick}>
      <h2 className={active ? 'text-button__text--active' : 'text-button__text'}>{title}</h2>
    </button>
  );
};

interface IExportButtonProps {
  status: IPlaylistStatus;
}

export const ExportButton = ({ status }: IExportButtonProps) => {
  const dispatch = useAppDispatch();
  const { playlistId } = useParams();

  const buttonText = () => {
    if (status.exporting) {
      return 'Exporting...';
    }

    if (status.error) {
      return 'Error';
    }

    if (status.sync === 'SYNCED') {
      return 'Nominal';
    }

    return 'Export';
  };

  const statusText = buttonText();

  return (
    <button
      className="playlist__button playlist__button--export"
      onClick={e => {
        e.preventDefault();
        dispatch(exportPlaylist(playlistId));
      }}
      style={{
        backgroundColor: status.error ? '#150000' : '#150c00',
        border: status.error ? '1px solid #e43131' : '1px solid #f6a943',
        color: status.error ? '#cd3e3e' : '#d79d51',
      }}
    >
      {statusText}
    </button>
  );
};

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="back-button"
      onClick={e => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <Back />
    </button>
  );
};

interface ITagButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  color: string;
  name: string;
  tagAction: 'ADD' | 'DELETE';
}

export const TagButton = ({ onClick, color, name, tagAction }: ITagButtonProps) => {
  return (
    <button onClick={onClick} className="tag" style={{ background: color }}>
      {name}
      {tagAction === 'ADD' ? <Add className="tag--action" /> : <Delete className="tag--action" />}
    </button>
  );
};

interface IPlaybackButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const PlaybackButton = ({ onClick }: IPlaybackButtonProps) => {
  const isPaused = useAppSelector(state => state.playback.isPaused);

  return (
    <button className="playback-button" onClick={onClick}>
      {isPaused ? <Play /> : <Pause />}
    </button>
  );
};
