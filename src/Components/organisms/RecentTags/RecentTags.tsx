import './RecentTags.scss';
import { useAppSelector } from '../../../store/hooks';
import { selectTagPlaylists } from '../../../store/playlists/playlists.slice';
import { TagSpotlight } from '../../molecules';

const RecentTags = () => {
  const taglists = useAppSelector(selectTagPlaylists);

  return (
    <div className="recent-tags">
      <h2 className="recent-tags__header">Recent Tags</h2>
      <ul>
        {taglists.slice(0, 3).map((list, index) => {
          return <TagSpotlight key={index} list={list} />;
        })}
      </ul>
    </div>
  );
};

export default RecentTags;
