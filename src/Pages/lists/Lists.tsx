import * as React from 'react';
import { SelectList, EditList, EmptyCard } from '../../Components/organisms';
import List from '../../assets/list.svg';
import useWindowSize, { Window } from '../../hooks/useWindowSize';

const Lists = () => {
  const [selectedList, setSelectedList] = React.useState();

  const size: Window = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <SelectList setSelectedList={setSelectedList} />
        {selectedList ? (
          <EditList selectedList={selectedList} />
        ) : (
          <EmptyCard icon={List} item="list" />
        )}
      </div>
    );
  }

  return (
    <>
      {selectedList ? (
        <EditList
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      ) : (
        <SelectList setSelectedList={setSelectedList} />
      )}
    </>
  );
};

export default Lists;
