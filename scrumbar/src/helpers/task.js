import { ref } from '../config/firebase';

const taskRef = ref.child('tasks');

export const getTask = (callback) => {
  taskRef.on('value', callback);
};

export const addTask = newTask => {
  const taskId = taskRef.push().key;
  const task = {};
  task[`/${taskId}`] = newTask;

  taskRef.update(task);
};

export const editTask = (taskId, updatedTask) => {
  const task = {};
  task[`/${taskId}`] = updatedTask;
  taskRef.update(task);
};
