import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    return { ...state, [task.id]: task };
  },
}, {});

const newTaskText = handleActions({
  [actions.addTask]() {
    return '';
  },
  [actions.updateNewTaskText](state, { payload: { text } }) {
    return text;
  },
}, '');


export default combineReducers({
  tasks,
  newTaskText,
});
