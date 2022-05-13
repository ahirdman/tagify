import * as React from 'react';
import { clearTrackFromTag } from '../../utils/firebase';
import Cross from '../../assets/cross-circle.svg';
import './TrackTags.scss';

interface ITrackTags {
  selectedTrack: any;
  trackTags?: string[];
}

const TrackTags = ({ selectedTrack, trackTags }: ITrackTags) => {
  const dbTrack = {
    artist: selectedTrack.artists[0].name,
    title: selectedTrack.name,
    artwork: selectedTrack.album.images[2].url,
    uri: selectedTrack.uri,
  };

  return (
    <fieldset className="user-tags">
      <legend className="user-tags__title">Track Tags</legend>
      <section className="user-tags__container">
        {trackTags &&
          trackTags.map((tagname: string, index: number) => {
            return (
              <button
                onClick={() =>
                  clearTrackFromTag('purchasedAids', tagname, dbTrack)
                }
                key={index}
                className="user-tags__tag"
              >
                {tagname}
                <img
                  src={Cross}
                  alt="cross"
                  className="user-tags__tag--action"
                />
              </button>
            );
          })}
      </section>
    </fieldset>
  );
};

export default TrackTags;
