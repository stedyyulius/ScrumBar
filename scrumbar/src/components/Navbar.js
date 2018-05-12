import React, { Component } from 'react'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  render() {
    return (
      <div>
        <ul>
          <li><a href="#" data-toggle="modal" data-target="#createModal">Create Task</a></li>
          <li className="logo" ><a>ScrumBar</a></li>
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
                <h6>Task Name</h6>
                <input type="text" className="form-control" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar
