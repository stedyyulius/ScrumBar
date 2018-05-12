import { ref } from '../config/firebase';

const userRef = ref.child('users');

export const getUser = (callback) => {
  userRef.on('value', callback);
};

export const addUser = newUser => {
  const userId = userRef.push().key;
  const user = {};
  user[`/${userId}`] = newUser;

  userRef.update(user);
};

export const editUser = (userId, updatedUser) => {
  const user = {};
  user[`/${userId}`] = updatedUser;
  userRef.update(user);
};
