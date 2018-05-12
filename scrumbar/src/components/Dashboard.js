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
      this.setState({tasks: data.val()});
    });
  }

  tasksList(section) {
    if (this.state.tasks.length > 0) {
      return this.state.tasks.filter(task => task.status === section)
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
          {this.tasksList('Backlog')}
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
