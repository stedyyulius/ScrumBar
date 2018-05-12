import React from 'react';
import { getTask, addTask, editTask } from '../helpers/task';


class CobaFirebase extends React.Component {
  componentDidMount() {
    const newTask = {
      desc: 'ini task'
    };
    getTask();
    addTask(newTask);
  }
  render() {
    return (
      <div>coba</div>
    );
  }
}

export default CobaFirebase;
