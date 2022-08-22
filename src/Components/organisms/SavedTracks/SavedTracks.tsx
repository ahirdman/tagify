import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import './SelectTrack.scss';
import CardNav from '../../molecules/CardNav/CardNav';
import useInfiniteScroll from '../../../utils/hooks/useInfiniteScroll';
import { UserContext } from '../../../utils/context/UserContext';
import { post } from '../../../utils/httpClient';
import Loader from '../../atoms/Loader/Loader';
import SearchBar from '../../molecules/SearchBar/SearchBar';
import {
  ITracksStateObj,
  StateActionTypes,
} from '../../../utils/reducers/savedTracks';

interface ISavedTracks {
  setSelectedTrack: any;
  state: ITracksStateObj;
  dispatch: any;
}

const SelectTrack = ({ setSelectedTrack, state, dispatch }: ISavedTracks) => {
  const [query, setQuery] = React.useState('');
  const user = React.useContext(UserContext);
  const fetchedAllTracks = state.savedTracks.length === state.total;

  const fetchMoreTracks = async () => {
    if (fetchedAllTracks) return;

    const nextTracks = await post('/user/next', {
      token: user.spotify.accessToken,
      url: state.nextUrl,
    });

    dispatch({
      type: StateActionTypes.ADD_TRACKS,
      payload: {
        nextUrl: nextTracks.next,
        savedTracks: nextTracks.items,
      },
    });

    setIsFetching(false);
  };

  const [isFetching, setIsFetching, listEl] = useInfiniteScroll(
    fetchMoreTracks,
    state.total,
    state.savedTracks.length,
    state.filteredTracks.length
  );

  React.useEffect(() => {
    if (!user.spotify.accessToken || state.savedTracks.length !== 0) return;

    const getTracks = async () => {
      const savedTracks = await post('/user/saved', {
        token: user.spotify.accessToken,
      });

      dispatch({
        type: StateActionTypes.INITIAL_LOAD,
        payload: {
          total: savedTracks.total,
          nextUrl: savedTracks.next,
          savedTracks: savedTracks.items,
          filteredTracks: savedTracks.items,
        },
      });
    };

    getTracks();
  }, [user.spotify.accessToken]);

  React.useEffect(() => {
    if (query.length > 0) {
      dispatch({
        type: StateActionTypes.FILTER_TRACKS,
        payload: query,
      });
    }
  }, [query, state.savedTracks]);

  return (
    <div className="select">
      <CardNav title="Saved Tracks" />
      <SearchBar icon={Magnifier} setSearch={setQuery} />
      <section className="select__header">
        <p className="select__header--title">TITLE & ARTIST</p>
      </section>
      <ul className="track-list" ref={listEl}>
        {state.filteredTracks.map((trackObj, index) => {
          return (
            <li
              onClick={() => setSelectedTrack(trackObj.track)}
              key={index}
              className="track-list__row"
            >
              <img
                src={trackObj.track.album.images[2].url}
                alt="album"
                className="track-list__album"
              />
              <section className="track-list__details">
                <p className="track-list__details--title">
                  {trackObj.track.name}
                </p>
                <p className="track-list__details--artist">
                  {trackObj.track.artists[0].name}
                </p>
              </section>
            </li>
          );
        })}
        {isFetching && !fetchedAllTracks && <Loader />}
      </ul>
    </div>
  );
};

export default SelectTrack;
