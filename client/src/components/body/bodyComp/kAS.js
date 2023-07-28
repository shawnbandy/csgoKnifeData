import React from 'react';
import CardView from './kASelms/cardView';
import ListView from './kASelms/listView';
import { useState } from 'react';

const classes = {
  nav: 'col-sm border border-primary',
  display: 'container',
  hidden: 'd-none',
};

const fakeData = [
  {
    knifeName: 'Butterfly',
    knifeSkin: 'Emerald',
    appearanceCount: '3',
  },
  {
    knifeName: 'Flip',
    knifeSkin: 'Ruby',
    appearanceCount: '2',
  },
  {
    knifeName: 'Karambit',
    knifeSkin: 'Doppler',
    appearanceCount: '1',
  },
  {
    knifeName: 'Ursus',
    knifeSkin: 'Sapphire',
    appearanceCount: '2',
  },
];

function KnifeAndSkins() {
  const [currentNav, setCurrentNav] = useState('listView');
  const handleNavChange = (page) => setCurrentNav(page);
  return (
    <section>
      <div className="row">
        <a className={classes.nav} onClick={() => handleNavChange('listView')}>
          List View
        </a>
        <a className={classes.nav} onClick={() => handleNavChange('cardView')}>
          Card View
        </a>
      </div>
      <div
        className={currentNav == 'cardView' ? classes.display : classes.hidden}
      >
        <CardView />
      </div>
      <div
        className={currentNav == 'listView' ? classes.display : classes.hidden}
      >
        <ListView data={fakeData} />
      </div>
    </section>
  );
}

export default KnifeAndSkins;
