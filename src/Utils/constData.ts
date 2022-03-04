import LocalImages from "./images"
interface SideNavigation {
    icon:string;
    name:string;
}
const sideNavigation:SideNavigation[] = [
    {
      icon: LocalImages.NAV_STUDY_PLANNER,
      name: "Study Planner",
    },
    {
      icon: LocalImages.NAV_MY_PROGRESS_PLANNER,
      name: "My Progress",
    },
    {
      icon: LocalImages.NAV_TIMETABLE_PLANNER,
      name: "Timetable",
    },
    {
      icon: LocalImages.NAV_PRACTICE,
      name: "Practice",
    },
    {
      icon: LocalImages.NAV_RESOURCE,
      name: "Resources",
    },
    {
      icon: LocalImages.NAV_MY_TEMPLATE,
      name: "My Templates",
    },
    {
      icon: LocalImages.NOTIFICATION,
      name: "Notification",
    },
    {
      icon: LocalImages.NAV_SETTINGS,
      name: "Settings",
    },
  ];
const categoryDropdown = [
    {
      _id: "1",
      topics: "Highest Priority",
    },
    {
      _id: "2",
      topics: "Moderate Priority",
    },
    {
      _id: "3",
      topics: "Rare",
    },
  ];
const answeredDropdown = [
    {
      _id: "1",
      answered: "Not answered",
    },
    {
      _id: "2",
      answered: "Answered",
    }
  ]
  export default sideNavigation;
  export const ConstData = {
    categoryDropdown,
    answeredDropdown
  }