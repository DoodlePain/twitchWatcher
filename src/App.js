import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Twitch from './twitch.js'

//TODO:
// - Stile a little bit that shit


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: []
    }

    this.add = this.add.bind(this);
  }

  add(user) {
    var channels = [
      ...this.state.channels, {
        name: user.channel.display_name,
        game: user.game,
        viewers: user.viewers,
        title: user.channel.status,
        image: user.channel.logo,
        date: user.channel.created_at,
        url: "www.twitch.tv/"+user.channel.display_name
      }
    ]
    this.setState({channels: channels})
  }
  render() {

    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Twitch Live Channels</h1>
      </header>
      <div>
          <Twitch add={this.add} users={this.state.channels}></Twitch>
      </div>
    </div>);
  }
}

export default App;
