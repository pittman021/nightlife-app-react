import React from 'react';
import Bar from './Bar';

const BarList = props => {
  const barItems = props.bars.map(function(bar) {
    return (
      <Bar
        bar={bar}
        key={bar.barId}
        onRsvp={props.onRsvp}
        onDeleteRsvp={props.onDeleteRsvp}
      />
    );
  });

  return (
    <div className="BarList">
      <h3>Bar List</h3>
      <div className="row">
        {barItems}
      </div>
    </div>
  );
};

export default BarList;
