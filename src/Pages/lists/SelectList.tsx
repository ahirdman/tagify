import * as React from 'react';
import Card from '../../Layout/Card/Card';
import { MixedList, TagList } from '../../Components/organisms';
import { Divider } from '../../Components/molecules';

const SelectList = () => {
  return (
    <Card title="Tags" navigate={false}>
      <Divider title="TAGS" />
      <TagList />
      <Divider title="MIXED TAGS" />
      <MixedList />
    </Card>
  );
};

export default SelectList;
