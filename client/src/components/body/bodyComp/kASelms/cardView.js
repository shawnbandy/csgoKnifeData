import React from 'react';
import CardElement from './cardElm';

function CardView({ data }) {
  return (
    <div className="container row border border-danger text-center">
      {data.map((object) => {
        return <CardElement object={object} />;
      })}
    </div>
  );
}

export default CardView;
