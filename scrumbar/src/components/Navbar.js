import React, { Component } from 'react'
import { addTask } from '../helpers/task'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state={
      title: '',
      desc: '',
      type: ''
    }
  }

  createTask() {
    const task = {
      title: this.state.title,
      desc: this.state.desc,
      type: this.state.type,
      status: 'Backlog',
      created: Date.now(),
    }
    addTask(task)
  }


  render() {
    return (
      <div>
        <ul>
          <li><a href="#" data-toggle="modal" data-target="#createModal">Create Task</a></li>
          <li className="logo" ><a>-- BidScrum --</a></li>
        </ul>
        <div className="modal fade" id="createModal" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create Task</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Name</h6>
                <input type="text" className="form-control" onChange={(e) => this.setState({title: e.target.value})}/>
                <br />
                <h6>Description</h6>
                <input type="text" className="form-control" onChange={(e) => this.setState({desc: e.target.value})}/>
                <br />
                <h6>Type</h6>
                <select className="form-control" onChange={(e)=>this.setState({type: e.target.value})}>
                  <option>Bug</option>
                  <option>Feature</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={()=> this.createTask()}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar
