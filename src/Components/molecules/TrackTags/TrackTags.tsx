import * as React from 'react';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import Cross from '../../..//assets/cross-circle.svg';
import './TrackTags.scss';
import Tag from '../../atoms/Tag/Tag';
import { extractTrackInfo } from '../../../services/firebase/firestore/firestore.helper';
import { useAppSelector } from '../../../store/hooks';
import { selectedTrackSelector } from '../../../store/savedTracks/savedTracks.slice';

interface ITrackTags {
  trackTags?: any[];
}

const TrackTags = ({ trackTags }: ITrackTags) => {
  const fireId = useAppSelector(state => state.user.fireId);
  const selectedTrack = useAppSelector(selectedTrackSelector);

  return (
    <section className="track-tags">
      <p className="track-tags__title">TRACK TAGS</p>
      <div className="track-tags__container">
        {trackTags.length > 0 ? (
          trackTags.map((tag: any, index: number) => {
            return (
              <Tag
                key={index}
                onClick={() =>
                  Firestore.clearTrackFromTag(
                    fireId,
                    tag.name,
                    extractTrackInfo(selectedTrack)
                  )
                }
                color={tag.color}
                name={tag.name}
                actionIcon={Cross}
              />
            );
          })
        ) : (
          <div className="track-tags__container--empty">no tags added</div>
        )}
      </div>
    </section>
  );
};

export default TrackTags;
