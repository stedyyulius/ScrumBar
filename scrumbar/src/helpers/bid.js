import { ref } from '../config/firebase';

const bidRef = ref.child('bids');

export const getBid = (callback) => {
  bidRef.on('value', callback);
};

export const addBid = newBid => {
  const bidId = bidRef.push().key;
  const bid = {};
  bid[`/${bidId}`] = newBid;

  bidRef.update(bid);
};

export const editBid = (bidId, updatedBid) => {
  const bid = {};
  bid[`/${bidId}`] = updatedBid;
  bidRef.update(bid);
};
