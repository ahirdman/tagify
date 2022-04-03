const eraseCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};

const handleLogIn = () => window.location.href = 'https://spotifymoody.herokuapp.com/auth/'

const getAccess = async () => {
    await fetch('https://spotifymoody.herokuapp.com/auth')
}

const findCookie = (name:string) => document.cookie
  .split('; ')
  .find(row => row.startsWith(`${name}=`))
  .split('=')[1];

export {
  eraseCookie,
  handleLogIn,
  findCookie,
  getAccess
}