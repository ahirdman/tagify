import * as React from 'react';
import { ISVGProps } from '../common/common.interface';

const Home = ({ className }: ISVGProps) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M37.5 12.5L12.5 37.5"
        stroke="white"
        stroke-opacity="0.5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 12.5L37.5 37.5"
        stroke="white"
        stroke-opacity="0.5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Home;
