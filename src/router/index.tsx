import React, { lazy } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "../hoc/publicRoute/index";
import Utils from "../Utils";
import PrivateRoute from "../hoc/privateRoute";
const Login = lazy(() => import("../screen/login/index"));
const ForgotPassword = lazy(() => import("../screen/login/forgotPassword"));
const Settings = lazy(() => import("../screen/settings/index"));
const MyProgress = lazy(() => import("../screen/myProgress/index"));
const Topics = lazy(() => import("../screen/myProgress/topics/index"));
const MyTemplates = lazy(() => import("../screen/myTemplates/index"));
const Practices = lazy(() => import("../screen/practice/index"));
const Resources = lazy(() => import("../screen/resources/index"));
const StudyPlanner = lazy(() => import("../screen/studyPlanner/index"));
const Timetable = lazy(() => import("../screen/timetable/index"));
const Notification = lazy(() => import("../screen/notification/index"))
const ResetPassword = lazy(() => import("../screen/login/resetPassword"));
const ResourcesDocuments = lazy(
  () => import("../screen/resources/viewAll/documents")
);
const ResourcesSeminars = lazy(
  () => import("../screen/resources/viewAll/seminars")
);
const ResourcesExamAnnouncements = lazy(
  () => import("../screen/resources/viewAll/examAnnouncements")
);
const PracticeQuestion = lazy(() => import("../screen/practice/practiceQuestion"));

const Routers: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      // type: "light",
      primary: {
        main: "#2aaebc",
        light: "#f5f6fa",
      },
      secondary: {
        main: "#363353",
      },
      text: {
        primary: "#8a9099",
        secondary: "#100d2e",
      },
    },
    typography: {
      fontFamily: "Roboto,sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Router>
        <Switch>
          <PrivateRoute path={`${Utils.Pathname.TOPICS}`} component={Topics} />
          <PublicRoute
            path={`${Utils.Pathname.FORGOT_PASSWORD}`}
            component={ForgotPassword}
          />
          <PublicRoute
            path={`${Utils.Pathname.RESET_PASSWORD}`}
            component={ResetPassword}
          />
          <PrivateRoute
            path={`${Utils.Pathname.MY_PROGRESS}`}
            component={MyProgress}
          />
          <PrivateRoute
            path={`${Utils.Pathname.MY_TEMPLATE}`}
            component={MyTemplates}
          />
       <PrivateRoute
            path={`${Utils.Pathname.PRACTICE_QUESTION}`}
            component={PracticeQuestion}
          />
          <PrivateRoute
            path={`${Utils.Pathname.PRACTICE}`}
            component={Practices}
          />
   
          <PrivateRoute
            path={`${Utils.Pathname.RESOURCES_DOCUMENTS}`}
            component={ResourcesDocuments}
          />
          <PrivateRoute
            path={`${Utils.Pathname.RESOURCES_SEMINARS}`}
            component={ResourcesSeminars}
          />
          <PrivateRoute
            path={`${Utils.Pathname.RESOURCES_EXAMANNOUNCEMENTS}`}
            component={ResourcesExamAnnouncements}
          />
          <PrivateRoute
            path={`${Utils.Pathname.RESOURCE}`}
            component={Resources}
          />

          <PrivateRoute
            path={`${Utils.Pathname.STUDY_PLANNER}`}
            component={StudyPlanner}
          />
          <PrivateRoute
            path={`${Utils.Pathname.TIMETABLE}`}
            component={Timetable}
          />
             <PrivateRoute
            path={`${Utils.Pathname.NOTIFICATION}`}
            component={Notification}
          />
          <PrivateRoute
            path={`${Utils.Pathname.SETTINGS}`}
            component={Settings}
          />
          <PublicRoute path={`${Utils.Pathname.LOGIN}`} component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default Routers;
