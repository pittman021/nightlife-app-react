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
        this.setState({ bars: res.data });
        console.log(this.state);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  updateRsvp(term) {
    var that = this;
    axios.post('/rsvp/' + term).then(res => {
      const bar = res.data.bar;
      console.log(that.state);
      // this.setState({ barId["res.data.bar"].count++ });
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
        <BarList onRsvp={this.updateRsvp} bars={this.state.bars} />
      </div>
    );
  }
}

export default App;
