import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ScreenTitle from "../../components/screenTitle/index";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CustomizedSelects from "../../components/dropdown/selectDropdown";
import ProgressBar from "./progressBar";
import ActionButton from "../../components/button/index";
import Task from "./tasks";
import TransitionsModal from "../../components/popupModal/index";
import AddTasks from "./addTasks";
import { useDispatch, useSelector } from "react-redux";
import { allTasks, getOverdue, checkList, getWeeks } from "./action";
import { ReducersModal } from "../../modal/index";
import StudyPlannerSkl from "./studyPlannerSkl";
import NoDataFound from "../../components/noDataFound/index";
import PaginationControlled from "../../components/pagination/index";
import Utils from "../../Utils";
import SuccessMessage from "../../components/successMessage/index";
import { ConstFunction } from "../../Utils/constFunctions";
import { endTask } from "./action";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleAndBrefing: {
      "& p": {
        fontSize: 17,
      },
    },
    innerContainer: {
      marginTop: 30,
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
    },
    weekProgressAndTime: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    currentWeek: {
      width: "18%",
    },
    totalProgress: {
      "& p": {
        marginBottom: 10,
      },
      width: "63%",
    },
    totalTimeRecorded: {
      width: "13%",
      "& p": {
        textAlign: "right",
        marginBottom: 4,
      },
    },
    totalTime: {
      padding: "5px",
      backgroundColor: "#ebeff2",
      display: "flex",
      justifyContent: "center",
      "& p": {
        fontSize: 18,
      },
    },
    addTaskBtn: {
      marginTop: 20,
      display: "flex",
      justifyContent: "flex-end",
      "& div": {
        width: "13%",
      },
    },
    overDueContainer: {
      marginTop: 30,
    },
    todos: {
      marginTop: 20,
    },
    title: {
      "& h6": {
        marginLeft: 5,
        fontSize: 19,
        color: "#3f434a",
        fontWeight: theme.typography.fontWeightMedium,
        "& span": {
          color: "#8a9099",
          fontSize: 17,
        },
      },
    },
  })
);
const taskRender = (
  classes: any,
  task: any,
  expanded: boolean,
  handleChange: Function,
  type: string,
  noData: string
) => {
  return (
    <div className={classes.todos}>
      {task.data && task.data.length !== 0 ? (
        task.data.map((value: any) => (
          <Task
            key={value._id}
            title={value.title}
            expanded={expanded}
            handleChange={handleChange}
            id={value._id}
            timerStartDate={value.timerStartDate}
            timerEndDate={value.timerEndDate}
            description={value.description}
            subject={value.subject}
            category={value.category}
            weekDetails={value.weekDetails}
            taskStatus={value.taskStatus}
            type={type}
          />
        ))
      ) : (
        <NoDataFound title={noData} />
      )}
    </div>
  );
};

function StudyPlanner() {
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const { allTask, totalCount, page } = useSelector(
    (state: ReducersModal) => state.allTaskReducer
  );
  const { overdue, totalCount1, page1 } = useSelector(
    (state: ReducersModal) => state.overdueReducer
  );
  const { checklistData } = useSelector(
    (state: ReducersModal) => state.userChecklistReducer
  );
  const { weekData } = useSelector(
    (state: ReducersModal) => state.addTodoWeekReducer
  );
  const [expanded, setExpanded] = React.useState(false);
  const [week, setWeek] = React.useState("");
  React.useEffect(() => {
    dispatch(checkList());
    // dispatch(allTasks());
    dispatch(getWeeks());
    dispatch(getOverdue());
    let week: any = sessionStorage.getItem("week");
    if (week !== "Select Week") {
      dispatch(allTasks(week.split(" ")[1]));
    } else {
      dispatch(allTasks());
    }
  }, [dispatch]);
  const getWeekData = (weekData: any) => {
    dispatch(checkList(weekData.week));
    dispatch(allTasks(weekData.week));
    setWeek(weekData.week);
  };
  const handleChange = (
    panel: any,
    event: any,
    isExpanded: any,
    hour: any,
    minute: any,
    second: any,
    id: any,
    type: any
  ) => {
    if (!isExpanded) {
      const timeStamp = ConstFunction.getTimeStamp(hour, minute, second);
      dispatch(endTask(id, timeStamp, type, "completed"));
    }
    setExpanded(isExpanded ? panel : false);
  };
  const updatePageAllTask = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch({
      type: Utils.ActionName.ALL_TASK,
      payload: {
        page: value,
      },
    });
    dispatch(allTasks(week));
  };
  const updatePageOverDue = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch({
      type: Utils.ActionName.OVERDUE,
      payload: {
        page1: value,
      },
    });
    dispatch(getOverdue());
  };

  return (
    <HelmetProvider>
      <div className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Study Planner</title>
        </Helmet>
        {allTask.data && checklistData ? (
          <React.Fragment>
            <div className={classes.titleAndBrefing}>
              <ScreenTitle title={"Study Planner"} />
              <Typography variant="body2" style={{ color: "#030C29" }}>
                Keep track of your upcoming tasks here
              </Typography>
            </div>
            <div className={classes.innerContainer}>
              <div className={classes.weekProgressAndTime}>
                <div className={classes.currentWeek}>
                  {checklistData ? (
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
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>
                <div className={classes.totalProgress}>
                  <Typography variant="body2" style={{ color: "#595F69" }}>
                    CHECKLIST (
                    {checklistData.checkList ? checklistData.checkList : 0}%)
                  </Typography>
                  <ProgressBar val={Number(checklistData.checkList)} />
                </div>
                <div className={classes.totalTimeRecorded}>
                  <Typography variant="body2">Total time recorded</Typography>
                  <div className={classes.totalTime}>
                    <Typography variant="body2">
                      {checklistData && checklistData.hour < 10
                        ? `0${checklistData.hour}`
                        : checklistData.hour}
                      :
                      {checklistData && checklistData.min < 10
                        ? `0${checklistData.min}`
                        : checklistData.min}
                      :
                      {checklistData && checklistData.second < 10
                        ? `0${checklistData.second}`
                        : checklistData.second}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={classes.addTaskBtn}>
                <div>
                  <ActionButton
                    name="Add Task"
                    type={"button"}
                    onPress={openModal}
                    custom={true}
                  />
                </div>
              </div>

              {taskRender(
                classes,
                allTask,
                expanded,
                handleChange,
                "alltask",
                "No task yet! Add a task to get started"
              )}
              <PaginationControlled
                limit={Math.ceil(totalCount / 20)}
                page={page}
                updatePage={updatePageAllTask}
              />
              <div className={classes.overDueContainer}>
                <div className={classes.title}>
                  <Typography variant="h6">
                    Overdue{" "}
                    <span>
                      (
                      {overdue.data && overdue.data.length !== 0
                        ? overdue.data.length
                        : 0}
                      )
                    </span>
                  </Typography>
                </div>
                {taskRender(
                  classes,
                  overdue,
                  expanded,
                  handleChange,
                  "overdue",
                  "Nice one! No overdue tasks"
                )}
                <PaginationControlled
                  limit={Math.ceil(totalCount1 / 20)}
                  page={page1}
                  updatePage={updatePageOverDue}
                />
              </div>
            </div>
            <TransitionsModal
              open={open1}
              setOpen={setOpen1}
              children={
                <SuccessMessage
                  setOpen={setOpen1}
                  message1="Task Created"
                  message2=""
                />
              }
            />
            <TransitionsModal
              open={open}
              setOpen={setOpen}
              children={<AddTasks setOpen={setOpen} setOpen1={setOpen1} />}
            />
          </React.Fragment>
        ) : (
          <StudyPlannerSkl />
        )}
      </div>
    </HelmetProvider>
  );
}

export default StudyPlanner;
