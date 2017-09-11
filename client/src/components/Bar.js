import React, { Component } from 'react';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgcolor: 'red',
      status: 'Not Going',
      action: ''
    };
  }

  render() {
    return (
      <div className="bar">
        <li>
          <img alt="logo" src={this.props.bar.image} />
          <span>
            {this.props.bar.name}
          </span>
          <button
            onClick={event => this.handleClick(event)}
            id={this.props.bar.barId}
            className={'btn ' + this.state.bgcolor}
          >
            Not Going
          </button>
          <p>
            {this.props.bar.count}
          </p>
          <button
            onClick={event => this.handleClick(event)}
            className="btn green"
            id={this.props.bar.barId}
          >
            Not Going
          </button>
          <p>
            {this.props.bar.count}
          </p>
        </li>
      </div>
    );
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.onRsvp(e.target.id);
  }
}

export default Bar;
