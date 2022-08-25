import * as React from 'react';
import { SelectList, EditList, EmptyCard } from '../../Components/organisms';
import List from '../../assets/list.svg';
import { IWindow } from '../../services/spotify/spotify.interface';
import useWindowSize from '../../hooks/useWindowSize';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

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
