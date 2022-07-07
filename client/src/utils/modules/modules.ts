import { SERVER } from '../../config/server';

// const eraseCookie = (name: string) => {
//   document.cookie = name + '=; Max-Age=-99999999;';
// };

export const handleLogIn = () => {
  localStorage.setItem('spot', 'redirected');
  return (window.location.href = `${SERVER}/auth`);
};

// export const handleLogIn = async () => {
//   await fetch(`${SERVER}/auth`);
// };

// const findCookie = (name: string) =>
//   document.cookie
//     .split('; ')
//     .find(row => row.startsWith(`${name}=`))
//     .split('=')[1];
