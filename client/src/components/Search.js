import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { term: 'Austin' };
  }
  render() {
    return (
      <div className="row search">
        <div className="col s12">
          <input
            className="input-field"
            id="location"
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
          />
          <label for="location">Location</label>
        </div>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default Search;
