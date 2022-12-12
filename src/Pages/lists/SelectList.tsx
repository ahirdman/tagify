import { createTag, getAllTags, selectTagPlaylists } from '../../store/playlists/playlists.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MixedList, TagList } from '../../Components/organisms';
import { Divider } from '../../Components/molecules';
import Card from '../../Layout/Card/Card';
import './SelectList.scss';
import { TagButton, TextButton } from '../../Components/atoms';
import { createListFromMatches, IMixMatch } from '../../utils/mixLists/mixLists';
import { useEffect, useState } from 'react';

interface IListType {
  type: 'SINGLE' | 'MIXED';
}

const SelectList = () => {
  const dispatch = useAppDispatch();
  const mixSuggestions = useAppSelector(state => state.playlist.mixSuggestions);
  const playlists = useAppSelector(selectTagPlaylists);

  const [activeListType, setActiveListType] = useState<IListType>({ type: 'SINGLE' });

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  // TODO: Creating a tag does not take the mixed suggestions data into account. Tracks are deleted as well as color.

  const handleCreateList = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    suggestion: IMixMatch
  ) => {
    e.preventDefault();
    const newMixedList = createListFromMatches(suggestion, playlists);

    dispatch(createTag(newMixedList));
  };

  return (
    <Card title="Tags" navigate={false}>
      <div className="select-list__header">
        <TextButton
          title="Single"
          active={activeListType.type === 'SINGLE'}
          onClick={() => setActiveListType({ type: 'SINGLE' })}
        />
        <TextButton
          title="Mixed"
          active={activeListType.type === 'MIXED'}
          onClick={() => setActiveListType({ type: 'MIXED' })}
        />
      </div>
      <Divider title="" />
      {activeListType.type === 'SINGLE' ? (
        <TagList />
      ) : (
        <>
          <MixedList />
          <div className="select-list__suggestions">
            {mixSuggestions.map(suggestion => (
              <TagButton
                key={suggestion.name}
                onClick={e => handleCreateList(e, suggestion)}
                color={suggestion.color}
                name={suggestion.name}
                tagAction="ADD"
              />
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default SelectList;
