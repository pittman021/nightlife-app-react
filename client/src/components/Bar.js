import React from 'react';

const Bar = props => {
  return (
    <a href="#!" className="collection-item avatar">
      <img src={props.bar.image_url} className="circle" />
      <span className="title">
        {props.bar.name}
      </span>
      <span className="badge" data-badge-caption="Going">
        1
      </span>
    </a>
  );
};

export default Bar;
