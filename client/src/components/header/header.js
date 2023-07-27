import React from 'react';
import NavBar from './headerComp/navBar';

function Header({ currentNav, handleNavChange }) {
  return (
    <header className="container border border-danger text-center">
      <h1 className="font-weight-heavy">CSGO Knife Data</h1>
      <NavBar currentNav={currentNav} handleNavChange={handleNavChange} />
    </header>
  );
}

export default Header;
