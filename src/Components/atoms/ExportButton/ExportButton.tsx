import * as React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { IPlaylistStatus } from '../../../store/playlists/playlists.interface';
import { exportPlaylist } from '../../../store/playlists/playlists.slice';

interface IProps {
  status: IPlaylistStatus;
}

const ExportButton = ({ status }: IProps) => {
  const dispatch = useAppDispatch();

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
        dispatch(exportPlaylist());
      }}
      style={{ border: status.error && '1px solid red' }}
    >
      {statusText}
    </button>
  );
};

export default ExportButton;
