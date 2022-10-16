import * as React from 'react';
import { ISVGProps } from '../common/common.interface';

const Home = ({ className }: ISVGProps) => {
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
        d="M4.375 13.125 17.5 2.917l13.125 10.208v16.042a2.917 2.917 0 0 1-2.917 2.916H7.292a2.917 2.917 0 0 1-2.917-2.916V13.125Z"
      />
      <path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.125 32.083V17.5h8.75v14.583"
      />
    </svg>
  );
};

export default Home;
