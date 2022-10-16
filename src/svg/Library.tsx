import * as React from 'react';
import { ISVGProps } from '../common/common.interface';

const Library = ({ className }: ISVGProps) => {
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
        d="M34 28.667a3.35 3.35 0 0 1-.967 2.357A3.284 3.284 0 0 1 30.7 32H4.3a3.283 3.283 0 0 1-2.333-.976A3.35 3.35 0 0 1 1 28.667V5.333c0-.884.348-1.732.967-2.357A3.283 3.283 0 0 1 4.3 2h8.25l3.3 5H30.7c.875 0 1.715.351 2.333.976A3.35 3.35 0 0 1 34 10.333v18.334Z"
      />
      <path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.931 23.291v-8.666l8-1.334v8.667"
      />
      <path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.931 25.292a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8-1.334a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      />
    </svg>
  );
};

export default Library;
