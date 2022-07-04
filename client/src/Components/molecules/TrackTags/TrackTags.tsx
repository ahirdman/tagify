import * as React from 'react';
import { clearTrackFromTag } from '../../../utils/firebase';
import Cross from '../../../assets/cross-circle.svg';
import './TrackTags.scss';
import Tag from '../../atoms/Tag';

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
              <Tag
                key={index}
                onClick={() =>
                  clearTrackFromTag('purchasedAids', tag.name, dbTrack)
                }
                color={tag.color}
                name={tag.name}
                actionIcon={Cross}
              />
            );
          })}
      </section>
    </section>
  );
};

export default TrackTags;
