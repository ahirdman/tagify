import * as React from 'react';
import './SelectList.scss';
import Card from '../../../Layout/Card/Card';
import Taglist from '../TagLists/Taglist';
import MixedList from '../MixedList/MixedList';

const SelectList = () => {
  return (
    <Card title="Lists">
      <section className="select-list__header">
        <p className="select-list__header--title">TAGS</p>
      </section>
      <Taglist />
      <section className="select-list__header">
        <p className="select-list__header--title">MATCH TAGS</p>
      </section>
      <MixedList />
    </Card>
  );
};

export default SelectList;
