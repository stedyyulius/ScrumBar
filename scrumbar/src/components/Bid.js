import React, { Component } from 'react';
import { getBid, editBid } from '../helpers/bid';
import { getUser } from '../helpers/user';
import { getTask, editTask } from '../helpers/task';

class Bid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        key: "-LCJ1nhoDIqzOaWaL_dS",
        role:"lead",
      },
      users: [],
      bid: {},
      poin: "",
      latestBidId: "",
      smallests: [],
      taskId: "",
      tasks: [],
      task: {}
    }
  }

  componentWillMount () {
    getBid(data => {
      let newBid = data.filter(datum => {
        return datum.stsrc !== "D";
      })
      this.setState({
        bid: newBid[0],
        taskId: newBid[0].taskId
      })
    });
    getUser(data => {
      console.log("data user = ", data)
      this.setState({
        users: data
      })
    })
    getTask(data => {
      this.setState({
        tasks: data
      })
    })
  }

  userBid = () => {
    let currBid = this.state.bid
    console.log("currbid = ", currBid);
    currBid.bids = [...currBid.bids, {
      userId: this.state.user.key,
      poin: this.state.poin
    }]
    console.log("currupd = ", currBid)
    editBid(currBid.key, currBid)
  }

  finishBid = () => {
    let pastBid = this.state.bid
    pastBid.stsrc = "D"
    editBid(pastBid.key, pastBid)
    let smallest = pastBid.bids.reduce((prev, curr) => {
      return Math.min(prev.poin, curr.poin)
    })
    console.log("smallest = ", smallest)
    let smallests = pastBid.bids.filter((bid) => {
      return bid.poin === smallest
    })
    console.log("smallests = ", smallests)
    this.setState({
      smallests: smallests,
      bid: {}
    })
  }

  activeBid () {
    if (Object.keys(this.state.bid).length > 0) {
      return (
        <div>
          <p>{this.state.bid.taskName}</p>
          <span><input type="text" className="form-control" onChange={(e) => this.setState({poin: e.target.value})} /></span>
          <button onClick={this.userBid}>BID!</button>
        </div>
      )
    }
    return null
  }

  findUser = (key) => {
    console.log("users = ", this.state.users)
    return this.state.users.find(user => {
      return user.key === key
    })
  }

  resultBid = () => {
    if (Object.keys(this.state.bid).length > 0) {
      return (
        <div>
          <p>{this.state.bid.taskName}</p>
          {this.state.bid.bids.map(bid => {
            let username = this.findUser(bid.user)
            console.log("username = ", username)
            return (
              <div key={bid.key}>
                <p>{`${username} - ${bid.poin}`}</p>
              </div>
            )
          })}
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

  assignTaskTo = (userKey) => {
    let task = this.state.tasks.find(task => {
      return task.key === this.state.taskId
    })
    task.userAssigned = userKey
    editTask(this.state.taskId, task)
  }

  assignBid () {
    if (this.state.smallests.length > 0) {
      return (
        <div>
          {this.state.smallests.map(user => {
            return (
              <p key={user} onClick={() => this.assignTaskTo(user.user)}>
                {`${this.findUser(user.user)}`}
              </p>
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
