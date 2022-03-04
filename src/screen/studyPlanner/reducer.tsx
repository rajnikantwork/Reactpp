import Utils from "../../Utils";
import {
  AddTodoModal,
  AddTodoCategoryModal,
  AddTodoWeekModal,
  AddTodoSubjectModal,
  AllTaskModal,
  TaskDetailsModal,
  OverdueModal,
  UserChecklistModal
} from "../../modal/index";
export const addTodoReducer = (
  state: AddTodoModal = new AddTodoModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.ADD_TODO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const addTodoWeekReducer = (
  state: AddTodoWeekModal = new AddTodoWeekModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.GET_WEEK:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const addTodoSubjectReducer = (
  state: AddTodoSubjectModal = new AddTodoSubjectModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.GET_SUBJECTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const addTodoCategoryReducer = (
  state: AddTodoCategoryModal = new AddTodoCategoryModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.GET_CATEGORY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const allTaskReducer = (
  state: AllTaskModal = new AllTaskModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.ALL_TASK:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const taskDetailsReducer = (
  state: TaskDetailsModal = new TaskDetailsModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.TASK_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const overdueReducer = (
  state: OverdueModal = new OverdueModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.OVERDUE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const userChecklistReducer = (
  state: UserChecklistModal = new UserChecklistModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.CHECKLIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
