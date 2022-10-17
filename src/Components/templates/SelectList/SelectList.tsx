import * as React from 'react';
import Card from '../../../Layout/Card/Card';
import { MixedList, TagList } from '../../organisms';
import { Divider } from '../../molecules';

const SelectList = () => {
  return (
    <Card title="Tags">
      <Divider title="TAGS" />
      <TagList />
      <Divider title="MIXED TAGS" />
      <MixedList />
    </Card>
  );
};

export default SelectList;
