import React from 'react';
import { getTask, addTask } from '../helpers/task';


class CobaFirebase extends React.Component {
  componentDidMount() {
    console.log("did mount")

    console.log("get task =  ", getTask());
  }

  handleAdd = () => {
    const newTask = {
      desc: 'ini task baru lagi lagi lagi'+Date.now()
    };
    addTask(newTask);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAdd}>Add</button>
      </div>
    );
  }
}

export default CobaFirebase;
