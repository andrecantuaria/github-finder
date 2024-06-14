import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Search from './pages/Search';
import User from './pages/User';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <div className='container'>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Search />} />
          <Route path="/user/:username" element={<User />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
