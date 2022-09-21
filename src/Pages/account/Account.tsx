import * as React from 'react';
import './Account.scss';
import { AuthButton } from '../../Components/atoms';
import { FirebaseAuth } from '../../services';
import { useAppSelector } from '../../store/hooks';
import { CardNav } from '../../Components/molecules';

const Account = () => {
  const spotifyData = useAppSelector(state => state.user.spotify);

  return (
    <div className="account">
      <CardNav title="Account" />
      <img src={spotifyData.profile.image} alt="avatar" className="account__avatar" />
      <p>{spotifyData.profile.name}</p>
      <ul className="account__settings">
        <li className="account__settings--row">
          <p>Spotify:</p>
          {spotifyData.connected ? <p>Connected</p> : <p>Not Connected</p>}
        </li>
        <li className="account__settings--row">
          <p>Subscription:</p>
          <p>Trial</p>
        </li>
      </ul>
      <AuthButton title="Sign Out" backgroundColor="white" onClick={() => FirebaseAuth.logOut()} />
    </div>
  );
};

export default Account;
