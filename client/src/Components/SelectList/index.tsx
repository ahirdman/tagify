import * as React from 'react';
import Magnifier from '../../assets/magnifier.svg';
import './SelectList.scss';

const SelectList = () => {
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
        {/* {savedTracks.map((track, index) => {
          return (
            <li
              onClick={() => console.log('hello')}
              key={index}
              className="select-list__row"
            >
              <section className="track-list__edit">
                <p className="track-list__edit--name">name</p>
                <p className="track-list__edit--delete">del
                </p>
              </section>
            </li>
          );
        })} */}
      </ul>
    </fieldset>
  );
};

export default SelectList;
