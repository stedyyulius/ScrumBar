import React, { Component } from 'react';
import { getBid, editBid } from '../helpers/bid';
import { editTask } from '../helpers/task';

class Bid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      // user: {
      //   // key: "-LCJ1nhoDIqzOaWaL_dS",
      //   // role:"lead",
      //   // username: "Tom"
      //   // key: "-LCJ1nhoDIqzOaWaL_dR",
      //   // role:"programmer",
      //   // username: "Ben"
      //   key: "-LCJ1nhoDIqzOaWaL_dQ",
      //   role: "programmer",
      //   username: "Scarlett"
      // },
      lastBid: {},
      bid: {},
      poin: "",
      latestBidId: "",
      smallests: [],
    }
  }


  componentDidMount() {
    document.getElementById('username').innerHTML = this.state.user.username;
  }
  componentWillMount () {
    getBid(data => {
      let newBid = data.filter(datum => {
        return datum.stsrc === "A";
      })
      this.setState({
        bid: newBid[0],
      })
    });
    // getUser(data => {
    //   console.log("data user = ", data)
    //   this.setState({
    //     users: data
    //   })
    // })
    // getTask(data => {
    //   this.setState({
    //     tasks: data
    //   })
    // })
  }

  userBid = () => {
    let currBid = this.state.bid
    currBid.bids = currBid.bids ? [...currBid.bids, {
      user: this.state.user,
      poin: this.state.poin
    }] : [{
      user: this.state.user,
      poin: this.state.poin
    }]
    editBid(currBid.key, currBid)
    alert('Bid Success')
  }

  finishBid = () => {
    let pastBid = this.state.bid
    pastBid.stsrc = "D"
    editBid(pastBid.key, pastBid)
    this.setState({
      lastBid: pastBid
    }, () => {
      if (pastBid.bids){
        let smallest = pastBid.bids.reduce((prev, curr) => {
          return Math.min(prev, curr.poin)
        }, 10000)
        let smallests = pastBid.bids.filter((bid) => {
          return bid.poin == smallest
        })
        this.setState({
          smallests: smallests,
          bid: {}
        })
      }
    })
  }

  activeBid () {
    if (this.state.bid && Object.keys(this.state.bid).length > 0) {
      return (
        <div className="bids">
          <p>{this.state.bid.task.title}</p>
          <span>
            <input type="text" className="form-control bid-input" onChange={(e) => this.setState({poin: e.target.value})} />
          </span>
          <br />
          <button onClick={this.userBid}>BID!</button>
        </div>
      )
    }
    return null
  }

  // findUser = (key) => {
  //   console.log("users = ", this.state.users)
  //   return this.state.users.find(user => {
  //     return user.key === key
  //   })
  // }

  resultBid = () => {
    if (this.state.bid && Object.keys(this.state.bid).length > 0) {
      return (
        <div className="bids">
          <h2>{this.state.bid.task.title}</h2>
          {this.state.bid.bids && this.state.bid.bids.map(bid => {
            return (
              <div key={bid.key}>
                <p>{`${bid.user.username} - ${bid.poin}`}</p>
              </div>
            )
          })}
          <button onClick={this.finishBid}>Finalize Bid</button>
        </div>
      )
    }
    return null
  }

  randomize () {
    let randomizeNum = Math.floor(Math.random() * Math.floor(this.state.smallests.length))
    this.setState({
      smallests: this.state.smallests[randomizeNum]
    })
  }

  assignTaskTo = (data) => {
    let task = this.state.lastBid.task
    task.userAssigned = data.user.key
    task.usernameAssigned = data.user.username
    task.poin = data.poin
    editTask(task.key, task)
    this.setState({
      lastBid: {},
      smallests: []
    })
  }

  assignBid () {
    if (this.state.smallests.length > 0) {
      return (
        <div className="bids">
          <h1>{this.state.lastBid.task.title}</h1>
          <hr />
          {this.state.smallests.map(small => {
            return (
              <div key={small.user.key}>
                <h3 onClick={() => this.assignTaskTo(small)}>
                  {`${small.user.username}`}
                </h3>
              </div>
            )
          })}
          {this.state.smallests.length > 1 ? (
            <button onClick={this.randomize}>Randomize</button>
          ) : null}
        </div>
      )
    }
    return null
  }

  render() {
    if (this.state.user.role === "lead") {
      return (
        <div>
          {this.resultBid()}
          {this.assignBid()}
        </div>
      )
    } else if (this.state.user.role === "programmer") {
      return (this.activeBid())
    }
  }
}

export default Bid
