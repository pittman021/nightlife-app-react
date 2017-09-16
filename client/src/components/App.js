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
    axios.post('/rsvp/' + term).then(res => {
      console.log(res);
      if (res.data.redirectURI === true) {
        window.location.href = '/auth/google';
      } else {
        const newBar = res.data;
        const bars = this.state.bars;

        bars.forEach(bar => {
          if (bar.barId === res.data.id) {
            bar.count += 1;
          }
        });

        this.setState({ bars: bars });
      }
    });
  }

  deleteRsvp(term) {
    axios.delete('/rsvp/' + term).then(res => {
      const removeBar = res;
      const bars = this.state.bars;
      console.log(res);

      bars.forEach(bar => {
        if (bar.barId === res.data.id) {
          bar.count > 0 ? --bar.count : 0;
        }
      });

      this.setState({ bars: bars });
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
        <BarList
          onRsvp={this.updateRsvp.bind(this)}
          onDeleteRsvp={this.deleteRsvp.bind(this)}
          bars={this.state.bars}
        />
      </div>
    );
  }
}

export default App;
