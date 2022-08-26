import * as React from 'react';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import Add from '../../../assets/add.svg';
import Tag from '../../../assets/tag.svg';
import './AddTag.scss';
import { UserContext } from '../../../context/UserContext';
import {
  extractTrackInfo,
  randomizeTagColor,
} from '../../../services/firebase/firestore/firestore.helper';

interface IAddTagProps {
  selectedTrack: any;
}

const AddTag = ({ selectedTrack }: IAddTagProps) => {
  const [tagInput, setTagInput] = React.useState('');

  const user = React.useContext(UserContext);

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
        <img src={Tag} alt="tag" className="add-tag__search--tag" />
        <button
          className="add-tag__search--button"
          onClick={e => {
            e.preventDefault();
            Firestore.createTag(
              user.fireId,
              tagInput,
              randomizeTagColor(),
              extractTrackInfo(selectedTrack)
            );
            setTagInput('');
          }}
        >
          <img src={Add} alt="check" className="add-tag__search--check" />
        </button>
      </form>
    </section>
  );
};

export default AddTag;
