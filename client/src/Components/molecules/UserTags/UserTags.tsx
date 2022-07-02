import * as React from 'react';
import Plus from '../../../assets/add-circle.svg';
import { tagTrack } from '../../../utils/firebase';
import { ITags } from '../../../utils/interface';
import './UserTags.scss';

interface IUserTagsProps {
  selectedTrack: any;
  userTags?: ITags[];
}

const UserTags = ({ selectedTrack, userTags }: IUserTagsProps) => {
  const dbTrack = {
    artist: selectedTrack.artists[0].name,
    title: selectedTrack.name,
    artwork: selectedTrack.album.images[2].url,
    uri: selectedTrack.uri,
  };

  return (
    <section className="user-tags">
      <p className="user-tags__title">MY TAGS</p>
      <section className="user-tags__container">
        {userTags &&
          userTags.map((tag: ITags, index: number) => {
            return (
              <button
                onClick={() => tagTrack('purchasedAids', tag.name, dbTrack)}
                key={index}
                className="user-tags__tag"
                style={{ background: tag.color }}
              >
                {tag.name}
                <img src={Plus} alt="add" className="user-tags__tag--action" />
              </button>
            );
          })}
      </section>
    </section>
  );
};

export default UserTags;
