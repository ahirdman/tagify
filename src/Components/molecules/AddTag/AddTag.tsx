import * as React from 'react';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import './AddTag.scss';
import { useAppSelector } from '../../../store/hooks';
import { fireIdSelector } from '../../../store/user/user.slice';
import { selectedTrackSelector } from '../../../store/savedTracks/savedTracks.slice';
import { v4 as uuidv4 } from 'uuid';
import { randomizeTagColor } from '../../../styles/style';

const AddTag = () => {
  const [tagInput, setTagInput] = React.useState('');
  const selectedTrack = useAppSelector(selectedTrackSelector);
  const fireId = useAppSelector(fireIdSelector);

  return (
    <section className="add-tag">
      <h2 className="add-tag__title">ADD TAG</h2>
      <form className="add-tag__search">
        <input
          className="add-tag__search--input"
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
        />
        <button
          className="add-tag__search--button"
          onClick={e => {
            e.preventDefault();
            Firestore.createList(fireId, uuidv4(), tagInput, randomizeTagColor(), 'TAG', [
              selectedTrack,
            ]);
            setTagInput('');
          }}
        ></button>
      </form>
    </section>
  );
};

export default AddTag;
