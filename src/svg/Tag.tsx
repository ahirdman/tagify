import * as React from 'react';
import { ISVGProps } from '../common/common.interface';

const Tag = ({ className }: ISVGProps) => {
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
        d="M31.194 20.723 20.738 31.179a2.918 2.918 0 0 1-4.128 0L4.083 18.667V4.083h14.584L31.194 16.61a2.917 2.917 0 0 1 0 4.113v0Zm-19.819-9.348h.015"
      />
    </svg>
  );
};

export default Tag;
