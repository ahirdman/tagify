import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import Edit from '../../../assets/edit.svg';
import Delete from '../../../assets/trashcan.svg';
import './SelectList.scss';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { onSnapshot } from 'firebase/firestore';
import { CardNav } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedList, setTagLists } from '../../../store/playlists/playlists.slice';
import { Playlist } from '../../../store/playlists/playlists.interface';

const SelectList = () => {
  const taglists = useAppSelector(state => state.playlist.tagLists);
  const fireId = useAppSelector(state => state.user.fireId);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagCol(fireId), collection => {
      const lists: Playlist[] = [];

      collection.forEach(doc => {
        const data = doc.data();

        const existingList = taglists.find(list => list.name === data.name);

        lists.push({
          name: data.name,
          color: data.color,
          tracks: data.tracks,
          exported: data.exported,
          playlistId: data.playlistId,
          snapshotId: data.snapshotId,
          isActive: existingList ? existingList.isActive : false,
          status: {
            sync: existingList ? existingList.status.sync : 'UNKNOWN',
            exporting: existingList ? existingList.status.exporting : false,
            error: existingList ? existingList.status.error : false,
          },
        });
      });

      dispatch(setTagLists({ lists }));
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch]);

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
        {taglists.map((list, index) => {
          return (
            <li
              onClick={() => {
                dispatch(setSelectedList({ selectedList: list.name }));
              }}
              key={index}
              className="select-list__row"
            >
              <section className="select-list__details">
                <div
                  className="select-list__details--circle"
                  style={{ background: list.color }}
                ></div>
                <p className="select-list__details--title">{list.name}</p>
              </section>
              <section className="select-list__options">
                <button className="select-list__edit" onClick={() => console.log('edit')}>
                  <img src={Edit} alt="edit" className="select-list__edit--icon" />
                </button>
                <button
                  className="select-list__delete"
                  onClick={() => {
                    Firestore.deleteList(fireId, list.name);
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
