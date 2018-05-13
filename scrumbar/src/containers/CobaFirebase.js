import React from 'react';
import { getUser, addUser, editUser } from '../helpers/user';

class CobaFirebase extends React.Component {
  state = {
    users: []
  }
  handleAdd = () => {
    const users = [
      {
        username: 'Chris',
        password: 'password',
        role: 'programmer',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Chris_Hemsworth_by_Gage_Skidmore.jpg/1200px-Chris_Hemsworth_by_Gage_Skidmore.jpg'
      },
      {
        username: 'Evan',
        password: 'password',
        role: 'programmer',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/5_Dec._2016_CJCS_USO_Holiday_Tour_-_Incirlik_Air_Base_161205-D-PB383-044_%2831430825446%29_%28cropped%29_%28cropped%29.jpg/220px-5_Dec._2016_CJCS_USO_Holiday_Tour_-_Incirlik_Air_Base_161205-D-PB383-044_%2831430825446%29_%28cropped%29_%28cropped%29.jpg'
      }
  ];
    users.forEach(user => {
      addUser(user);
    });
  }

  componentDidMount = () => {
    // getUser( data => {
    //   const datas = Object.entries(data.val()).map(([key, value]) => {
    //     return {...value, key};
    //   });

    //   this.setState({users: datas});
    // });
  }

  // user finish
  handleDelete = key => {
    let deletedUser = this.state.users.find(user => user.key === key);
    deletedUser = {
      ...deletedUser,
      stsrc: 'D'
    }
    editUser(key, deletedUser);
  }

  // // add array of user yg ngeuser
  // handleUser = (userId, userId) => {
  //   let currUser = this.state.users.find(user => user.key === userId);
  //   const users = currUser.users || [];
  //   users.push({userId, poin: 1});

  //   currUser.users = users;

  //   editUser(userId, currUser);

  // }

  render() {
    return (
      <div>
        {
          this.state.users.map(user => (
            <div key={user.key}>
              {user.taskName}
              <button onClick={() => this.handleDelete(user.key)}>Finish</button>
              <button onClick={() => this.handleUser(user.key, '-LCJ1nhgKWA-1SPL1FIq')}>BID</button>
            </div>
          ))
        }
        <button onClick={this.handleAdd}>Add TES</button>
      </div>
    );
  }
}

export default CobaFirebase;
