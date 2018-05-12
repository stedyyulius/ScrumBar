import React, { Component } from 'react'
import { getTask, addTask, editTask } from '../helpers/task';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state={
      tasks: []
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

tasksList(section) {
  if (this.state.tasks.length > 0) {
    // console.log(this.state.tasks[0].status)

    const filteredTask = [];

    this.state.tasks.forEach(task => {
      if (task.status === section) {
        filteredTask.push(
          <div className="card" key={task.key}>
            <p className="owner"></p>
            <h4>{task.title}</h4>
            <p>{task.desc}</p>
            <span className="point">{task.point || 0}</span>
          </div>
        )
      };
    });
    return filteredTask;
  }
  return (<p>Loading ...</p>)
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
        </div>
        <div className="section">
          <div className="title-container">
            <h4>On Check</h4>
          </div>
        </div>
        <div className="section">
          <div className="title-container">
            <h4>Done</h4>
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
