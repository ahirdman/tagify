import * as React from 'react';
import Plus from '../../../assets/add-circle.svg';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { Tag } from '../../atoms';
import './UserTags.scss';
import { extractTrackInfo } from '../../../services/firebase/firestore/firestore.helper';
import { ITags } from '../../../common/common.interface';
import { useAppSelector } from '../../../store/hooks';
import { selectedTrackSelector } from '../../../store/savedTracks/savedTracks.slice';

interface Props {
  userTags?: ITags[];
}

const UserTags = ({ userTags }: Props) => {
  const fireId = useAppSelector(state => state.user.fireId);
  const selectedTrack = useAppSelector(selectedTrackSelector);

  return (
    <section className="user-tags">
      <p className="user-tags__title">MY TAGS</p>
      <section className="user-tags__container">
        {userTags.length > 0 ? (
          userTags.map((tag: ITags, index: number) => {
            return (
              <Tag
                key={index}
                onClick={() =>
                  Firestore.tagTrack(fireId, tag.name, extractTrackInfo(selectedTrack))
                }
                color={tag.color}
                name={tag.name}
                actionIcon={Plus}
              />
            );
          })
        ) : (
          <div className="track-tags__container--empty">no tags added</div>
        )}
      </section>
    </section>
  );
};

export default UserTags;
