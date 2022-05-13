import * as React from 'react';
import { tagTrack, createTag } from '../../utils/firebase';
import { useState } from 'react';
import Plus from '../../assets/add-circle.svg';
import Add from '../../assets/add.svg';
import Tag from '../../assets/tag.svg';
import './AddTag.scss';

interface IAddTagProps {
  selectedTrack: any;
  userTags?: string[];
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
            createTag('purchasedAids', tagInput, dbTrack);
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
            userTags.map((tagName: string, index: number) => {
              return (
                <button
                  onClick={() => tagTrack('purchasedAids', tagName, dbTrack)}
                  key={index}
                  className="all-tags__tag"
                >
                  {tagName}
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
