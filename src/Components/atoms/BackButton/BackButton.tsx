import * as React from 'react';
import { useNavigate } from 'react-router';
import { Back } from './BackButton.svg';
import './BackButton.scss';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="back-button"
      onClick={e => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <Back />
    </button>
  );
};

export default BackButton;
