import * as React from 'react';
import useScroll from '../../../hooks/useScroll';
import { SavedTracksData } from '../../../services';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { tagTrack } from '../../../store/playlists/playlists.slice';
import { Backdrop, Button, Modal } from '../../atoms';
import { TracksList } from '../../organisms';
import './AddTracksModal.scss';

interface IProps {
  onClick: () => void;
  listName: string;
}

const AddTracksModal = ({ onClick, listName }: IProps) => {
  const listEl = React.useRef<HTMLUListElement>(null);
  const filter = '';

  const tracks = useAppSelector(state => state.savedTracks.savedTracks);

  const [selected, setSelected] = React.useState([] as SavedTracksData[]);
  useScroll(listEl, filter);

  const selectTrack = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, track: SavedTracksData) => {
    e.preventDefault();

    const currentlyActive = selected.some(selected => selected.id === track.id);

    if (currentlyActive) {
      const filteredState = selected.filter(stateTrack => stateTrack.id !== track.id);

      setSelected(filteredState);
    } else {
      setSelected([...selected, track]);
    }
  };

  return (
    <Backdrop onClick={onClick} modalPosition="BOTTOM">
      <Modal type="FULL">
        <ModalSelect
          selectedTracks={selected}
          setSelectedTracks={setSelected}
          onClick={onClick}
          playlistName={listName}
        />
        <TracksList tracks={tracks} element={listEl} onSelect={selectTrack} />
      </Modal>
    </Backdrop>
  );
};

export default AddTracksModal;

interface IProp {
  selectedTracks: SavedTracksData[];
  setSelectedTracks: (tracks: SavedTracksData[]) => void;
  onClick: () => void;
  playlistName: string;
}

const ModalSelect = ({ selectedTracks, setSelectedTracks, onClick, playlistName }: IProp) => {
  const dispatch = useAppDispatch();

  const addTracks = (e: React.MouseEvent<HTMLElement, MouseEvent>, tracks: SavedTracksData[]) => {
    e.preventDefault();
    dispatch(tagTrack({ playlistName, tracks }));
    onClick();
  };

  return (
    <div className="modal-select">
      <Button title="Clear" backgroundColor="red" onClick={() => setSelectedTracks([])} />
      <div className="modal-select__selection">
        <p>{selectedTracks.length} tracks</p>
      </div>
      <Button
        title="Add"
        backgroundColor="black"
        textColor="white"
        onClick={e => addTracks(e, selectedTracks)}
      />
    </div>
  );
};
