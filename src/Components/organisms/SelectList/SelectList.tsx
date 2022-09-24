import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import Edit from '../../../assets/edit.svg';
import Delete from '../../../assets/trashcan.svg';
import './SelectList.scss';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { onSnapshot } from 'firebase/firestore';
import { CardNav } from '../../molecules';
import { ITags } from '../../../common/common.interface';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedList } from '../../../store/playlists/playlists.slice';

const SelectList = () => {
  const [lists, setLists] = React.useState([] as ITags[]);

  const dispatch = useAppDispatch();

  const fireId = useAppSelector(state => state.user.fireId);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagCol(fireId), collection => {
      const tags: ITags[] = [];

      collection.forEach(doc => {
        const data = doc.data();
        tags.push({ name: data.name, color: data.color });
      });

      setLists(tags);
    });

    return () => {
      unsubscribe();
    };
  }, [fireId]);

  return (
    <div className="select-list">
      <CardNav title="Lists" />
      <form className="select-list__search">
        <input type="text" className="select-list__search--input" />
        <img src={Magnifier} alt="search" className="select-list__search--icon" />
      </form>
      <section className="select-list__header">
        <p className="select-list__header--title">TAGS</p>
      </section>
      <ul className="select-list__list">
        {lists.map((tag, index) => {
          return (
            <li
              onClick={() => dispatch(setSelectedList({ selectedList: tag.name }))}
              key={index}
              className="select-list__row"
            >
              <section className="select-list__details">
                <div
                  className="select-list__details--circle"
                  style={{ background: tag.color }}
                ></div>
                <p className="select-list__details--title">{tag.name}</p>
              </section>
              <section className="select-list__options">
                <button className="select-list__edit" onClick={() => console.log('edit')}>
                  <img src={Edit} alt="edit" className="select-list__edit--icon" />
                </button>
                <button
                  className="select-list__delete"
                  onClick={() => {
                    Firestore.deleteList(fireId, tag.name);
                  }}
                >
                  <img src={Delete} alt="delete" className="select-list__delete--icon" />
                </button>
              </section>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectList;
