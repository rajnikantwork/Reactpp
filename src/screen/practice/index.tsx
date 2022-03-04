import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScreenTitle from "../../components/screenTitle/index";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { ReducersModal } from "../../modal/index";
import { useSelector, useDispatch } from "react-redux";
import Utils from "../../Utils";
import Subject from "./subject";
import Typography from "@material-ui/core/Typography";
import ActionButton from "../../components/button/index";
import { questionList, seriesDropdownData } from "./action";
import { useHistory } from "react-router";
import TimeLimit from "./timeLimit";
import CustomizedSelects from "../../components/dropdown/selectDropdown";
import {
  checkList,
  getWeeks,
  getSubjects,
  getCategories,
} from "../studyPlanner/action";
import PracticeQuestionSkl from "./practiceSkl";
import NoDataFound from "../../components/noDataFound/index";
import Filter from "./filter";
import PaginationControlled from "../../components/pagination/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    title: {},
    titleAndTimeLimit: {
      display: "flex",
      justifyContent: "space-between",
    },
    timeLimit: {
      display: "flex",
      alignItems: "center",
    },
    weekFilter: {
      margin: "10px 0 30px 0",
    },
    customRangeFilter: {
      width: "100%",
      display: "flex",
      marginBottom: 30,
      "& div": {
        width: "90%",
      },
    },
    subjectContainer: {
      padding: 15,
      backgroundColor: "#fff",
      borderRadius: 10,
    },
    subjectTitle: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      "& div": {
        display: "flex",
        justifyContent: "center",
        "&:nth-child(1)": {
          width: "64%",
        },
        "&:nth-child(2)": {
          width: "12%",
        },
        "&:nth-child(3)": {
          width: "15%",
        },
      },
    },
  })
);
const renderTitle = (
  classes: any,
  enable: boolean,
  toggleTimeLimit: Function
) => {
  return (
    <div className={classes.titleAndTimeLimit}>
      <div className={classes.title}>
        <ScreenTitle title="Practice Questions" />
      </div>
      <div className={classes.timeLimit}>
        <TimeLimit />
      </div>
    </div>
  );
};
const renderQuestions = (openQuestionDetailsPage: Function, practice: any) => {
  return (
    <React.Fragment>
      {practice.data && practice.data.length !== 0 ? (
        practice.data.map((value: any, index: number) => (
          <Subject
            key={value._id}
            onItemClick={() =>
              openQuestionDetailsPage(
                `${Utils.Pathname.PRACTICE_QUESTION.replace(
                  ":questionId",
                  value._id
                )}`
              )
            }
            avgScore={value.avgScore}
            subject={value.subject}
            week={value.weekDetails.week}
            question={value.question}
            lastAttempt={value.lastAttempt}
            qNo={index + 1}
            isFlag={value.isFlag}
            questionStatus={value.questionStatus}
          />
        ))
      ) : (
        <NoDataFound title={"No Questions Found"} />
      )}
    </React.Fragment>
  );
};
const renderSubjectTitle = (classes: any, practice: any) => {
  return (
    <React.Fragment>
      {practice.data && practice.data.length !== 0 ? (
        <div className={classes.subjectTitle}>
          <div></div>
          <div>
            <Typography variant="body2">Avg score</Typography>
          </div>
          <div>
            <Typography variant="body2">Last attempt</Typography>
          </div>
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};
function Practice() {
  const classes = styles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enable } = useSelector(
    (state: ReducersModal) => state.practiceQuestionTimeLimitReducer
  );
  const { allSubjects, allTopics, allCategory, allSeries, answered } =
    useSelector((state: ReducersModal) => state.customRangeFilterReducer);
  const { checklistData } = useSelector(
    (state: ReducersModal) => state.userChecklistReducer
  );
  const { weekData } = useSelector(
    (state: ReducersModal) => state.addTodoWeekReducer
  );
  const { subjectData } = useSelector(
    (state: ReducersModal) => state.addTodoSubjectReducer
  );
  const { totalCount } = useSelector(
    (state: ReducersModal) => state.totalDataCountReducer
  );
  
  const { allSeriesData } = useSelector(
    (state: ReducersModal) => state.allSeriesDropdownReducer
  );
  const { practice } = useSelector(
    (state: ReducersModal) => state.practiceDataReducer
  );
  const { categoryData } = useSelector(
    (state: ReducersModal) => state.addTodoCategoryReducer
  );
  const [week, setWeek] = React.useState(0);
  const [displayCustom, setDisplayCustom] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const updatePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(questionList(week, value));
  };
  React.useEffect(() => {
    dispatch(checkList());
    dispatch(getWeeks());
    dispatch(getSubjects());
    let week:any = sessionStorage.getItem('week')
    if(week !== "Select Week" && week !== null) {
      debugger
      dispatch(questionList(Number(week.split(' ')[1])));
    } else {
      dispatch(questionList());
    }
  }, [dispatch]);

  const toggleTimeLimit = () => {
    dispatch({
      type: Utils.ActionName.TIME_LIMIT,
      payload: { enable: !enable },
    });
  };
  const getWeekData = (weekData: any) => {
    if (weekData === "0") {
      setDisplayCustom(true);
    } else {
      dispatch(checkList(weekData.week));
      setWeek(weekData.week);
      dispatch(questionList(weekData.week));
      setDisplayCustom(false);
    }
  };
  const getFilterData = (type: string, val: string) => {
    if (val !== "All Subjects") {
      if (type === "allSubjects") {
        const getSubject = subjectData.find(
          (value: any) => value.subject === val
        );
        dispatch(getCategories(getSubject._id));
        dispatch(seriesDropdownData(getSubject._id));
      } else if (type === "allTopics") {
        const getSubject = subjectData.find(
          (value: any) => value.subject === allSubjects
        );
        const getCategory = categoryData.find(
          (value: any) => value.category === val
        );
        dispatch(seriesDropdownData(getSubject._id, getCategory._id));
      }
    } else {
      dispatch({
        type: Utils.ActionName.GET_CATEGORY,
        payload: { categoryData: [] },
      });
      dispatch({
        type: Utils.ActionName.ALL_SERIES_DROPDOWN,
        payload: { allSeriesData: [] },
      });
      dispatch({
        type: Utils.ActionName.CUSTOM_RANGE,
        payload: {
          allSubjects: "All Subjects",
          allTopics: "All Topics",
          allCategory: allCategory,
          allSeries: "All Series",
          answered: answered,
        },
      });
    }
  };

  const openQuestionDetailsPage = (url: string) => {
    history.push(url);
  };
  const applyFilter = () => {
    dispatch(questionList(week));
  };
  return (
    <HelmetProvider>
      <div className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Practice</title>
        </Helmet>
        {practice.data ? (
          <React.Fragment>
            {renderTitle(classes, enable, toggleTimeLimit)}
            <div className={classes.weekFilter}>
              <CustomizedSelects
                dropDownData={weekData}
                helperText={"Week"}
                enabledTo={
                  checklistData.week && checklistData.week.length
                    ? checklistData.week[0].weekDates.week
                    : 0
                }
                getData={getWeekData}
              />
            </div>
            {displayCustom ? (
              <div className={classes.customRangeFilter}>
                <Filter
                  allSubjects={allSubjects}
                  allTopics={allTopics}
                  allCategory={allCategory}
                  allSeries={allSeries}
                  answered={answered}
                  subjectData={subjectData}
                  categoryData={categoryData}
                  allSeriesData={allSeriesData}
                  getFilterData={getFilterData}
                />
                <div>
                  <ActionButton
                    name={"Filter Now"}
                    onPress={applyFilter}
                    custom={true}
                  />
                </div>
              </div>
            ) : (
              <React.Fragment></React.Fragment>
            )}

            <div className={classes.subjectContainer}>
              {renderSubjectTitle(classes, practice)}
              {renderQuestions(openQuestionDetailsPage, practice)}
            </div>
            <PaginationControlled
              limit={Math.ceil(totalCount / 20)}
              page={page}
              updatePage={updatePage}
            />
          </React.Fragment>
        ) : (
          <PracticeQuestionSkl />
        )}
      </div>
    </HelmetProvider>
  );
}

export default Practice;
