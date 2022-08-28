import * as React from 'react';
import { AuthButton, AuthModal, Backdrop } from '../../Components/atoms';
import {
  ConnectScreen,
  SignInForm,
  SignUpForm,
} from '../../Components/molecules';
import { toggleSignInModal, toggleSignUpModal } from '../../store/ui/ui.slice';
import './Login.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../services/firebase/config';
import {
  firebaseSignIn,
  firebaseSignOut,
  setSpotifyProfile,
  setSpotifyToken,
} from '../../store/user/user.slice';
import {
  IFirestoreUserDocument,
  Spotify,
  Firestore,
} from '../../services/index';
import { hasExpired, IExperationObj } from '../../utils';

const Login = () => {
  const { signInModal, signUpModal } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.user.loggedIn);

  const user = useAppSelector(state => state.user);

  const refreshTimerRef = React.useRef(null);

  console.log('rendered login component');
  /**
   * Listen for signed in or signed out to firebase
   */

  React.useEffect(() => {
    const authObserver = () => {
      onAuthStateChanged(auth, fireUser => {
        if (fireUser) {
          console.log('signed in');
          const { email, uid } = fireUser;
          dispatch(firebaseSignIn({ mail: email, fireId: uid }));
          console.log('signed out');
        } else {
          dispatch(firebaseSignOut());
        }
      });
    };

    authObserver();
  }, [dispatch]);

  /**
   * Get Spotify token when user is signed in
   */

  React.useEffect((): any => {
    if (user.loggedIn) {
      const refreshTimer = (milliseconds: number, uid: string) => {
        console.log('refresh timer set to:', milliseconds, 'seconds');

        refreshTimerRef.current = setTimeout(async () => {
          const token = await Spotify.refreshToken(uid);

          dispatch(
            setSpotifyToken({
              accessToken: token.access_token,
              expires: token.expires_in,
            })
          );

          refreshTimer(token.expires_in - 10, uid);
        }, milliseconds * 1000);
      };

      const tokenService = async (doc: IFirestoreUserDocument, uid: string) => {
        const tokenHasExpired: IExperationObj = hasExpired(
          doc.spotifyTokenTimestamp,
          doc.spotifyExpires
        );

        if (tokenHasExpired.expired || tokenHasExpired.expiresIn < 60) {
          const token = await Spotify.refreshToken(uid);

          dispatch(
            setSpotifyToken({
              accessToken: token.access_token,
              expires: token.expires_in,
            })
          );

          refreshTimer(token.expires_in - 10, uid);
        } else {
          dispatch(
            setSpotifyToken({
              accessToken: doc.spotifyAccessToken,
              expires: tokenHasExpired.expiresIn,
            })
          );

          refreshTimer(tokenHasExpired.expiresIn - 10, uid);
        }
      };

      const spotifyAuthService = async (uid: string) => {
        const userDocument = await Firestore.getUserDocument(uid);

        if (userDocument.spotifyAuth) {
          tokenService(userDocument, uid);
        } else {
          Spotify.authorizeSpotify(uid);
        }
      };

      spotifyAuthService(user.fireId);

      return () => {
        clearTimeout(refreshTimerRef.current);
      };
    }
  }, [user.loggedIn, user.fireId, dispatch]);

  /**
   * Get Spotify Profile when accessToken is obtained
   */

  React.useEffect(() => {
    if (user.spotify.accessToken) {
      const getSpotifyUserData = async (token: string) => {
        const data = await Spotify.getSpotifyUserData(token);

        dispatch(
          setSpotifyProfile({
            image: data.images[0].url,
            name: data.display_name,
            id: data.id,
          })
        );
      };

      getSpotifyUserData(user.spotify.accessToken);
    }
  }, [user.spotify.accessToken, dispatch]);

  return (
    <main className="login">
      <div className="login__logo">TAGIFY</div>
      <div className="login__header"></div>
      <div className="login__buttons">
        <AuthButton
          title="SIGN UP"
          backgroundColor="#1bd760"
          textColor="black"
          onClick={() => dispatch(toggleSignUpModal())}
        />
        <AuthButton
          title="LOG IN"
          backgroundColor="white"
          onClick={() => dispatch(toggleSignInModal())}
        />
      </div>
      {signUpModal && (
        <Backdrop onClick={() => dispatch(toggleSignUpModal())}>
          <AuthModal>
            {loggedIn ? <ConnectScreen autoConnect={false} /> : <SignUpForm />}
          </AuthModal>
        </Backdrop>
      )}
      {signInModal && (
        <Backdrop onClick={() => dispatch(toggleSignInModal())}>
          <AuthModal>
            {loggedIn ? <ConnectScreen autoConnect={false} /> : <SignInForm />}
          </AuthModal>
        </Backdrop>
      )}
    </main>
  );
};

export default Login;
