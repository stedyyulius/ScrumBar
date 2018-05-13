import React , { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Navbar from '../components/Navbar'
import Developers from '../components/Developers'
import Dashboard from '../components/Dashboard'
import Bid from '../components/Bid'

const userList= [
  {
    key: "-LCJ1nhoDIqzOaWaL_dQ",
    role: "programmer",
    username: "Scarlett",
    id: "1234"
  },
  {
    key: "-LCJ1nhoDIqzOaWaL_dS",
    role:"lead",
    username: "Tom",
    id: "1234"
  },
  {
    key: "-LCJ1nhoDIqzOaWaL_dR",
    role:"programmer",
    username: "Ben",
    id: "1234"
  },
  {
    key: "-LCMIWX6gqpSYtE4_Lei",
    role:"programmer",
    username: "Evan",
    id: "1234"
  },
  {
    key: "-LCMIWX1_7j7m8ugh4ab",
    role:"programmer",
    username: "Chris",
    id: "1234"
  }
];

class Home extends Component {
  constructor(props) {
    super(props)
    this.state={
      user: userList[0]
    }
  }

  handleChangeUser = () => {
    const idx = Math.floor(Math.random() * userList.length);
    this.setState({user: userList[idx]}, () => {
      document.getElementById('username').innerHTML = this.state.user.username;
    });
    // const username = document.getElementById('username').innerHTML(this.state.user.username);
  }

  render() {
    return (
      <div>
        <Navbar username={this.state.user.username} handleChangeUser={this.handleChangeUser}/>
        <Bid user={this.state.user}/>
        <Developers user={this.state.user}/>
        <Dashboard user={this.state.user}/>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Home)
