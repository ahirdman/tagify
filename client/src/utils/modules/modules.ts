import { SERVER } from '../../config/server';

const eraseCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};

const handleLogIn = () => (window.location.href = `${SERVER}/auth`);

const findCookie = (name: string) =>
  document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    .split('=')[1];

export { eraseCookie, handleLogIn, findCookie };
