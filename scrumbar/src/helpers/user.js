import { ref } from '../config/firebase';

const userRef = ref.child('users');

export const getUser = (callback) => {
  userRef.on('value', data => {
    return callback(Object.entries(data.val()).map(([key, value]) => {
      return {...value, key};
    }))
  });
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
