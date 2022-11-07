import * as React from 'react';
import { ISVGProps } from '../../../common/common.interface';

const Play = ({ className }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m5 3 14 9-14 9V3Z"
      />
    </svg>
  );
};

const Pause = ({ className }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 4H6v16h4V4Zm8 0h-4v16h4V4Z"
      />
    </svg>
  );
};

export { Play, Pause };
