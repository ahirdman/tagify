import * as React from 'react';
import SelectList from '../../Components/organisms/SelectList/SelectList';
import EditList from '../../Components/organisms/EditList/EditList';
import EmptyCard from '../../Components/organisms/EmptyCard/EmptyCard';
import List from '../../assets/list.svg';
import { IWindow } from '../../utils/interface';
import useWindowSize from '../../utils/hooks/window';

interface IListsProps {
  selectedList: any;
  setSelectedList: any;
  accessToken: any;
  user: any;
}

const Lists = ({
  selectedList,
  setSelectedList,
  accessToken,
  user,
}: IListsProps) => {
  const size: IWindow = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <SelectList setSelectedList={setSelectedList} />
        {selectedList ? (
          <EditList
            selectedList={selectedList}
            id={user.id}
            accessToken={accessToken}
          />
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
          id={user.id}
          accessToken={accessToken}
          setSelectedList={setSelectedList}
        />
      ) : (
        <SelectList setSelectedList={setSelectedList} />
      )}
    </>
  );
};

export default Lists;
