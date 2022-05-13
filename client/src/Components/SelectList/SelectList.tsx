import * as React from 'react';
import Magnifier from '../../assets/magnifier.svg';
import Edit from '../../assets/edit.svg';
import Delete from '../../assets/trashcan.svg';
import './SelectList.scss';
import { deleteList, tagCol } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

interface ISelectListProps {
  setSelectedList: any;
}

const SelectList = ({ setSelectedList }: ISelectListProps) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(tagCol('purchasedAids'), collection => {
      const tags: string[] = [];
      collection.forEach(doc => {
        tags.push(doc.data().name);
      });
      setLists(tags);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <fieldset className="select-list">
      <legend className="select-list__title">Lists</legend>
      <form className="select-list__search">
        <input type="text" className="select-list__search--input" />
        <img
          src={Magnifier}
          alt="search"
          className="select-list__search--icon"
        />
      </form>
      <section className="select-list__header">
        <p className="select-list__header--title">TAGS</p>
      </section>
      <ul className="select-list__list">
        {lists.map((tag, index) => {
          return (
            <li
              onClick={() => setSelectedList(tag)}
              key={index}
              className="select-list__row"
            >
              <section className="select-list__details">
                <div className="select-list__details--circle"></div>
                <p className="select-list__details--title">{tag}</p>
              </section>
              <section className="select-list__options">
                <button
                  className="select-list__edit"
                  onClick={() => console.log('edit')}
                >
                  <img
                    src={Edit}
                    alt="edit"
                    className="select-list__edit--icon"
                  />
                </button>
                <button
                  className="select-list__delete"
                  onClick={() => {
                    deleteList('purchasedAids', tag);
                  }}
                >
                  <img
                    src={Delete}
                    alt="delete"
                    className="select-list__delete--icon"
                  />
                </button>
              </section>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

export default SelectList;
