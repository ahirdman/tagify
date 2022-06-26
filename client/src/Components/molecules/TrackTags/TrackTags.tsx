import * as React from 'react';
import { clearTrackFromTag } from '../../../utils/firebase';
import Cross from '../../../assets/cross-circle.svg';
import './TrackTags.scss';

interface ITrackTags {
  selectedTrack: any;
  trackTags?: any[];
}

const TrackTags = ({ selectedTrack, trackTags }: ITrackTags) => {
  const dbTrack = {
    artist: selectedTrack.artists[0].name,
    title: selectedTrack.name,
    artwork: selectedTrack.album.images[2].url,
    uri: selectedTrack.uri,
  };

  return (
    <section className="user-tags">
      <h3 className="user-tags__title">Track Tags</h3>
      <section className="user-tags__container">
        {trackTags &&
          trackTags.map((tag: any, index: number) => {
            return (
              <button
                onClick={() => clearTrackFromTag('purchasedAids', tag.name, dbTrack)}
                key={index}
                className="user-tags__tag"
                style={{ background: tag.color }}
              >
                {tag.name}
                <img src={Cross} alt="cross" className="user-tags__tag--action" />
              </button>
            );
          })}
      </section>
    </section>
  );
};

export default TrackTags;
