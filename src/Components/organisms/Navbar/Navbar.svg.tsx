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
      width="36"
      height="36"
      fill="none"
      viewBox="0 0 36 36"
      className={className}
    >
      <g
        clipPath="url(#a)"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M18.055 21.902a4.375 4.375 0 1 0 0-8.75 4.375 4.375 0 0 0 0 8.75Z" />
        <path d="M28.846 21.902a2.407 2.407 0 0 0 .482 2.654l.087.087a2.915 2.915 0 0 1 0 4.127 2.916 2.916 0 0 1-4.127 0l-.087-.087a2.407 2.407 0 0 0-2.655-.481 2.406 2.406 0 0 0-1.458 2.202v.248a2.917 2.917 0 0 1-5.833 0v-.132a2.406 2.406 0 0 0-1.575-2.202 2.406 2.406 0 0 0-2.654.482l-.088.087a2.917 2.917 0 1 1-4.127-4.127l.087-.087a2.406 2.406 0 0 0 .482-2.655 2.406 2.406 0 0 0-2.202-1.458H4.93a2.917 2.917 0 0 1 0-5.833h.131a2.407 2.407 0 0 0 2.202-1.575 2.406 2.406 0 0 0-.481-2.654l-.088-.088a2.917 2.917 0 0 1 2.064-4.982 2.917 2.917 0 0 1 2.063.855l.088.088a2.406 2.406 0 0 0 2.654.48h.117a2.406 2.406 0 0 0 1.458-2.201v-.248a2.917 2.917 0 0 1 5.833 0v.131a2.407 2.407 0 0 0 1.459 2.202 2.406 2.406 0 0 0 2.654-.481l.087-.088a2.917 2.917 0 0 1 4.983 2.064 2.918 2.918 0 0 1-.855 2.063l-.088.088a2.406 2.406 0 0 0-.481 2.654v.117a2.406 2.406 0 0 0 2.202 1.458h.248a2.917 2.917 0 1 1 0 5.833h-.131a2.406 2.406 0 0 0-2.203 1.459v0Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M.555.027h35v35h-35z" />
        </clipPath>
      </defs>
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
