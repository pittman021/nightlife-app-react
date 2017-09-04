import axios from 'axios';

const fetchBars = term => {
  axios
    .get(`/api/yelp?location=${term}`)
    .then(function(res) {
      this.setState({ bars: res });
    })
    .catch(function(err) {
      console.log(err);
    });
};

export default fetchBars;
