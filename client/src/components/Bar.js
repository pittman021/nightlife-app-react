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
    console.log(this.props.bar);
    return (
      <li className="collection-item avatar">
        <img src={this.props.bar.image} alt="" className="circle" />
        <span className="title">{this.props.bar.name}</span>

        <div className="secondary-content">
          <p>Going: {this.props.bar.count}</p>
          <button onClick={event => this.addRsvp(event)} className={'btn ' + this.state.bColor} id={this.props.bar.barId}>
            RSVP
          </button>
        </div>
      </li>
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
