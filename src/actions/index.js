import { createAction } from 'redux-actions';


export const addTask = createAction('TASK_ADD', task =>
  ({ task: { ...task, id: _.uniqueId() } }));
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
