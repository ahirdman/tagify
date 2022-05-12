import * as React from 'react';
import { addNewTag, addExistingTag } from '../../utils/firebase';
import { useState } from 'react';
import Plus from '../../assets/add-circle.svg';
import Add from '../../assets/add.svg';
import Tag from '../../assets/tag.svg';
import './AddTag.scss';

interface IAddTagProps {
  uri: string;
  userTags?: string[];
}

const AddTag = ({ uri, userTags }: IAddTagProps) => {
  const [tagInput, setTagInput] = useState('');

  return (
    <>
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
              addNewTag(tagInput, uri);
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
                    onClick={() => addExistingTag(tagName, uri)}
                    key={index}
                    className="all-tags__tag"
                  >
                    {tagName}
                    <img
                      src={Plus}
                      alt="add"
                      className="all-tags__tag--action"
                    />
                  </button>
                );
              })}
          </section>
        </section>
      </fieldset>
    </>
  );
};

export default AddTag;
