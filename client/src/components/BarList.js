import React from 'react';
import Bar from './Bar';

const BarList = props => {
  const barItems = props.bars.map(function(bar) {
    return <Bar bar={bar} key={bar.id} />;
  });

  return (
    <div className="BarList">
      <h3>Bar List</h3>
      <div className="collection">
        {barItems}
      </div>
    </div>
  );
};

export default BarList;
