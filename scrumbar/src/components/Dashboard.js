import React, { Component } from 'react'
import { getTask, addTask, editTask } from '../helpers/task';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state={
      tasks: [],
      isSelect: '',
    }
  }

  componentDidMount() {
    getTask( data => {
      const datas = Object.entries(data.val()).map(([key, value]) => {
        return {...value, key};
      });
      this.setState({tasks: datas});
  });
}

selectTask(key) {
  if (this.state.isSelect === key) {
    this.setState({
      isSelect: ''
    })
  } else {
    this.setState({
      isSelect: key
    })
  }
}

edit(task, status) {
  const newTask = task
  task.status = status
  editTask(task.key, newTask)
}

selectMenu(task) {
  if (this.state.isSelect === task.key) {
    return (
      <div className="select">
        <div className="select-item" onClick={()=> this.edit(task, 'Backlog')}>
          <h4>Backlog</h4>
        </div>
        <div className="select-item" onClick={()=> this.edit(task, 'In Progress')}>
          <h4>In Progress</h4>
        </div>
        <div className="select-item" onClick={()=> this.edit(task, 'Waiting QA')}>
          <h4>Waiting for QA</h4>
        </div>
        <div className="select-item" onClick={()=> this.edit(task, 'done')}>
          <h4>Done</h4>
        </div>
      </div>
    )
  }
}

tasksList(section) {
  if (this.state.tasks.length > 0) {
    // console.log(this.state.tasks[0].status)

    const filteredTask = [];

    this.state.tasks.forEach(task => {
      if (task.status && task.status.toLowerCase() === section.toLowerCase()) {
        filteredTask.push(
          <div className="card" key={task.key} onClick={()=> this.selectTask(task.key)}>
            <p className="owner">{new Date(task.created).toString().slice(0,15)}</p>
            <h4>{task.title}</h4>
            <span className="type">{task.type}</span>
            <p>{task.desc}</p>
            <span className="point">{task.point || 0}</span>
            {this.selectMenu(task)}
          </div>
        )
      }
    });
    return filteredTask;
  }
  return (<img className="loading" src="https://www.pedul.com/images/loading.gif" />)
}

  render() {
    return (
      <div className="dashboard">
        <div className="section">
          <div className="title-container">
            <h4>Backlog</h4>
          </div>
          <div className="section-body">
            {this.tasksList('Backlog')}
          </div>
        </div>
        <div className="section">
          <div className="title-container">
            <h4>In Progress</h4>
          </div>
          <div className="section-body">
            {this.tasksList('In Progress')}
          </div>
        </div>
        <div className="section">
          <div className="title-container">
            <h4>Waiting QA</h4>
          </div>
          <div className="section-body">
            {this.tasksList('Waiting QA')}
          </div>
        </div>
        <div className="section">
          <div className="title-container">
            <h4>Done</h4>
          </div>
          <div className="section-body">
            {this.tasksList('Done')}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard



// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { DragSource } from 'react-dnd';
//
// const ItemTypes = {
//   KNIGHT: 'knight'
// }
//
// const knightSource = {
//   beginDrag(props) {
//     return {};
//   }
// };
//
// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   }
// }
//
// class Knight extends Component {
//   render() {
//     const { connectDragSource, isDragging } = this.props;
//     return connectDragSource(
//       <div style={{
//         opacity: isDragging ? 0.5 : 1,
//         fontSize: 25,
//         fontWeight: 'bold',
//         cursor: 'move'
//       }}>
//         DRAG GUA
//       </div>
//     );
//   }
// }
//
// Knight.propTypes = {
//   connectDragSource: PropTypes.func.isRequired,
//   isDragging: PropTypes.bool.isRequired
// };
//
// export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
