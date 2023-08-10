import React from 'react';
import ListElement from './listElms';

function ListView({ data }) {
  console.log(data);
  return (
    <div className="container border border-danger text-center mt-2">
      <ul className="d-flex flex-column mt-2 p-0 align-items-center">
        {data.map((object) => {
          return <ListElement object={object} />;
        })}
      </ul>
    </div>
  );
}

export default ListView;
