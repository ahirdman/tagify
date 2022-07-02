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
    <section className="track-tags">
      <p className="track-tags__title">TRACK TAGS</p>
      <section className="track-tags__container">
        {trackTags &&
          trackTags.map((tag: any, index: number) => {
            return (
              <button
                onClick={() =>
                  clearTrackFromTag('purchasedAids', tag.name, dbTrack)
                }
                key={index}
                className="track-tags__tag"
                style={{ background: tag.color }}
              >
                {tag.name}
                <img
                  src={Cross}
                  alt="cross"
                  className="track-tags__tag--action"
                />
              </button>
            );
          })}
      </section>
    </section>
  );
};

export default TrackTags;
