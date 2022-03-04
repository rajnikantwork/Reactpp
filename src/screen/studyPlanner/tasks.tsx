import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CheckedFilledIcon from "../../components/customMuiIcons/checkedIcon";
import LocalImages from "../../Utils/images";
import ImageContainer from "../../components/imageContainer/index";
import { useDispatch } from "react-redux";
import TodoDetailBox from "./todoDetailBox";
import { startTask, endTask } from "./action";
import Counter from "../../components/counter/index";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../modal";
import Utils from "../../Utils";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
        border: "1px solid #ccc",
      },
      "& .MuiAccordionSummary-root.Mui-expanded": {
        borderBottom: "1px solid #ccc",
      },
      "& .MuiAccordionSummary-content.Mui-expanded": {
        margin: 0,
      },
      "& .MuiTypography-body1": {
        color: "#3F434A",
      },
    },
    root1:{
      "& .MuiTypography-body1": {
        color: "#3F434A",
        textDecoration: "line-through",
      },
    },
    time: {
      position: "absolute",
      top: 15,
      right: 46,
      border: "1px solid #ccc",
      borderRadius: "3px",
      padding: "5px",
      display: "flex",
    },
    timeValue: {
      "& p": {
        color: "#000",
      },
      marginRight: 5,
    },
    pauseAndPlayIcon: {},
    icon: {
      "& figure": {
        width: 22,
        height: 22,
        margin:'0 0 0 5px'
      },
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    detailsLink: {
      "& p": {
        "& span": {
          color: theme.palette.primary.main,
          textDecoration: "underline",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
    otherDetails: {
      marginTop: 10,
      display: "flex",
      alignItems: "center",
      width: "39%",
      justifyContent: "space-between",
    },
    uncheckedIcon: {
      fill: "#e8e9eb",
    },
  })
);
interface Props {
  title: string;
  expanded: string | boolean;
  handleChange: Function;
  id: string;
  timerStartDate: number;
  timerEndDate: number;
  description: string;
  subject: any;
  category: any;
  weekDetails: any;
  taskStatus: string;
  type: string;
}
export default function Task({
  title,
  handleChange,
  expanded,
  id,
  timerStartDate,
  timerEndDate,
  description,
  subject,
  category,
  weekDetails,
  taskStatus,
  type,
}: Props): JSX.Element {
  const classes = styles();
  const { week } = weekDetails;
  const { allTask } = useSelector(
    (state: ReducersModal) => state.allTaskReducer
  );
  const { overdue } = useSelector(
    (state: ReducersModal) => state.overdueReducer
  );
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(false);
  const [initialApiCall, setinitialApiCall] = React.useState(false);
  const startTimer = () => {
    if (taskStatus !== "completed") {
      setActive(true);
      dispatch(startTask(id));
      if (type === "alltask") {
        let da = new Date();
        var updateTasks = allTask.data.map((task: any) => {
          if (task._id === id) {
            return { ...task, timerStartDate: da.getTime() };
          } else return task;
        });
      } else {
        let da = new Date();
        var updateTasks1 = overdue.data.map((task: any) => {
          if (task._id === id) {
            return { ...task, timerStartDate: da.getTime() };
          } else return task;
        });
      }
      if (type === "alltask") {
        dispatch({
          type: Utils.ActionName.ALL_TASK,
          payload: { allTask: { data: updateTasks } },
        });
      } else {
        dispatch({
          type: Utils.ActionName.OVERDUE,
          payload: { overdue: { data: updateTasks1 } },
        });
      }
    }

    // Start Timer Api //
  };
  const stopTimer = () => {
    if (taskStatus !== "completed") {
      setActive(false);
    }
  };
  let daysDifference = 0;
  let hoursDifference = 0;
  let minutesDifference = 0;
  let secondsDifference = 0;
  if (timerEndDate !== 0) {
    let currentTimer = timerEndDate - timerStartDate;
    daysDifference = Math.floor(currentTimer / 1000 / 60 / 60 / 24);
    currentTimer -= daysDifference * 1000 * 60 * 60 * 24;

    hoursDifference = Math.floor(currentTimer / 1000 / 60 / 60);
    currentTimer -= hoursDifference * 1000 * 60 * 60;

    minutesDifference = Math.floor(currentTimer / 1000 / 60);
    currentTimer -= minutesDifference * 1000 * 60;

    secondsDifference = Math.floor(currentTimer / 1000);
  }
  React.useEffect(() => {
    if (expanded !== id && typeof expanded !== "boolean") {
      stopTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);
  const handleCheckbox = () => {
    if(taskStatus === "completed") {
      setinitialApiCall(true)
      dispatch(endTask(id, timerEndDate, type, 'restart'))
    }
  }
  React.useEffect(() => {
    const desc:any = document.querySelector(`#desc${id}ription`);
    desc.innerHTML = description
  },[id, description])
  return (
    <div className={taskStatus === 'completed' ? `${classes.root} ${classes.root1}`:  classes.root}>
      <React.Fragment>
        <Accordion
          expanded={expanded === id}
          onChange={(e, expanded) => {
            handleChange(id, e, expanded, hoursDifference, minutesDifference, secondsDifference, id, type);
            if (expanded) {
              startTimer();
              setinitialApiCall(true);
            } else {
              stopTimer();
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <Checkbox
                  checked={taskStatus === "completed"}
                  color="primary"
                  icon={<CircleUnchecked className={classes.uncheckedIcon} />}
                  checkedIcon={<CheckedFilledIcon />}
                  onChange={handleCheckbox}
                />
              }
              label={title}
            />
            {taskStatus !== "completed" ? (
              <div className={classes.time}>
                <Counter
                  initialSecond={secondsDifference}
                  initialMinute={minutesDifference}
                  initialHour={hoursDifference}
                  active={active}
                  initialApiCall={initialApiCall}
                  taskId={id}
                  type={type}
                />
                {active ? (
                  <div
                    className={classes.pauseAndPlayIcon}
                    onClick={() => stopTimer()}
                  >
                    <ImageContainer
                      imgUrl={LocalImages.PAUSE}
                      style={classes.icon}
                    />
                  </div>
                ) : (
                  <div
                    className={classes.pauseAndPlayIcon}
                    onClick={() => startTimer()}
                  >
                    <ImageContainer
                      imgUrl={LocalImages.PLAY}
                      style={classes.icon}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={classes.time} style = {{color:"#000"}}>
                {hoursDifference < 10 ? `0${hoursDifference}` : hoursDifference}
                :
                {minutesDifference < 10
                  ? `0${minutesDifference}`
                  : minutesDifference}
                :
                {secondsDifference < 10
                  ? `0${secondsDifference}`
                  : secondsDifference}
              </div>
            )}
          </AccordionSummary>

          <AccordionDetails className={classes.details}>
            <div className={classes.detailsLink}>
              <Typography variant="body2">
                <div id = {`desc${id}ription`}>
                </div>
              </Typography>
            </div>

            <div className={classes.otherDetails}>
              {week ? (
                <TodoDetailBox title={`Due: Week ${week}`} />
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {category ? (
                <TodoDetailBox title={category} />
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {subject ? (
                <TodoDetailBox title={subject} />
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </div>
  );
}
