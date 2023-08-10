import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
const classes = {
  listItem: 'list-inline-item w-25 mt-2',
};

function ListElement({ object }) {
  console.log(object);
  return (
    <ul className="list-inline border border-secondary w-100">
      <li className={classes.listItem}>
        <img
          src="https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapons/base_weapons/weapon_knife_tactical.7621bbad70410deb629d60ed98ef248dac525356.png"
          className="img-fluid h-50 w-50 border border-danger"
        ></img>
      </li>
      <li className={classes.listItem}>
        <p className="border border-danger">
          {object.knifeName} {object.knifeSkin}
        </p>
      </li>
      <li className={classes.listItem}>
        <p className="border border-danger">{object.appearanceCount}</p>
      </li>
    </ul>
  );
}

export default ListElement;
