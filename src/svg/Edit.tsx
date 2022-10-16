import * as React from 'react';
import { ISVGProps } from '../common/common.interface';

const Edit = ({ width = '20', height = '20', strokeWidth = '2', color = 'white' }: ISVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http?://www.w3.org/2000/svg"
    >
      <path
        d="M14.1667 2.49999C14.3856 2.28112 14.6454 2.1075 14.9314 1.98905C15.2173 1.8706 15.5238 1.80963 15.8334 1.80963C16.1429 1.80963 16.4494 1.8706 16.7353 1.98905C17.0213 2.1075 17.2812 2.28112 17.5 2.49999C17.7189 2.71886 17.8925 2.97869 18.011 3.26466C18.1294 3.55063 18.1904 3.85713 18.1904 4.16665C18.1904 4.47618 18.1294 4.78268 18.011 5.06865C17.8925 5.35461 17.7189 5.61445 17.5 5.83332L6.25002 17.0833L1.66669 18.3333L2.91669 13.75L14.1667 2.49999Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Edit;
