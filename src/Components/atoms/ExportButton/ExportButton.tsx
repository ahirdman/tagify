import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { exportPlaylist, selectActiveTagList } from '../../../store/playlists/playlists.slice';

const ExportButton = () => {
  const selected = useAppSelector(selectActiveTagList);

  const { error, exporting, sync } = selected.status;
  const dispatch = useAppDispatch();

  const buttonText = () => {
    if (exporting) {
      return 'Exporting...';
    }

    if (error) {
      return 'Error';
    }

    if (sync === 'SYNCED') {
      return 'Nominal';
    }

    return 'Export';
  };

  const status = buttonText();

  return (
    <button
      className="playlist__button playlist__button--export"
      onClick={e => {
        e.preventDefault();
        dispatch(exportPlaylist());
      }}
      style={{ border: error && '1px solid red' }}
    >
      {status}
    </button>
  );
};

export default ExportButton;
