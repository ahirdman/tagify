import * as React from 'react';
import { Loader } from '../../Components/atoms';
import { useAppSelector } from '../../store/hooks';
import { TracksList } from '../../Components/organisms';
import Card from '../../Layout/Card/Card';
import useScroll from '../../hooks/useScroll';
import { useNavigate } from 'react-router';

const SelectTracks = () => {
  const [filter, setFilter] = React.useState('');
  const listEl = React.useRef<HTMLUListElement>(null);

  const { filteredTracks, loading } = useAppSelector(state => state.savedTracks);

  useScroll(listEl, filter);

  const navigate = useNavigate();

  return (
    <Card title="Saved Tracks" filter={true} setFilter={setFilter} navigate={false}>
      <TracksList
        tracks={filteredTracks}
        element={listEl}
        onNavigate={navigate}
        children={loading && <Loader />}
      />
    </Card>
  );
};

export default SelectTracks;
