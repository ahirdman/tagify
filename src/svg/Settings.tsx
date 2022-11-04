import * as React from 'react';
import { ISVGProps } from '../common/common.interface';

const Settings = ({ className }: ISVGProps) => {
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
        d="M24.5 25.375v-1.75a3.5 3.5 0 0 0-3.5-3.5h-7a3.5 3.5 0 0 0-3.5 3.5v1.75m7-8.75a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
      />
      <circle cx="17.5" cy="17.5" r="16.5" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default Settings;
