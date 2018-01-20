import React from 'react';
import axios from 'axios';
import { Rounds } from './components/Rounds/Rounds';
import { Stats } from './components/Stats/Stats';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {requestFailed: false};
  }

  componentDidMount() {
    axios.get('/api/my_info')
      .then(userData => {
        if (userData.data['error']) {
          this.setState({requestFailed: true});
        } else {
          this.setState({userData: userData.data});
        }
      })
      .catch(() => this.setState({requestFailed: true}));
  }

  onSeasonClick(season) {
    this.setState({selectedSeason: season});
  }

  render() {
    if (!this.state.userData) {
      if (this.state.requestFailed) {
        return <p>Failed to retrieve user data</p>;
      } else {
        return <p>Loading user data...</p>;
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>all statistics:</h3>
          <Stats
            userData={this.state.userData}
            onSeasonClick={season => this.onSeasonClick(season)}
          />
          <br />
          <Rounds
            userData={this.state.userData}
            selectedSeason={this.state.selectedSeason}
          />
        </div>
      </div>
    );
  }
}
