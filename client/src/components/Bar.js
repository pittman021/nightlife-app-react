import React, { Component } from 'react';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bColor: ''
    };
  }

  componentWillMount() {
    if (this.props.bar.userGoing === true) {
      this.setState({ bColor: 'green' });
    } else {
      this.setState({ bColor: 'red' });
    }
  }

  render() {
    return (
      <div className="col s12 m12 l12 bar">
        <div className="col s12 m4 l8">
          <img alt="logo" src={this.props.bar.image} />
          <span>
            {this.props.bar.name}
          </span>
        </div>
        <div className="col s12 m4 l2">
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
        </div>
      </div>
    );
  }

  addRsvp(e) {
    e.stopPropagation();
    if (e.target.className === 'btn red') {
      this.props.onRsvp(e.target.id);
      this.setState({ bColor: 'green' });
    } else {
      this.props.onDeleteRsvp(e.target.id);
      this.setState({ bColor: 'red' });
    }
  }

  removeRsvp(e) {
    e.stopPropagation();
  }
}

export default Bar;
