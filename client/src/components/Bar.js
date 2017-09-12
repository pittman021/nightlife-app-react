import React, { Component } from 'react';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bColor: 'green'
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
            onClick={event => this.addRsvp(event)}
            className={'btn ' + this.state.bColor}
            id={this.props.bar.barId}
          >
            RSVP
          </button>
          <p>
            {this.props.bar.count}
          </p>
        </li>
      </div>
    );
  }

  addRsvp(e) {
    e.stopPropagation();
    if (e.target.className === 'btn green') {
      this.props.onRsvp(e.target.id);
      this.setState({ bColor: 'red' });
    } else {
      this.props.onDeleteRsvp(e.target.id);
      this.setState({ bColor: 'green' });
    }
  }

  removeRsvp(e) {
    e.stopPropagation();
  }
}

export default Bar;
