import * as React from 'react';
import { onSnapshot } from 'firebase/firestore';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { AddTag, TrackTags, UserTags, TrackSection } from '../../molecules';
import { matchTag } from '../../../services/firebase/firestore/firestore.helper';
import { ITags } from '../../../common/common.interface';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectedTrackSelector,
  setSelectedTrack,
} from '../../../store/savedTracks/savedTracks.slice';
import Card from '../../../Layout/Card/Card';

const SelectedTrack = () => {
  const [trackTags, setTrackTags] = React.useState<string[]>([]);
  const [userTags, setUserTags] = React.useState([]);

  const fireId = useAppSelector(state => state.user.fireId);
  const selectedTrack = useAppSelector(selectedTrackSelector);
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagCol(fireId), collection => {
      const tags: ITags[] = [];
      const tagObject: any[] = [];

      collection.forEach(doc => {
        const data = doc.data();
        tags.push({ name: data.name, color: data.color });
        tagObject.push({
          color: data.color,
          [data.name]: [...data.tracks],
        });
      });

      setUserTags(tags);
      const matches = matchTag(tagObject, selectedTrack.uri);
      setTrackTags(matches);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedTrack, fireId]);

  return (
    <Card title="Selected Track" navClick={() => dispatch(setSelectedTrack(undefined))}>
      <div style={{ overflowX: 'scroll' }}>
        <TrackSection />
        <TrackTags trackTags={trackTags} />
        <UserTags userTags={userTags} />
        <AddTag />
      </div>
    </Card>
  );
};

export default SelectedTrack;
