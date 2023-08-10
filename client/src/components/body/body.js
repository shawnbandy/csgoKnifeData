import React from 'react';
import KnifeAndSkins from './bodyComp/kAS';
import TeamAndPlayers from './bodyComp/pAT';
import Tournament from './bodyComp/tourn';

const classes = {
  display: 'container',
  hidden: 'd-none',
};

function Body({ currentNav, handleNavChange }) {
  return (
    <body className="container text-center border border-secondary vh-100">
      Body
      <div className={currentNav == 'kAS' ? classes.display : classes.hidden}>
        <KnifeAndSkins />
      </div>
      <div className={currentNav == 'tAP' ? classes.display : classes.hidden}>
        <TeamAndPlayers />
      </div>
      <div className={currentNav == 'tourn' ? classes.display : classes.hidden}>
        <Tournament />
      </div>
    </body>
  );
}

export default Body;
