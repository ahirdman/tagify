import { ISVGProps } from '../common.interface';

const TrashCan = ({ className }: ISVGProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 5H4.16667H17.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 5.00002V3.33335C6.66669 2.89133 6.84228 2.4674 7.15484 2.15484C7.4674 1.84228 7.89133 1.66669 8.33335 1.66669H11.6667C12.1087 1.66669 12.5326 1.84228 12.8452 2.15484C13.1578 2.4674 13.3334 2.89133 13.3334 3.33335V5.00002M15.8334 5.00002V16.6667C15.8334 17.1087 15.6578 17.5326 15.3452 17.8452C15.0326 18.1578 14.6087 18.3334 14.1667 18.3334H5.83335C5.39133 18.3334 4.9674 18.1578 4.65484 17.8452C4.34228 17.5326 4.16669 17.1087 4.16669 16.6667V5.00002H15.8334Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33331 9.16669V14.1667"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 9.16669V14.1667"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashCan;
