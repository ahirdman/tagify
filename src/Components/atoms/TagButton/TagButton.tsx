import * as React from 'react';
import './TagButton.scss';
import { Add, Delete } from './TagButton.svg';

interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  color: string;
  name: string;
  tagAction: 'ADD' | 'DELETE';
}

const TagButton = ({ onClick, color, name, tagAction }: Props) => {
  return (
    <button onClick={onClick} className="tag" style={{ background: color }}>
      {name}
      {tagAction === 'ADD' ? <Add className="tag--action" /> : <Delete className="tag--action" />}
    </button>
  );
};

export default TagButton;
