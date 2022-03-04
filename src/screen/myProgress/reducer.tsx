import Utils from "../../Utils";
import { DashboardModal,DashboardSubjectDetailModal, PracticeExamResultsModal } from "../../modal/index";
export const dashboardDataReducer = (
  state: DashboardModal = new DashboardModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.DASHBOARD_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const dashboardSubjectDetailReducer = (
  state: DashboardSubjectDetailModal = new DashboardSubjectDetailModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.DASHBOARD_SUBJECT_DETAIL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const practiceExamResultsReducer = (
  state: PracticeExamResultsModal = new PracticeExamResultsModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.PRACTICE_EXAM_RESULTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
