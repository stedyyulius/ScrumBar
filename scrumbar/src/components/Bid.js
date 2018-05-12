import React, { Component } from 'react';
import { addBid, getBid, editBid } from '../helpers/bid';

class Bid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        id: "1234",
        role:  "programmer",
      }
    }
  }

  componentDidMount () {
    getBid(data => {
      let newBid = data.filter(datum => {
        return datum.stsrc === "D";
      })
      this.setState({
        bid: newBid
      }, () => {
        console.log(this.state.bid)
      })
    });
  }

  render() {
    if (this.state.user.role === "lead") {
      return (
        <div>
          <p>lead</p>
        </div>
      )
    } else if (this.state.user.role === "programmer") {
      return (
        <div>
          <p>programmer</p>
        </div>
      )
    }
  }
}

export default Bid
