import * as React from 'react';
import { SelectList, EditList, EmptyCard } from '../../Components/organisms';
import List from '../../assets/list.svg';
import useWindowSize, { Window } from '../../hooks/useWindowSize';
import { selectActiveTagList } from '../../store/playlists/playlists.slice';
import { useSelector } from 'react-redux';

const Lists = () => {
  const selectedList = useSelector(selectActiveTagList);

  const size: Window = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <SelectList />
        {selectedList ? <EditList /> : <EmptyCard icon={List} item="list" />}
      </div>
    );
  }

  return <>{selectedList ? <EditList /> : <SelectList />}</>;
};

export default Lists;
