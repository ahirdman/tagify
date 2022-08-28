import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import './App.scss';
import Navbar from './Components/organisms/Navbar/Navbar';
import Login from './Pages/login/Login';
import Tracks from './Pages/tracks/Tracks';
import Lists from './Pages/lists/Lists';
import { useAppSelector } from './store/hooks';

const App = () => {
  const ready = useAppSelector(state => state.user.ready);

  console.log('rendered app component');

  if (ready) {
    return (
      <main className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Tracks />} />
          <Route path="/lists" element={<Lists />} />
        </Routes>
      </main>
    );
  } else {
    return <Login />;
  }
};

export default React.memo(App);
