import React from 'react';
import ListElement from './listElms';

function ListView({ data }) {
  console.log(data);
  return (
    <div className="container border border-danger text-center">
      <ul>
        {data.map((object) => {
          return <ListElement object={object} />;
        })}
      </ul>
    </div>
  );
}

export default ListView;
