import React from 'react';
import { getTask, addTask, editTask } from '../helpers/task';


class CobaFirebase extends React.Component {
  componentDidMount() {
    // getTask();
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
