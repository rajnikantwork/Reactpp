import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Figure from "./figure";
import LocalImages from "../../Utils/images";
import Subject from "./subject";
import ExamResult from "./examResult";
import TransitionsModal from "../../components/popupModal/index";
import WelcomeMessage from "./welcomeMessage";
import { updateWelcomePopup, dahsboardData, uploadExamResults } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LineChart from "./scoreGraph";
import TaskGraph from "./taskGraph";
import { ReducersModal } from "../../modal/index";
import ActionButton from "../../components/button/index";
import FilterDropdown from "../../components/dropdown/filterDropdown";
import { getWeeks } from "../../screen/studyPlanner/action";
import MyProgressSkl from "./myProgressSkl";
import Utils from "../../Utils";
import Backdrop from "../../components/backdrop";
import ImageContainer from "../../components/imageContainer/index";
import Tooltip from "@material-ui/core/Tooltip";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleAndHrsLoggedContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      color: "#030c29",
      fontWeight: 400,
      "& span": {
        fontWeight: 700,
        textTransform: "capitalize",
      },
    },
    hrsLogged: {
      display: "flex",
      alignItems: "center",
      marginBottom: -17,
      color: "#243847",
      "& p": {
        width: 100,
        textAlign: "right",
        lineHeight: 1.2,
        marginRight: 10,
      },
      "& h5": {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    selectWeek: {
      marginTop: 45,
      "& div": {
        width: 150,
      },
    },
    progressFigures: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxSizing: "border-box",
      margin: "30px -5px",
      flexWrap: "wrap",
    },
    subjectAndExamResults: {
      display: "flex",
      boxSizing: "border-box",
      justifyContent: "space-between",
      margin: "30px 0",
      flexWrap: "wrap",
      width: "100%",
      alignItems: "baseline",
    },
    subject: {
      width: "55%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      padding: "15px 30px",
      backgroundColor: "#fff",
      margin: "10px 0px",
      borderRadius: 10,
      "& h5": {
        fontSize: "18px",
        color: "#243847",
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    view: {
      "& button": {
        height: 33,
      },
    },
    subjects: {
      marginTop: 20,
    },
    examResults: {
      width: "30%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    examResultsInfo: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 30,
    },
    visualGraphs: {
      display: "flex",
      justifyContent: "space-between",
      "& h5": {
        fontSize: "18px",
        color: "#243847",
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    scoreGraph: {
      padding: "15px 30px",
      width: "55%",
      backgroundColor: "#fff",
      borderRadius: 8,
    },
    legend: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "20px 0",
    },
    leg: {
      padding: "10px",
      width: "15%",
      borderRadius: 5,
      backgroundColor: "#ebeff2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        cursor: "pointer",
        border: `1.5px solid ${theme.palette.primary.main}`,
        margin: "-1.5px",
        backgroundColor: `${theme.palette.primary.main}33`,
        color: theme.palette.primary.main,
        "& p": {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      "& div": {
        marginRight: "5px",
        padding: "4px",
        borderRadius: "50%",
      },
    },
    activeLegend: {
      cursor: "pointer",
      border: `1.5px solid ${theme.palette.primary.main}`,
      margin: "-1.5px",
      backgroundColor: `${theme.palette.primary.main}33`,
      color: theme.palette.primary.main,
      "& p": {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    dotOne: {
      backgroundColor: "#2aaebc",
    },
    dotTwo: {
      backgroundColor: "#f2ce7e",
    },
    dotThree: {
      backgroundColor: "#c19ee3",
    },
    dotFour: {
      backgroundColor: "#fd8b84",
    },
    taskGraph: {
      padding: "15px 30px",
      width: "30%",
      backgroundColor: "#fff",
      borderRadius: 8,
      "& .highcharts-credits": {
        display: "none",
      },
    },
    innerGraph: {
      width: "100%",
    },
    taskG: {
      marginRight: 10,
      minWidth: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      verticalAlign: "middle",
      marginBottom: 15,
    },
    taskGraphLegend: {
      display: "flex",
      "& >div": {
        width: "25%",
      },
      "& p": {
        [theme.breakpoints.between(1100, 1360)]: {
          fontSize: "10px  !important",
        },
        [theme.breakpoints.between(1370, 1500)]: {
          fontSize: "12px !important",
        },
        fontSize: "15px !important",
      },
    },
    actionButton: {
      width: "100%",
      margin: "0 auto",
    },
    avginfo: {
      "& figure": {
        width: "15px",
        height: "15px",
        margin: "0",
      },
    },
    taskLeg: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& p": {
        // fontWeight: theme.typography.fontWeightMedium,
        fontSize: 16,
      },
      "& div": {
        padding: 4,
        borderRadius: "50%",
        marginRight: 5,
      },
    },
  })
);
function MyProgress({ history }: any) {
  const classes = styles();
  const [detail, userDetails] = React.useState<any>({
    name: "",
    email: "",
  });
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { dashboardData } = useSelector(
    (state: ReducersModal) => state.dashboardDataReducer
  );
  const { weekData } = useSelector(
    (state: ReducersModal) => state.addTodoWeekReducer
  );
  const { allWeeks } = useSelector(
    (state: ReducersModal) => state.customRangeFilterReducer
  );
  const [scoreChartLegend, setScoreChartLegend] = React.useState({
    overview: true,
    average: false,
    rule: false,
    application: false,
    structure: false,
  });
  const {
    percentageOne,
    fileOne,
    percentageTwo,
    fileTwo,
    percentageThree,
    fileThree,
    percentageFour,
    fileFour,
  } = useSelector((state: ReducersModal) => state.practiceExamResultsReducer);
  React.useEffect(() => {
    dispatch(getWeeks());
    dispatch(dahsboardData());
    userDetails({
      name: localStorage.getItem("userName")
        ? localStorage.getItem("userName")
        : sessionStorage.getItem("userName"),
      email: localStorage.getItem("userEmail")
        ? localStorage.getItem("userEmail")
        : sessionStorage.getItem("userEmail"),
    });
    if (
      localStorage.getItem("iswelcome-popup") ||
      sessionStorage.getItem("iswelcome-popup")
    ) {
    } else {
      setOpen(true);
      dispatch(updateWelcomePopup());
    }
  }, [dispatch]);
  const getFilterData = (type: string, value: string, file: string) => {
    dispatch(dahsboardData());
  };
  const updatePercent = (examNo: string, value: string, type: string) => {
    if (examNo === "1") {
      if (type === "input") {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            percentageOne: value,
          },
        });
      } else {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            fileOne: value,
          },
        });
      }
    } else if (examNo === "2") {
      if (type === "input") {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            percentageTwo: value,
          },
        });
      } else {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            fileTwo: value,
          },
        });
      }
    } else if (examNo === "3") {
      if (type === "input") {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            percentageThree: value,
          },
        });
      } else {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            fileThree: value,
          },
        });
      }
    } else if (examNo === "4") {
      if (type === "input") {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            percentageFour: value,
          },
        });
      } else {
        dispatch({
          type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
          payload: {
            fileFour: value,
          },
        });
      }
    }
  };
  const applyScoreChartlegend = (type: string) => {
    if (type === "overview") {
      setScoreChartLegend({
        overview: true,
        average: false,
        rule: false,
        application: false,
        structure: false,
      });
    } else if (type === "average") {
      setScoreChartLegend({
        overview: false,
        average: true,
        rule: false,
        application: false,
        structure: false,
      });
    } else if (type === "rule") {
      setScoreChartLegend({
        overview: false,
        average: false,
        rule: true,
        application: false,
        structure: false,
      });
    } else if (type === "application") {
      setScoreChartLegend({
        overview: false,
        average: false,
        rule: false,
        application: true,
        structure: false,
      });
    } else if (type === "structure") {
      setScoreChartLegend({
        overview: false,
        average: false,
        rule: false,
        application: false,
        structure: true,
      });
    }
  };
  const uploadResults = () => {
    let error = false;
    let format1 = /[a-zA-Z]/i;
    let format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (format1.test(percentageOne) || format.test(percentageOne)) {
      error = true;
      Utils.showAlert(2, "Exam 1 input value should be only numeric");
    } else if (format1.test(percentageTwo) || format.test(percentageTwo)) {
      error = true;
      Utils.showAlert(2, "Exam 2 input value should be only numeric");
    } else if (format1.test(percentageThree) || format.test(percentageThree)) {
      error = true;
      Utils.showAlert(2, "Exam 3 input value should be only numeric");
    } else if (format1.test(percentageFour) || format.test(percentageFour)) {
      error = true;
      Utils.showAlert(2, "Exam 4 input value should be only numeric");
    } else if (
      percentageOne === "" &&
      percentageTwo === "" &&
      percentageThree === "" &&
      percentageFour === "" &&
      fileOne === "" &&
      fileTwo === "" &&
      fileThree === "" &&
      fileFour === ""
    ) {
      Utils.showAlert(
        2,
        "You need to either enter marks or attack a file for uploading"
      );
      error = true;
    } else {
      error = false;
    }
    if (!error) {
      dispatch(uploadExamResults());
    }
  };
  const title = () => {
    return (
      <div className={classes.title}>
        <Typography variant="h5">
          Welcome Back, <span>{detail.name.split(" ")[0]}</span>!
        </Typography>
        {/* <Typography variant="body2">
          You have made a great improvement this week,{" "}
          <span>keep up the good work!</span>
        </Typography> */}
      </div>
    );
  };
  const hrsLogged = () => {
    return (
      <div className={classes.hrsLogged}>
        <Typography variant="body2">Hours completed this week</Typography>
        <Typography variant="h5">
          {dashboardData.data && dashboardData.data.hoursSpend} hrs
        </Typography>
      </div>
    );
  };
  const figure = (
    value: string | number,
    fieldName: string,
    imgSrc: string
  ) => {
    return <Figure value={value} fieldName={fieldName} img={imgSrc} />;
  };
  const progressFigures = () => {
    const {
      retries,
      improvement,
      timerQuestions,
      userTemplates,
      selfAssesment,
      totalQuestions,
      totalSolvedQuestions,
    } = dashboardData.data;
    return (
      <div className={classes.progressFigures}>
        {figure(
          `${totalSolvedQuestions}/${totalQuestions}`,
          "Questions done",
          LocalImages.QUESTION_DONE
        )}
        {figure(
          `${selfAssesment}`,
          "Self assessment",
          LocalImages.SELF_ASSESSMENT
        )}
        {figure(`${retries}`, "Retries", LocalImages.RETRIES)}
        {figure(
          `${improvement}%`,
          "Improvement on retry",
          LocalImages.IMPORVEMENT_ON_RETRY
        )}
        {figure(
          `${timerQuestions}`,
          "Timer questions",
          LocalImages.TIME_QUESTIONS
        )}
        {figure(
          `${userTemplates}`,
          "Templates created",
          LocalImages.TEMPLATE_CREATED
        )}
      </div>
    );
  };
  const scoreGraph = () => {
    const { scoreMarks } = dashboardData.data;
    let labels: Array<string> = [];
    let averageData: Array<number> = [];
    let applicationData: Array<number> = [];
    let ruleData: Array<number> = [];
    let structureData: Array<number> = [];
    scoreMarks.forEach((value: any) => {
      labels.push(`Week ${value.week}`);
      averageData.push(value.averageMark);
      applicationData.push(value.applicationMark);
      ruleData.push(value.ruleMark);
      structureData.push(value.structureMark);
    });
    return (
      <div className={classes.scoreGraph}>
        <div style={{ marginBottom: 10 }}>
          <Typography variant="h5">Score</Typography>
        </div>
        <div className={classes.legend}>
          <div
            className={
              scoreChartLegend.overview
                ? `${classes.leg} ${classes.activeLegend}`
                : classes.leg
            }
            onClick={() => applyScoreChartlegend("overview")}
          >
            <Typography variant="body2">Overview</Typography>
          </div>
          <div
            style={{ padding: 6 }}
            className={
              scoreChartLegend.average
                ? `${classes.leg} ${classes.activeLegend}`
                : classes.leg
            }
            onClick={() => applyScoreChartlegend("average")}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.dotOne} style={{ marginLeft: 10 }}></div>
              <Typography variant="body2">Average</Typography>{" "}
              <Tooltip title="Average" arrow>
                <span style={{ margin: 0 }}>
                  <ImageContainer
                    style={classes.avginfo}
                    imgUrl={LocalImages.AVG_INFO}
                  />
                </span>
              </Tooltip>
            </div>
          </div>
          <div
            className={
              scoreChartLegend.rule
                ? `${classes.leg} ${classes.activeLegend}`
                : classes.leg
            }
            onClick={() => applyScoreChartlegend("rule")}
          >
            <div className={classes.dotTwo}></div>
            <Typography variant="body2">Rule</Typography>
          </div>
          <div
            className={
              scoreChartLegend.application
                ? `${classes.leg} ${classes.activeLegend}`
                : classes.leg
            }
            onClick={() => applyScoreChartlegend("application")}
          >
            <div className={classes.dotThree}></div>
            <Typography variant="body2">Application</Typography>
          </div>
          <div
            className={
              scoreChartLegend.structure
                ? `${classes.leg} ${classes.activeLegend}`
                : classes.leg
            }
            onClick={() => applyScoreChartlegend("structure")}
          >
            <div className={classes.dotFour}></div>
            <Typography variant="body2">Structure</Typography>
          </div>
        </div>
        <div className={classes.innerGraph}>
          <LineChart
            labels={labels}
            averageData={averageData}
            applicationData={applicationData}
            ruleData={ruleData}
            structureData={structureData}
            scoreChartLegend={scoreChartLegend}
          />
        </div>
      </div>
    );
  };
  const taskGraphOne = () => {
    const {
      totalDoc,
      totalSeminars,
      totalEssay,
      totalMultiChoice,
      readDocuments,
      totalViewedSeminars,
      totalSolvedEssayQuestions,
      totalSolvedsMultiChoiceQuestion,
    } = dashboardData.data.tasks;
    let reading = Math.floor((readDocuments / totalDoc) * 100);
    let practice = Math.floor(
      ((totalSolvedEssayQuestions + totalSolvedsMultiChoiceQuestion) /
        (totalEssay + totalMultiChoice)) *
        100
    );
    let selfMarking = Math.floor(
      (totalSolvedEssayQuestions / totalEssay) * 100
    );
    let seminars = Math.floor((totalViewedSeminars / totalSeminars) * 100);
    return (
      <div className={classes.taskGraph}>
        <div style={{ marginBottom: 10 }}>
          <Typography variant="h5">Task</Typography>
        </div>
        <TaskGraph
          reading={reading}
          practice={practice}
          selfMarking={selfMarking}
          seminars={seminars}
        />
        <div className={classes.taskGraphLegend}>
          <div className={classes.taskLeg}>
            <div className={classes.dotThree}></div>
            <Typography variant="body2">Reading</Typography>
          </div>
          <div className={classes.taskLeg}>
            <div className={classes.dotOne}></div>
            <Typography variant="body2">Practice</Typography>
          </div>
          <div className={classes.taskLeg}>
            <div className={classes.dotFour}></div>
            <Typography variant="body2">Self Marking</Typography>
          </div>
          <div className={classes.taskLeg}>
            <div className={classes.dotTwo}></div>
            <Typography variant="body2">Seminars</Typography>
          </div>
        </div>
      </div>
    );
  };
  const subjects = () => {
    const { subjects } = dashboardData.data;
    return (
      <div className={classes.subject}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Subjects</Typography>
          <div className={classes.view}>
            <ActionButton
              name={"View"}
              onPress={() => {
                history.push(`${history.location.pathname}/topics`);
              }}
              type="button"
              custom={true}
            />
          </div>
        </div>

        <div className={classes.subjects}>
          {subjects.map((value: any) => {
            return (
              <Subject
                key={value._id}
                subjectName={value.subject}
                cat={value.category}
                retries={value.totalRetries}
                totalQuestions={value.totalAnsweredQuestions}
                history={history}
                percentage={
                  value.questions > 0
                    ? (value.totalAnsweredQuestions / value.questions) * 100
                    : 0
                }
              />
            );
          })}
        </div>
      </div>
    );
  };
  const examResults = () => {
    return (
      <div className={`${classes.subject} ${classes.examResults}`}>
        <Typography variant="h5">Practice Exam results</Typography>
        <div className={classes.examResultsInfo}>
          <ExamResult
            examNo={"1"}
            updatePercent={updatePercent}
            fileUrl={fileOne}
            percentage={percentageOne}
          />
          <ExamResult
            examNo={"2"}
            updatePercent={updatePercent}
            fileUrl={fileTwo}
            percentage={percentageTwo}
          />
          <ExamResult
            examNo={"3"}
            updatePercent={updatePercent}
            fileUrl={fileThree}
            percentage={percentageThree}
          />
          <ExamResult
            examNo={"4"}
            updatePercent={updatePercent}
            fileUrl={fileFour}
            percentage={percentageFour}
          />
        </div>
        <div className={classes.actionButton}>
          <ActionButton name="Upload Results" onPress={uploadResults} />
        </div>
      </div>
    );
  };
  const renderFilterDropdown = (
    initialValue: string,
    filterData: string,
    type: string,
    value: string,
    dropdownData: any,
    helperText: string,
    getData: Function,
    custom: boolean
  ) => {
    return (
      <FilterDropdown
        initialValue={initialValue}
        filterData={filterData}
        type={type}
        value={value}
        dropDownData={dropdownData}
        helperText={helperText}
        getData={getData}
        custom={custom}
      />
    );
  };
  return (
    <HelmetProvider>
      <div className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Progress</title>
        </Helmet>
        {weekData && dashboardData.data ? (
          <React.Fragment>
            <Backdrop />
            <div className={classes.titleAndHrsLoggedContainer}>
              {title()}
              {hrsLogged()}
            </div>
            <div className={classes.selectWeek}>
              {renderFilterDropdown(
                "All Weeks",
                "week",
                "allWeeks",
                allWeeks,
                weekData.data,
                "Week",
                getFilterData,
                true
              )}
            </div>
            {progressFigures()}
            <div className={classes.visualGraphs}>
              {scoreGraph()}
              {taskGraphOne()}
            </div>
            <div className={classes.subjectAndExamResults}>
              {subjects()}
              {examResults()}
            </div>
            <TransitionsModal
              open={open}
              setOpen={setOpen}
              children={<WelcomeMessage setOpen={setOpen} />}
            />
          </React.Fragment>
        ) : (
          <MyProgressSkl />
        )}
      </div>
    </HelmetProvider>
  );
}

export default MyProgress;
