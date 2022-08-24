import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import './SavedTracks.scss';
import { CardNav, SearchBar } from '../..//molecules';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { UserContext } from '../../../context/UserContext';
import { post } from '../../../utils/httpClient';
import { Loader } from '../../atoms';
import { ITracksStateObj } from '../../../reducers/savedTracks/savedTracks.interface';
import { StateActionTypes } from '../../../reducers/savedTracks/savedTracks.actions';

interface ISavedTracks {
  setSelectedTrack: any;
  state: ITracksStateObj;
  dispatch: any;
}

const getTracks = async (token: string, callback: Function) => {
  const savedTracks = await post('/user/saved', {
    token,
  });

  callback({
    type: StateActionTypes.INITIAL_LOAD,
    payload: {
      total: savedTracks.total,
      nextUrl: savedTracks.next,
      savedTracks: savedTracks.items,
      filteredTracks: savedTracks.items,
    },
  });
};

const SavedTracks = ({ setSelectedTrack, state, dispatch }: ISavedTracks) => {
  const [query, setQuery] = React.useState('');
  const user = React.useContext(UserContext);
  const fetchedAllTracks = state.savedTracks.length === state.total;
  const resumeFetching =
    state.filteredTracks.length < 8 &&
    state.total !== state.filteredTracks.length;

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

  /**
   * Custom Hook - manages infinite scroll functionalty, calls fetchMoreTracks when user hits bottom of element
   * - until all tracks have been fetched
   */

  const [isFetching, setIsFetching, listEl] = useInfiniteScroll(
    fetchMoreTracks,
    resumeFetching
  );

  /**
   * Initial fetch when user has obtained access Token. Should only run once.
   */

  React.useEffect(() => {
    if (!user.spotify.accessToken || state.savedTracks.length !== 0) return;

    getTracks(user.spotify.accessToken, dispatch);
  }, [user.spotify.accessToken, state.savedTracks.length, dispatch]);

  /**
   *  Filter effect, filter service is managed by reducer.
   */

  React.useEffect(() => {
    if (query.length > 0) {
      dispatch({
        type: StateActionTypes.FILTER_TRACKS,
        payload: query,
      });
    }
  }, [query, state.savedTracks, dispatch]);

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

export default SavedTracks;
