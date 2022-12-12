import { useAppSelector } from '../../../store/hooks';
import { selectMixedPlaylists } from '../../../store/playlists/playlists.slice';
import { PlaylistRow } from '../../molecules';
import './MixedList.scss';

const MixedList = () => {
  const mixedPlaylists = useAppSelector(selectMixedPlaylists);

  return (
    <ul className="mixedlist">
      {mixedPlaylists.map((list, index) => {
        return <PlaylistRow list={list} key={index} />;
      })}
    </ul>
  );
};

export default MixedList;
