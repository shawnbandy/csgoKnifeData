import React from 'react';

const bsC = {
  navSelect: 'col-sm border border-primary text-center',
};

function NavBar({ currentNav, handleNavChange }) {
  return (
    <nav className="row">
      <a onClick={() => handleNavChange('kAS')} className={bsC.navSelect}>
        Knives and Skins
      </a>
      <a onClick={() => handleNavChange('tAP')} className={bsC.navSelect}>
        Teams and Players
      </a>
      <a onClick={() => handleNavChange('tourn')} className={bsC.navSelect}>
        Tournaments
      </a>
    </nav>
  );
}

export default NavBar;
