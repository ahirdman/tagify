import * as React from 'react';
import { Tag } from '../../atoms';
import './TagSection.scss';
import { ITags } from '../../../common/common.interface';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { useAppSelector } from '../../../store/hooks';
import { selectedTrackSelector } from '../../../store/savedTracks/savedTracks.slice';

interface Props {
  title: string;
  tags?: any[];
  tagAction: 'ADD' | 'DELETE';
  actionIcon: any;
}

const TagSection = ({ title, tags, tagAction, actionIcon }: Props) => {
  const selectedTrack = useAppSelector(selectedTrackSelector);
  const fireId = useAppSelector(state => state.user.fireId);

  return (
    <section className="tag-section">
      <p className="tag-section__title">{title}</p>
      <section className="tag-section__container">
        {tags.length > 0 ? (
          tags.map((tag: ITags, index: number) => {
            return (
              <Tag
                key={index}
                onClick={
                  tagAction === 'ADD'
                    ? () => Firestore.tagTrack(fireId, tag.name, selectedTrack)
                    : () => Firestore.clearTrackFromTag(fireId, tag.name, selectedTrack)
                }
                color={tag.color}
                name={tag.name}
                actionIcon={actionIcon}
              />
            );
          })
        ) : (
          <div className="tag-section__container--empty">Empty</div>
        )}
      </section>
    </section>
  );
};

export default TagSection;
