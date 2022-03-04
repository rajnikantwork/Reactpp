import { ConstFunction } from "../Utils/constFunctions";
class LoadingModal {
  isLoading: boolean = false;
  mainLoading: boolean = false;
}
class LoginModal {
  email: string = "";
  password: string = "";
  rememberMe: boolean = false;
}
class ForgotPasswordModal {
  email: string = "";
}
class ResetPasswordModal {
  resetpassword: string = "";
}
class HeaderDataModal {
  fullName: string = "";
  email: string = "";
}
class ToggleSideNavModal {
  toggle: boolean = true;
}
class ProfileModal {
  name: string = "";
  surname: string = "";
  email: string = "";
}
class BackdropModal {
  backdrop: boolean = false;
}
class ResourceModal {
  seminars: any = {};
  documents: any = {};
  examAnnouncements: any = {};
}
class ResourcesViewMoreModal {
  data: any = {};
  page: number = 1;
}
class ResourcesDetailsModal {
  data: any = {};
}
class ResourcesSearchModal {
  search: string = "";
}
let iniFilterData = ConstFunction.setFilterData();
class ResourcesDetailsFilterModal {
  saved: string = iniFilterData ? iniFilterData.saved : "";
  read: string = iniFilterData ? iniFilterData.read : "";
  unread: string = iniFilterData ? iniFilterData.unread : "";
  reading: string = iniFilterData ? iniFilterData.reading : "";
}
class AddTodoModal {
  task: string = "";
  description: string = "";
  week: string = "";
  subject: string = "";
  category: string = "";
}
class AddTodoCategoryModal {
  categoryData: any = [];
}
class AddTodoWeekModal {
  weekData: any = {};
}
class AddTodoSubjectModal {
  subjectData: any = [];
}
class AllTaskModal {
  allTask: any = {};
  totalCount: number = 0;
  page: number = 1;
}
class TaskDetailsModal {
  details: any = {};
}
class OverdueModal {
  overdue: any = {};
  totalCount1: number = 0;
  page1: number = 1;
}
class UserChecklistModal {
  checklistData: any = {};
}
class PracticeQuestionTimeLimitModal {
  enable: boolean = false;
}
class CustomRangeFilterModal {
  allSubjects: string = "All Subjects";
  allTopics: string = "All Topics";
  allCategory: string = "All Category";
  allSeries: string = "All Series";
  allWeeks: string = "All Weeks";
  answered: string = "Answer Type";
}
class AllCategorysDropdownModal {
  allCategorysData: any = {};
}
class AllTopicsDropdownModal {
  allTopicsData: any = {};
}
class AllSeriesDropdownModal {
  allSeriesData: any = [];
}
class AnsweredDropdownModal {
  answeredData: any = {};
}
class PracticeDataModal {
  practice: any = {};
}

class QuestionWeekModal {
  _id: string = "";
  week: number = 1;
  weekId: string = "";
  endDate: string = "";
  startDate: string = "";
}

class QuestionOptionsModal {
  _id: string = "";
  option: string = "";
  isSolution: boolean = false;
}

class NoteModal {
  createdAt: number = 0;
  text: string = "";
}

class MarksModal {
  applicationMark: number = 0;
  issueSpotingMark: number = 0;
  ruleMark: number = 0;
  structureMark: number = 0;
}

class UserAnswereModal {
  sno: number = 0;
  _id: string = "";
  type: string = "";
  status: string = "";
  userId: string = "";
  created: number = 0;
  answere: string = "";
  seriesId: string = "";
  createdAt: string = "";
  subjectId: string = "";
  updatedAt: string = "";
  recordTime: number = 0;
  categoryId: string = "";
  questionId: string = "";
  options: QuestionOptionsModal[] = [];
  notes: NoteModal[] = [];
  marks: MarksModal = new MarksModal();
  score: number = 0;
  totalMark: number = 0;
}
class PracticeQuestionDetailModal {
  data: any = null;
}
class QuestionDataModal {
  sno: number = 0;
  _id: string = "";
  type: string = "";
  isFlag: number = 0;
  created: number = 0;
  subject: string = "";
  avgScore: number = 0;
  ruleMark: number = 0;
  question: string = "";
  seriesId: string = "";
  createdAt: string = "";
  sessionId: string = "";
  subjectId: string = "";
  updatedAt: string = "";
  categoryId: string = "";
  lastAttempt: number = 0;
  status: string = "active";
  modelAnswere: string = "";
  structureMark: number = 0;
  applicationMark: number = 0;
  issueSpotingMark: number = 0;
  category: string = "Relevance";
  options: QuestionOptionsModal[] = [];
  userAnsweres: UserAnswereModal[] = [];
  questionStatus: string = "not_started";
  allQuestions: QuestionDataModal[] = [];
  weekDetails: QuestionWeekModal = new QuestionWeekModal();
}
class TemplateDataModal {
  templatesData: any = {};
  page: number = 1;
}
class TotalDataCountModal {
  totalCount: number = 0;
}
class CreateTemplateSelectionModal {
  selectedWeek: string = "";
  selectedSubject: string = "";
  selectedTopic: string = "";
  selectedTemplate: string = "";
}
class TemplateDetailModal {
  singleTemplateData: any = {};
}
class TimeManagementModal {
  timeManagementData: any = {};
}
class DashboardModal {
  dashboardData: any = {};
}
class DashboardSubjectDetailModal {
  topicDetails: any = {};
}
class SelfAssessmentItem {
  id: number = 0;
  key: 'issueSpotingMark' | 'ruleMark' | 'applicationMark' | 'structureMark' = 'issueSpotingMark';
  color: string = "";
  title: string = "";
  value: string = "";
  selected: boolean = false;
  mark: number = 0;
}
class NotoficationDataModal {
  notificationData: any = {}
}
class PracticeExamResultsModal {
  percentageOne:string = '';
  fileOne:string = '';
  percentageTwo:string = '';
  fileTwo:string = '';
  percentageThree:string = '';
  fileThree:string = '';
  percentageFour:string = '';
  fileFour:string = '';
}
class SelfAssesmentModal {
  selfAssesmentOpen:boolean = false;
}
class ReducersModal {
  globalLoaderReducer: LoadingModal = new LoadingModal();
  logInReducer: LoginModal = new LoginModal();
  forgotPasswordReduce: ForgotPasswordModal = new ForgotPasswordModal();
  toggleSideNavReducer: ToggleSideNavModal = new ToggleSideNavModal();
  profileReducer: ProfileModal = new ProfileModal();
  backdropReducer: BackdropModal = new BackdropModal();
  headerDataReducer: HeaderDataModal = new HeaderDataModal();
  resetPasswordReduce: ResetPasswordModal = new ResetPasswordModal();
  resourceReducer: ResourceModal = new ResourceModal();
  resourcesViewMoreReducer: ResourcesViewMoreModal =
    new ResourcesViewMoreModal();
  resourcesDetailsReducer: ResourcesDetailsModal = new ResourcesDetailsModal();
  resourcesSearchReducer: ResourcesSearchModal = new ResourcesSearchModal();
  resourcesDetailsFilterReducer: ResourcesDetailsFilterModal =
    new ResourcesDetailsFilterModal();
  addTodoReducer: AddTodoModal = new AddTodoModal();
  addTodoCategoryReducer: AddTodoCategoryModal = new AddTodoCategoryModal();
  addTodoWeekReducer: AddTodoWeekModal = new AddTodoWeekModal();
  addTodoSubjectReducer: AddTodoSubjectModal = new AddTodoSubjectModal();
  allTaskReducer: AllTaskModal = new AllTaskModal();
  taskDetailsReducer: TaskDetailsModal = new TaskDetailsModal();
  overdueReducer: OverdueModal = new OverdueModal();
  userChecklistReducer: UserChecklistModal = new UserChecklistModal();
  practiceQuestionTimeLimitReducer: PracticeQuestionTimeLimitModal =
    new PracticeQuestionTimeLimitModal();
  customRangeFilterReducer: CustomRangeFilterModal =
    new CustomRangeFilterModal();
  practiceDataReducer: PracticeDataModal = new PracticeDataModal();
  allTopicDropdownReducer: AllTopicsDropdownModal =
    new AllTopicsDropdownModal();
  allCategoryDropdownReducer: AllCategorysDropdownModal =
    new AllCategorysDropdownModal();
  allSeriesDropdownReducer: AllSeriesDropdownModal =
    new AllSeriesDropdownModal();
  answeredDropdownReducer: AnsweredDropdownModal = new AnsweredDropdownModal();
  templatesDateReducer: TemplateDataModal = new TemplateDataModal()
  totalDataCountReducer: TotalDataCountModal = new TotalDataCountModal()
  createTemplateSelectionReducer: CreateTemplateSelectionModal = new CreateTemplateSelectionModal()
  templateDetailReducer: TemplateDetailModal = new TemplateDetailModal()
  timemanagementReducer: TimeManagementModal = new TimeManagementModal()
  practiceQuestionDetailReducer:PracticeQuestionDetailModal = new PracticeQuestionDetailModal()
  dashboardDataReducer:DashboardModal = new DashboardModal()
  dashboardSubjectDetailReducer: DashboardSubjectDetailModal = new DashboardSubjectDetailModal()
  notificationDataReducer:NotoficationDataModal = new NotoficationDataModal()
  practiceExamResultsReducer:PracticeExamResultsModal = new PracticeExamResultsModal()
  selfAssesmentReducer: SelfAssesmentModal = new SelfAssesmentModal()
}

export {
  ReducersModal,
  LoadingModal,
  LoginModal,
  ForgotPasswordModal,
  ResetPasswordModal,
  ToggleSideNavModal,
  ProfileModal,
  BackdropModal,
  HeaderDataModal,
  ResourceModal,
  ResourcesViewMoreModal,
  ResourcesDetailsModal,
  ResourcesSearchModal,
  ResourcesDetailsFilterModal,
  AddTodoModal,
  AddTodoCategoryModal,
  AddTodoWeekModal,
  AddTodoSubjectModal,
  AllTaskModal,
  TaskDetailsModal,
  OverdueModal,
  UserChecklistModal,
  PracticeQuestionTimeLimitModal,
  CustomRangeFilterModal,
  PracticeDataModal,
  AllTopicsDropdownModal,
  AllCategorysDropdownModal,
  AllSeriesDropdownModal,
  AnsweredDropdownModal,
  NoteModal,
  QuestionDataModal,
  QuestionWeekModal,
  QuestionOptionsModal,
  UserAnswereModal,
  TemplateDataModal,
  TotalDataCountModal,
  CreateTemplateSelectionModal,
  TemplateDetailModal,
  TimeManagementModal,
  PracticeQuestionDetailModal,
  DashboardModal,
  DashboardSubjectDetailModal,
  SelfAssessmentItem,
  NotoficationDataModal,
  PracticeExamResultsModal,
  SelfAssesmentModal
};
