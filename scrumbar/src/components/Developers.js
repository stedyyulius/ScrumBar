import React, { Component } from 'react'

class Developers extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  render() {
    return (
      <div class="developers-bar">
        <div class="developer">
          <img
          className="img-circle"
          style={{border: '5px solid green'}}
          src="https://vignette.wikia.nocookie.net/surrealmemes/images/b/bd/Orang.jpg/revision/latest?cb=20180430202601"
          />
        </div>
        <div className="developer">
          <img
          className="img-circle"
          style={{border: '5px solid red'}}
          src="https://vignette.wikia.nocookie.net/surrealmemes/images/b/bd/Orang.jpg/revision/latest?cb=20180430202601"
          />
        </div>
      </div>
    )
  }
}

export default Developers
