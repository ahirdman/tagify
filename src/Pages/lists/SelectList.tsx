import * as React from 'react';
import { getAllTags } from '../../store/playlists/playlists.slice';
import { useAppDispatch } from '../../store/hooks';
import { MixedList, TagList } from '../../Components/organisms';
import { Divider } from '../../Components/molecules';
import Card from '../../Layout/Card/Card';

const SelectList = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

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
