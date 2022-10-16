import * as React from 'react';
import { ISVGProps } from '../common/common.interface';

const List = ({ className }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      fill="none"
      viewBox="0 0 35 35"
      className={className}
    >
      <path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.667 8.75h18.958M11.667 17.5h18.958m-18.958 8.75h18.958M4.375 8.75h.015m-.015 8.75h.015m-.015 8.75h.015"
      />
    </svg>
  );
};

export default List;
