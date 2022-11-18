import * as React from 'react';
import { ISVGProps } from '../common.interface';

const Heart = ({ className }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="29"
      fill="none"
      viewBox="0 0 33 29"
      className={className}
    >
      <path
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M29.421 3.752a8.021 8.021 0 0 0-11.345 0L16.53 5.298l-1.546-1.546A8.023 8.023 0 0 0 3.638 15.098l1.546 1.546L16.53 27.99l11.346-11.346 1.545-1.546a8.024 8.024 0 0 0 0-11.346v0Z"
      />
    </svg>
  );
};

export default Heart;
