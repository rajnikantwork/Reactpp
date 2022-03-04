import Utils from "../../Utils/index";
import {
  PracticeQuestionTimeLimitModal,
  CustomRangeFilterModal,
  PracticeDataModal,
  AllTopicsDropdownModal,
  AllCategorysDropdownModal,
  AllSeriesDropdownModal,
  AnsweredDropdownModal,
  PracticeQuestionDetailModal,
  SelfAssesmentModal
} from "../../modal/index";
export const practiceQuestionTimeLimitReducer = (
  state: PracticeQuestionTimeLimitModal = new PracticeQuestionTimeLimitModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.TIME_LIMIT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const customRangeFilterReducer = (
  state: CustomRangeFilterModal = new CustomRangeFilterModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.CUSTOM_RANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const practiceDataReducer = (
  state: PracticeDataModal = new PracticeDataModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.PRACTICE_QUESTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const allTopicDropdownReducer = (
  state: AllTopicsDropdownModal = new AllTopicsDropdownModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.ALL_TOPICS_DROPDOWN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const allCategoryDropdownReducer = (
  state: AllCategorysDropdownModal = new AllCategorysDropdownModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.ALL_CATEGORIES_DROPDOWN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const allSeriesDropdownReducer = (
  state: AllSeriesDropdownModal = new AllSeriesDropdownModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.ALL_SERIES_DROPDOWN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const answeredDropdownReducer = (
  state: AnsweredDropdownModal = new AnsweredDropdownModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.ANSWERED_DROPDOWN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const practiceQuestionDetailReducer = (
  state: PracticeQuestionDetailModal = new PracticeQuestionDetailModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.PRACTICE_QUESTION_DETAILS:
      return { ...state, ...action.payload };
    case Utils.ActionName.PRACTICE_ANSWER_SCORE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const selfAssesmentReducer = (
  state: SelfAssesmentModal = new SelfAssesmentModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.SELF_ASSESSMENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
