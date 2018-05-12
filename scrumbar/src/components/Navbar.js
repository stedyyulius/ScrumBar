import React, { Component } from 'react'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  render() {
    return(
      <ul>
        <li><a href="#">Create Task</a></li>
        <li class="logo" ><a>ScrumBar</a></li>
      </ul>
    )
  }
}

export default Navbar
