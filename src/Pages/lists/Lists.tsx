import * as React from 'react';
import SelectList from '../../Components/organisms/SelectList/SelectList';
import EditList from '../../Components/organisms/EditList/EditList';
import EmptyCard from '../../Components/organisms/EmptyCard/EmptyCard';
import List from '../../assets/list.svg';
import { IWindow } from '../../utils/interface';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { useContext, useState } from 'react';
import { UserContext } from '../../utils/context/UserContext';

const Lists = () => {
  const [selectedList, setSelectedList] = useState();

  const user = useContext(UserContext);

  const size: IWindow = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <SelectList setSelectedList={setSelectedList} />
        {selectedList ? (
          <EditList
            selectedList={selectedList}
            id={user.spotify.profile.id}
            accessToken={user.spotify.accessToken}
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
          id={user.spotify.profile.id}
          accessToken={user.spotify.accessToken}
          setSelectedList={setSelectedList}
        />
      ) : (
        <SelectList setSelectedList={setSelectedList} />
      )}
    </>
  );
};

export default Lists;
