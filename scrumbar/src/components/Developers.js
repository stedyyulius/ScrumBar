import React, { Component } from 'react'
import { getUser } from '../helpers/user'
import { getTask } from '../helpers/task'

class Developers extends Component {
  constructor(props) {
    super(props)
    this.state={
      users: [],
      tasks: [],
    }
  }

  componentDidMount() {
    getUser( data => {
      this.setState({users: data});
    });
    getTask( data => {
      const datas = Object.entries(data.val()).map(([key, value]) => {
        return {...value, key};
      });
      this.setState({tasks: datas});
    });
  }

  usersList(section) {
    if (this.state.tasks.length > 0) {
      // console.log(this.state.tasks[0].status)

      const filteredUser = [];
      const freeUser = []
      const workingUsers = []

      this.state.users.forEach(user => {
        for (let i = 0; i < this.state.tasks.length; i++) {
          if (typeof this.state.tasks[i].userAssigned !== 'undefined' && this.state.tasks[i].userAssigned.includes(user.key) && this.state.tasks[i].status !== 'done' && this.state.tasks[i].status !== 'Waiting QA') {
            workingUsers.push(user.key)
            filteredUser.push(
              <div className="dashboard">
                <div className="developer">
                  <img
                    className="img-circle"
                    style={{border: '5px solid red'}}
                    src={user.photo}
                    alt=""
                  />
                </div>
                <div className="in-progress">
                  <div className="in-progress-task">
                    <p className="owner">stedy 2 days</p>
                    <span className="type">bug</span>
                    <h4>Login</h4>
                    <span className="point">10</span>
                  </div>
                  <div className="in-progress-task">
                    <p className="owner">stedy 2 days</p>
                    <span className="type">bug</span>
                    <h4>Register</h4>
                    <span className="point">10</span>
                  </div>
                </div>
              </div>
            )
          }
        }
        if (!workingUsers.includes(user.key)) {
          freeUser.push(
            <div key={user.key} className="dashboard">
              <div className="developer">
                <img
                  className="img-circle"
                  style={{border: '5px solid green'}}
                  src={user.photo}
                  alt=""
                />
              </div>
            </div>
          )
        }
      });
      if (section === 'working') {
        return filteredUser;
      }
      return freeUser;
    }
    return (<img className="loading" src="https://www.pedul.com/images/loading.gif" />)
  }

  render() {
    return (
      <div className="developers-bar">
        <div className="dashboard">
          {this.usersList('free')}
        </div>
        <div className="dashboard">
          {this.usersList('working')}
        </div>
      </div>
    )
  }
}

export default Developers
