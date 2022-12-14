import { Backdrop, Form, Modal } from '../../atoms';
import { useAppDispatch } from '../../../store/hooks';
import { createTag } from '../../../store/playlists/playlists.slice';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { IPlaylist } from '../../../store/playlists/playlists.interface';
import { randomizeTagColor } from '../../../styles/style';

interface IProps {
  onClick: () => void;
}

const CreateTag = ({ onClick }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitTag = async (input: string) => {
    const newTag: IPlaylist = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      favourite: false,
      name: input,
      color: randomizeTagColor(),
      type: 'TAG',
      tracks: [],
      exported: false,
      spotifyId: '',
      snapshotId: '',
      status: {
        sync: 'UNSYNCED',
        exporting: false,
        error: false,
      },
    };

    try {
      await dispatch(createTag(newTag));
      navigate(`/lists/${newTag.id}`);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  return (
    <Backdrop onClick={onClick}>
      <Modal>
        <Form type="text" placeholder="Tag Name" submitValue="Create" onSubmit={submitTag} />
      </Modal>
    </Backdrop>
  );
};

export default CreateTag;
