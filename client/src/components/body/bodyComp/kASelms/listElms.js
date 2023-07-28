import React from 'react';

function ListElement({ object }) {
  console.log(object);
  return (
    <li className="list-group-item align-items0left">
      <p>List Element</p>
    </li>
  );
}

export default ListElement;
