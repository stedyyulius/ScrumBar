import React from 'react';
import { getBid, addBid, editBid } from '../helpers/bid';


class CobaFirebase extends React.Component {
  state = {
    bids: []
  }
  handleAdd = () => {
    const bids = [
      {
        taskId: '-LCISqJ-rDlkyR1uU5-d',
        taskName: 'login feature',
        bids: [],
        done: false
      },
      {
        taskId: '-LCISqJ4sN892GnCRhXc',
        taskName: 'search feature',
        bids: [],
        done: false
      }
  ];
    bids.forEach(bid => {
      addBid(bid);
    });
  }

  componentDidMount = () => {
    getBid( data => {
      const datas = Object.entries(data.val()).map(([key, value]) => {
        return {...value, key};
      });

      this.setState({bids: datas});
    });
  }

  // bid finish
  handleDelete = key => {
    let deletedBid = this.state.bids.find(bid => bid.key === key);
    deletedBid = {
      ...deletedBid,
      stsrc: 'D'
    }
    editBid(key, deletedBid);
  }

  // add array of user yg ngebid
  handleBid = (bidId, userId) => {
    let currBid = this.state.bids.find(bid => bid.key === bidId);
    const bids = currBid.bids || [];
    bids.push({userId, poin: 1});

    currBid.bids = bids;

    editBid(bidId, currBid);

  }

  render() {
    return (
      <div>
        {
          this.state.bids.map(bid => (
            <div key={bid.key}>
              {bid.taskName}
              <button onClick={() => this.handleDelete(bid.key)}>Finish</button>
              <button onClick={() => this.handleBid(bid.key, '-LCJ1nhgKWA-1SPL1FIq')}>BID</button>
            </div>
          ))
        }
        <button onClick={this.handleAdd}>Add TES</button>
      </div>
    );
  }
}

export default CobaFirebase;
