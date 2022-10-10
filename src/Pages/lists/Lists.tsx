import * as React from 'react';
import { SelectList, EditList, EmptyCard } from '../../Components/organisms';
import List from '../../assets/list.svg';
import useWindowSize, { Window } from '../../hooks/useWindowSize';
import { selectActiveTagList, setMixedLists } from '../../store/playlists/playlists.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createMatchLists } from '../../services/firebase/firestore/firestore.helper';

const Lists = () => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector(selectActiveTagList);

  const playlists = useAppSelector(state => state.playlist.tagLists);

  const size: Window = useWindowSize();

  React.useEffect(() => {
    const mixes = createMatchLists(playlists);

    if (mixes) {
      dispatch(setMixedLists({ lists: mixes }));
    }
  }, [playlists, dispatch]);

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
