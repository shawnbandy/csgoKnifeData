import React from 'react';

function CardElement({ object }) {
  return (
    <div class="card col border border-primary">
      <img
        src="https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapons/base_weapons/weapon_knife_tactical.7621bbad70410deb629d60ed98ef248dac525356.png"
        class="rounded img-fluid h-50 w-50 align-self-center"
        alt="Image of Knife"
      />
      <div className="card-body">
        <p className="card-text">
          {object.knifeName} {object.knifeSkin}
        </p>
        <p>{object.appearanceCount}</p>
      </div>
    </div>
  );
}

export default CardElement;
