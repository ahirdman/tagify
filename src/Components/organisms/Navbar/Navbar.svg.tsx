import * as React from 'react';
import { ISVGProps } from '../../../common/common.interface';

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

export { Home, Library, Tag, Settings };
