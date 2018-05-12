import React, { Component } from 'react'
import { getUser } from '../helpers/user'
import { getTask } from '../helpers/task'

class Developers extends Component {
  constructor(props) {
    super(props)
    this.state={
      users: [],
      tasks: [],
      isCheck: '',
    }
  }

  componentDidMount() {
    getUser( data => {
      this.setState({users: data});
    });
    getTask( data => {
      this.setState({tasks: data});
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
        } else {
          let works = []
          for (let j = 0; j < this.state.tasks.length; j++) {
            if (typeof this.state.tasks[j].userAssigned !== 'undefined' && this.state.tasks[j].userAssigned.includes(user.key) && this.state.tasks[j].status !== 'done' && this.state.tasks[j].status !== 'Waiting QA') {
              works.push(
                <div className="in-progress" key={this.state.tasks[j].key}>
                  <div className="in-progress-task">
                    <p className="owner">{this.state.tasks[j].name}</p>
                    <span className="type">{this.state.tasks[j].type}</span>
                    <h4>{this.state.tasks[j].title}</h4>
                    <p>{this.state.tasks[j].desc}</p>
                    <span className="point">{this.state.tasks[j].point}</span>
                  </div>
                </div>
              )
            }
          }
          filteredUser.push(
            <div className="dashboard" key={user.key} onClick={(e)=> this.check(user.key)}>
              <div className="developer">
                <img
                  className="img-circle"
                  style={{border: '5px solid red'}}
                  src={user.photo}
                  alt=""
                />
              </div>
              {(this.state.isCheck === user.key)
                ? <div className="taskColumn">
                    {works}
                  </div>
                : null
              }
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

  check(key) {
    if (this.state.isCheck === key) {
      this.setState({
        isCheck: ''
      })
    } else {
      this.setState({
        isCheck: key
      })
    }
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
