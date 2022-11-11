import * as React from 'react';
import { Backdrop, Form, Modal } from '../../atoms';
import { useAppDispatch } from '../../../store/hooks';
import { createTag } from '../../../store/playlists/playlists.slice';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { randomizeTagColor } from '../../../services/firebase/firestore/firestore.helper';
import { Playlist } from '../../../store/playlists/playlists.interface';

interface IProps {
  onClick: () => void;
}

const CreateTag = ({ onClick }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitTag = async (input: string) => {
    const newTag: Playlist = {
      id: uuidv4(),
      name: input,
      color: randomizeTagColor(),
      type: 'TAG',
      tracks: [],
      exported: false,
      playlistId: '',
      snapshotId: '',
      isActive: false,
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
