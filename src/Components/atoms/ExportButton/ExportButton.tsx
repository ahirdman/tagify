import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/hooks';
import { exportPlaylist, selectActiveTagList } from '../../../store/playlists/playlists.slice';

const ExportButton = () => {
  const selected = useSelector(selectActiveTagList);

  const { error, exporting, sync } = selected.status;
  const dispatch = useAppDispatch();

  // React.useEffect(() => {

  // }, [])

  const buttonText = () => {
    if (error) {
      return 'Error';
    }

    if (exporting) {
      return 'Exporting...';
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
