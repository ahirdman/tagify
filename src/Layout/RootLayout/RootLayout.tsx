import * as React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../../Components/organisms';
import '../../App.scss';

const RootLayout = () => {
  return (
    <main className="app">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
