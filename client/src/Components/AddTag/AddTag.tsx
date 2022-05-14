import * as React from 'react';
import { tagTrack, createTag } from '../../utils/firebase';
import { useState } from 'react';
import Plus from '../../assets/add-circle.svg';
import Add from '../../assets/add.svg';
import Tag from '../../assets/tag.svg';
import './AddTag.scss';
import { randomColor } from '../../utils/modules/db';
import { ITags } from '../../utils/interface';

interface IAddTagProps {
  selectedTrack: any;
  userTags?: ITags[];
}

const AddTag = ({ selectedTrack, userTags }: IAddTagProps) => {
  const [tagInput, setTagInput] = useState('');

  const dbTrack = {
    artist: selectedTrack.artists[0].name,
    title: selectedTrack.name,
    artwork: selectedTrack.album.images[2].url,
    uri: selectedTrack.uri,
  };

  return (
    <fieldset className="add-tag">
      <legend className="add-tag__title">Add Tag</legend>
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
            createTag('purchasedAids', tagInput, randomColor(), dbTrack);
            setTagInput('');
          }}
        >
          <img src={Add} alt="check" className="add-tag__search--check" />
        </button>
      </form>
      <section className="all-tags">
        <p className="all-tags__title">MY TAGS</p>
        <section className="all-tags__container">
          {userTags &&
            userTags.map((tag: ITags, index: number) => {
              return (
                <button
                  onClick={() => tagTrack('purchasedAids', tag.name, dbTrack)}
                  key={index}
                  className="all-tags__tag"
                  style={{ background: tag.color }}
                >
                  {tag.name}
                  <img src={Plus} alt="add" className="all-tags__tag--action" />
                </button>
              );
            })}
        </section>
      </section>
    </fieldset>
  );
};

export default AddTag;
