import React, {Component} from 'react';
import request from 'request'
import UserTab from './usertab'
import {
  Columns,
  Button,
  Dropdown,
  Wrapper,
} from 'react-bulma-components'
import 'bulma/css/bulma.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Twitch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      channels: cookies.get('channels')
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChannel = this.addChannel.bind(this)
    this.removeSpecific = this.removeSpecific.bind(this)
  }

  removeSpecific() {
    var name = "ASD"
    var chl = [...cookies.get('channels')]
    var index = chl.indexOf(name)
    if (index !== -1) {
      chl.splice(index, 1);
    }
    console.log(chl);
    cookies.remove('channels')
    cookies.set('channels', chl, {path: '/'})

  }

  addChannel(add) {
    console.log(add);
    const chl = [
      ...cookies.get('channels'),
      add
    ]
    cookies.remove('channels')
    cookies.set('channels', chl, {path: '/'})
    console.log(chl);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.addChannel(this.state.value)
    event.preventDefault();
  }

  componentWillMount() {
    this.state.channels.map((x) => {
      var cUrl = 'https://wind-bow.glitch.me/twitch-api/streams/' + x
      request(cUrl, (err, resp, body) => {
        body = JSON.parse(body)
        if (body.stream !== null) {
          // console.log(body);
          this.props.add(body.stream)
        }
      })
      return 0
    })
  }

  render() {
    var users = this.props.users.map((x, index) => {
      return <UserTab user={x} key={index}/>
    })

    var dropdown = this.state.channels.map((x) => {
      return (<Dropdown.Item onClick={this.removeSpecific(x)} value={x}>
        {x}
      </Dropdown.Item>)
    })

    // console.log(users);
    return (<div >
      <form onSubmit={this.handleSubmit}>
        <label>
          Add to list:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <Dropdown >
        {dropdown}
      </Dropdown>
      <Columns>
        <Columns.Column size="half" offset="one-quarter">
          <h1>{users}</h1>
        </Columns.Column>
      </Columns>

    </div>);
  }
}

export default Twitch;
