import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import Search from './Search';
import BarList from './BarList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: []
    };

    this.fetchBars('austin');
  }

  fetchBars(term) {
    axios
      .get(`/api/yelp?location=${term}`)
      .then(res => {
        this.setState({ bars: res.data.businesses });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    const fetchBars = _.debounce(term => {
      this.fetchBars(term);
    }, 300);
    return (
      <div className="container">
        <Header />
        <Search onSearchTermChange={fetchBars} />
        <BarList bars={this.state.bars} />
      </div>
    );
  }
}

export default App;
