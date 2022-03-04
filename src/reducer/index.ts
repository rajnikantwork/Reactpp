import { combineReducers } from "redux";
import { logInReducer, forgotPasswordReduce, resetPasswordReduce } from "../screen/login/reducer"
import { toggleSideNavReducer } from "../components/sideNavigation/reducer"
import { profileReducer } from "../screen/settings/reducer"
import { globalLoaderReducer, backdropReducer, headerDataReducer, totalDataCountReducer } from "./rootReducer"
import { resourceReducer, resourcesViewMoreReducer, resourcesDetailsReducer, resourcesDetailsFilterReducer, resourcesSearchReducer } from "../screen/resources/reducer"
import { addTodoReducer, addTodoWeekReducer, addTodoSubjectReducer, addTodoCategoryReducer, allTaskReducer, taskDetailsReducer, overdueReducer, userChecklistReducer } from "../screen/studyPlanner/reducer"
import { practiceQuestionTimeLimitReducer, customRangeFilterReducer, practiceDataReducer, allTopicDropdownReducer, allCategoryDropdownReducer, allSeriesDropdownReducer, answeredDropdownReducer, practiceQuestionDetailReducer, selfAssesmentReducer } from "../screen/practice/reducer"
import {templatesDateReducer, createTemplateSelectionReducer, templateDetailReducer} from "../screen/myTemplates/reducer"
import {dashboardDataReducer, dashboardSubjectDetailReducer, practiceExamResultsReducer} from "../screen/myProgress/reducer"
import {timemanagementReducer} from "../screen/timetable/reducer"
import {notificationDataReducer} from "../screen/notification/reducer"
const rootReducer = combineReducers({
    globalLoaderReducer,
    backdropReducer,
    logInReducer,
    forgotPasswordReduce,
    toggleSideNavReducer,
    profileReducer,
    headerDataReducer,
    resetPasswordReduce,
    resourceReducer,
    resourcesViewMoreReducer,
    resourcesDetailsReducer,
    resourcesDetailsFilterReducer,
    resourcesSearchReducer,
    addTodoReducer,
    addTodoWeekReducer,
    addTodoSubjectReducer,
    addTodoCategoryReducer,
    allTaskReducer,
    taskDetailsReducer,
    overdueReducer,
    userChecklistReducer,
    practiceQuestionTimeLimitReducer,
    customRangeFilterReducer,
    practiceDataReducer,
    allTopicDropdownReducer,
    allCategoryDropdownReducer,
    allSeriesDropdownReducer,
    answeredDropdownReducer,
    templatesDateReducer,
    totalDataCountReducer,
    createTemplateSelectionReducer,
    templateDetailReducer,
    timemanagementReducer,
    practiceQuestionDetailReducer,
    dashboardDataReducer,
    dashboardSubjectDetailReducer,
    notificationDataReducer,
    practiceExamResultsReducer,
    selfAssesmentReducer
})

export default rootReducer;