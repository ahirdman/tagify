import * as React from 'react';
import useScroll from '../../../hooks/useScroll';
import { Firestore, SavedTracksData } from '../../../services';
import { useAppSelector } from '../../../store/hooks';
import { fireIdSelector } from '../../../store/user/user.slice';
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
        <ModalSelect selectedTracks={selected} onClick={onClick} listName={listName} />
        <TracksList tracks={tracks} element={listEl} onSelect={selectTrack} />
      </Modal>
    </Backdrop>
  );
};

export default AddTracksModal;

interface IProp {
  selectedTracks: SavedTracksData[];
  onClick: () => void;
  listName: string;
}

const ModalSelect = ({ selectedTracks, onClick, listName }: IProp) => {
  const user = useAppSelector(fireIdSelector);

  const addTracks = (e: React.MouseEvent<HTMLElement, MouseEvent>, tracks: SavedTracksData[]) => {
    e.preventDefault();
    Firestore.addTagsToTrack(user, listName, tracks);
    onClick();
  };

  return (
    <div className="modal-select">
      <Button title="Cancel" backgroundColor="red" />
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
