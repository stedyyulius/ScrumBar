import { ref } from '../config/firebase';

export const replyNotif = (props, type = 'add') => {
  ref.child(`reply/${props.postId}`).transaction(data => {
    data = JSON.parse(data);

    if (data === null) data = {};
    if (type === 'add') {
      data.tot = typeof data.tot === 'undefined' ? 1 : data.tot + 1;

      if (typeof data.detail === 'undefined') data.detail = [props];
      else data.detail.push(props);
    } else {
      data.props = [];
      data.tot = 0;
    }
    return JSON.stringify(data);
  });
};

export const listenRequest = (postId, callback) => {
  ref.child(`reply/${postId}`).on('value', callback);
};
