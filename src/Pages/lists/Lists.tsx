import * as React from 'react';
import { SelectList, EditList, EmptyCard } from '../../Components/organisms';
import List from '../../assets/list.svg';
import useWindowSize, { Window } from '../../hooks/useWindowSize';
import { useAppSelector } from '../../store/hooks';

const Lists = () => {
  const { selectedList } = useAppSelector(state => state.playlist);

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
