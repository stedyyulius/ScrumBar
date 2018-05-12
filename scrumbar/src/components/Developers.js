import React, { Component } from 'react'
import { getUser } from '../helpers/user'

class Developers extends Component {
  constructor(props) {
    super(props)
    this.state={
      users: []
    }
  }
  componentDidMount() {
    getUser(data => {
      this.setState({
        users: data.val()
      })
    })
  }

  usersList(status) {
    return this.state.users.filter(user => user.status === status)
  }


  render() {
    return (
      <div className="developers-bar">
        <div className="dashboard">
          <div className="developer">
            <img
            className="img-circle"
            style={{border: '5px solid green'}}
            src="https://vignette.wikia.nocookie.net/surrealmemes/images/b/bd/Orang.jpg/revision/latest?cb=20180430202601"
            />
          </div>
        </div>
        <div className="dashboard">
          <div className="dashboard">
            <div className="developer">
              <img
              className="img-circle"
              style={{border: '5px solid red'}}
              src="https://vignette.wikia.nocookie.net/surrealmemes/images/b/bd/Orang.jpg/revision/latest?cb=20180430202601"
              />
            </div>
            <div className="in-progress">
              <div className="in-progress-task">
                <p className="owner">stedy 2 days</p>
                <h4>Login</h4>
                <span className="point">10</span>
              </div>
              <div className="in-progress-task">
                <p className="owner">stedy 2 days</p>
                <h4>Register</h4>
                <span className="point">10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Developers
