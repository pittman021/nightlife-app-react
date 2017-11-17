import React from 'react';
import Bar from './Bar';
import DelayedList from 'react-delayed-list';

const BarList = props => {
  const barItems = props.bars.map(function(bar) {
    return <Bar bar={bar} key={bar.barId} onRsvp={props.onRsvp} onDeleteRsvp={props.onDeleteRsvp} />;
  });

  return (
    <div className="BarList">
      <h3>Bar List</h3>
      <ul className="collection">
        <DelayedList delay={50}>{barItems}</DelayedList>
      </ul>
    </div>
  );
};

export default BarList;
