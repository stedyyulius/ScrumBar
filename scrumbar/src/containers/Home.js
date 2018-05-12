import React , { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Navbar from '../components/Navbar'
import Developers from '../components/Developers'
import Dashboard from '../components/Dashboard'
import Bid from '../components/Bid'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
    return (
      <div>
        <Navbar />
        <Bid />
        <Developers />
        <Dashboard />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Home)
