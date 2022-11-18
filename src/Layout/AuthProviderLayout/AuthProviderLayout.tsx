// import { onAuthStateChanged } from 'firebase/auth';
// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../../services/firebase/config';
// import { useAppDispatch } from '../../store/hooks';
// import { firebaseSignIn, firebaseSignOut } from '../../store/user/user.slice';
// import RootLayout from '../RootLayout/RootLayout';

// interface IProps {
//   children: JSX.Element;
// }

// const AuthProvder = ({ children }: IProps) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, fireUser => {
//       if (fireUser) {
//         console.log('signed in');
//         const { email, uid } = fireUser;
//         dispatch(firebaseSignIn({ mail: email, fireId: uid }));
//         navigate('/app/home');
//       } else {
//         console.log('signed out');
//         dispatch(firebaseSignOut());
//         navigate('/login');
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   return <AuthProvder>{children}</AuthProvder>;
// };

// const AuthProviderLayout = () => (
//   <AuthProvder>
//     <RootLayout />
//   </AuthProvder>
// );

// export default AuthProviderLayout;
