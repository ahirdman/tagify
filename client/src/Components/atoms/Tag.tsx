import * as React from 'react';
import './Tag.scss';

interface ITagProps {
  onClick: any;
  color: string;
  name: string;
  actionIcon: any;
}

const Tag = ({ onClick, color, name, actionIcon }: ITagProps) => {
  return (
    <button onClick={onClick} className="tag" style={{ background: color }}>
      {name}
      <img src={actionIcon} alt="action" className="tag--action" />
    </button>
  );
};

export default Tag;
