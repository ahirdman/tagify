import * as React from 'react';
import useScroll from '../../../hooks/useScroll';
import { useAppSelector } from '../../../store/hooks';
import { Backdrop, Modal } from '../../atoms';
import { TracksList } from '../../organisms';

interface IProps {
  onClick: () => void;
}

const AddTracksModal = ({ onClick }: IProps) => {
  const listEl = React.useRef<HTMLUListElement>(null);
  const filter = '';

  const tracks = useAppSelector(state => state.savedTracks.savedTracks);

  useScroll(listEl, filter);

  return (
    <Backdrop onClick={onClick} modalPosition="BOTTOM">
      <Modal size="LARGE">
        <TracksList tracks={tracks} element={listEl} />
      </Modal>
    </Backdrop>
  );
};

export default AddTracksModal;
