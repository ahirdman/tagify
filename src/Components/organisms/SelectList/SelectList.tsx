import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import Edit from '../../../assets/edit.svg';
import Delete from '../../../assets/trashcan.svg';
import './SelectList.scss';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { CardNav } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setSelectedList,
  selectMixedPlaylists,
  selectTagPlaylists,
} from '../../../store/playlists/playlists.slice';

const SelectList = () => {
  const taglists = useAppSelector(selectTagPlaylists);
  const mixedPlaylists = useAppSelector(selectMixedPlaylists);
  const fireId = useAppSelector(state => state.user.fireId);

  const dispatch = useAppDispatch();

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
                dispatch(setSelectedList({ selectedList: list.id }));
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
      <section className="select-list__header">
        <p className="select-list__header--title">MATCH TAGS</p>
      </section>
      <ul>
        {mixedPlaylists.map((list, index) => {
          return (
            <li
              onClick={() => {
                dispatch(setSelectedList({ selectedList: list.id }));
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectList;
