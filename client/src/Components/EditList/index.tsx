import * as React from 'react';
import List from '../../assets/list.svg';
import './EditList.scss';

const EditList = () => {
  return (
    <fieldset className="edit-list">
      <legend className="edit-list__title">calm</legend>
      <section className="edit-list__empty">
        <img src={List} alt="cross" className="edit-list__empty--icon" />
        <p className="edit-list__empty--text">select a list</p>
      </section>
    </fieldset>
  );
};

export default EditList;
