import React , { Component } from 'react'

import Navbar from '../components/Navbar'
import Developers from '../components/Developers'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
    return (
      <div>
        <Navbar />
        <Developers />
      </div>
    )
  }
}

export default Home
