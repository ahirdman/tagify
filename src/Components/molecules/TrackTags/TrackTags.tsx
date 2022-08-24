import * as React from 'react';
import * as Firestore from '../../../services/firebase/firestore';
import Cross from '@/assets/cross-circle.svg';
import './TrackTags.scss';
import Tag from '../../atoms/Tag/Tag';
import { UserContext } from '../../../context/UserContext';
import { dbTrack } from '@utils/modules/tracks/tracks';

interface ITrackTags {
  selectedTrack: any;
  trackTags?: any[];
}

const TrackTags = ({ selectedTrack, trackTags }: ITrackTags) => {
  const user = React.useContext(UserContext);

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
                    user.fireId,
                    tag.name,
                    dbTrack(selectedTrack)
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
