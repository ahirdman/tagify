import * as React from 'react';
import { removeTrackTag } from '../../utils/firebase';
import Cross from '../../assets/cross-circle.svg';
import './TrackTags.scss';

interface ITrackTags {
  uri: string;
  trackTags?: string[];
}

const TrackTags = ({ uri, trackTags }: ITrackTags) => {
  return (
    <fieldset className="user-tags">
      <legend className="user-tags__title">Track Tags</legend>
      <section className="user-tags__container">
        {trackTags &&
          trackTags.map((tagname: string, index: number) => {
            return (
              <button
                onClick={() => removeTrackTag(tagname, uri)}
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
