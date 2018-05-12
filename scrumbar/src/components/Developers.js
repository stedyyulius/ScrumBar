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
    getUser( data => {
      const datas = Object.entries(data.val()).map(([key, value]) => {
        return {...value, key};
      });
      this.setState({users: datas});
  });
}

usersList(status) {
  if (this.state.tasks.length > 0) {
    // console.log(this.state.tasks[0].status)

    const filteredUser = [];

    this.state.users.forEach(user => {
      if (user.status === status) {
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
        )
      };
    });
    return filteredUser;
  }
  return (<p>Loading ...</p>)
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
            alt=""
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
              alt=""
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
