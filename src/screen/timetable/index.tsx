import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ScreenTitle from "../../components/screenTitle/index";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { ReducersModal } from "../../modal";
import { timeManagementApi } from "./action";
import WeekData from "./weekData";
import TransitionsModal from "../../components/popupModal/index";
import EventModal from "./eventMoal";
import TimetableSkl from "./timetableSkl";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    title: {},
    timetable: {
      marginTop: 30,
      borderRadius: 15,
    },
    weekDates: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    weekNo: {
      maxWidth: "16%",
      minWidth: "16%",
      height: "48px",
      paddingLeft: "10px",
      borderRight: "2px solid #ccc",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    weekNoInfo: {
      marginLeft: "-1px",
      borderTop: "none",
      padding: "12px 0 12px 10px!important",
      borderBottom: "1px solid #ccc",
      borderLeft: "1px solid #ccc",
      textAlign: "left",
    },
    weekDay: {
      padding: "16px 0 12px 0",
      width: "12%",
      minHeight: 20,
      [theme.breakpoints.between(1500, 2960)]: {
        width: "13.2%",
      },
      textAlign: "center",
      borderBottom: "1px solid #ccc",
      "& p": {
        color: "#8a9099",
        fontSize: 13,
      },
    },
    weeks: {},
    weekRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& div": {
        "&:nth-child(2)": {
          "& >p": {
            marginTop: -4,
          },
          "& div": {
            marginTop: "-2px",
            "& p": {
              marginTop: 0,
            },
          },
        },
      },
    },
    event: {
      borderRight: "1px solid #ccc",
      borderBottom: "1px solid #ccc",
      borderTop: "none",
      margin: "0",
      padding: "15px 0",
      height: "42px",
      color: "#3f434a !important",
      textAlign: "left",
      "& p": {
        paddingLeft: 0,
      },
      "& >p": {
        paddingLeft: "15px",
      },
    },
    blueEvent: {
      "&:hover": {
        border: "2px solid rgb(136, 217, 238)",
        margin: "-1.5px",
        cursor: "pointer",
      },
    },
    blue: {
      background: "rgba(136, 217, 238, 0.15)",
    },
    blueColor: {
      background: "rgb(136, 217, 238, 0.5)",
      borderLeft: "4px solid rgb(136, 217, 238)",
    },
    yellowEvent: {
      "&:hover": {
        border: "2px solid rgb(255, 226, 178)",
        margin: "-1.5px",
        cursor: "pointer",
      },
    },
    yellow: {
      background: "rgba(255, 226, 178, 0.26)",
    },
    yellowColor: {
      background: "rgb(255, 226, 178, 0.5)",
      borderLeft: "4px solid rgb(255, 226, 178)",
    },
    greenEvent: {
      "&:hover": {
        border: "2px solid rgb(111, 225, 206)",
        margin: "-1.5px",
        cursor: "pointer",
      },
    },
    green: {
      background: "rgba(111, 225, 206, 0.12)",
    },
    greenColor: {
      background: "rgb(111, 225, 206, 0.5)",
      borderLeft: "4px solid rgb(111, 225, 206)",
    },
    redEvent: {
      "&:hover": {
        border: "2px solid rgb(255, 123, 123)",
        margin: "-1.5px",
        cursor: "pointer",
      },
    },
    red: {
      background: "rgba(255, 123, 123, 0.17)",
    },
    redColor: {
      background: "rgb(255, 123, 123, 0.5)",
      borderLeft: "4px solid rgb(255, 123, 123)",
    },
    eventInfo: {
      padding: "10px",
      width: "70%",
      borderRadius: "4px",
      margin: "12px auto 0 auto",
      "& p": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: "#3f434a",
        fontSize: 12,
      },
    },
  })
);
function Timetable() {
  const classes = styles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { timeManagementData } = useSelector(
    (state: ReducersModal) => state.timemanagementReducer
  );
  const [allEvents, setAllevents] = React.useState([]);
  const [week, setWeek] = React.useState(0);
  React.useEffect(() => {
    dispatch(timeManagementApi());
  }, [dispatch]);
  const renderWeekDay = (day: string) => {
    return (
      <div className={classes.weekDay}>
        <Typography variant="body2">{day}</Typography>
      </div>
    );
  };
  const renderWeekDates = () => {
    return (
      <div className={classes.weekDates}>
        <div className={classes.weekNo}></div>
        {renderWeekDay("SUN")}
        {renderWeekDay("MON")}
        {renderWeekDay("TUE")}
        {renderWeekDay("WED")}
        {renderWeekDay("THU")}
        {renderWeekDay("FRI")}
        {renderWeekDay("SAT")}
      </div>
    );
  };
  const styleProps = {
    weekRow: classes.weekRow,
    weekNo: classes.weekNo,
    weekNoInfo: classes.weekNoInfo,
    weekDay: classes.weekDay,
    event: classes.event,
    eventInfo: classes.eventInfo,
    blueEvent: classes.blueEvent,
    blue: classes.blue,
    blueColor: classes.blueColor,
    yellowEvent: classes.yellowEvent,
    yellow: classes.yellow,
    yellowColor: classes.yellowColor,
    greenEvent: classes.greenEvent,
    green: classes.green,
    greenColor: classes.greenColor,
    redEvent: classes.redEvent,
    red: classes.red,
    redColor: classes.redColor,
  };
  const displayAllEvents = (events: any, week: number) => {
    setAllevents(events);
    setWeek(week);
    setOpen(true);
  };
  return (
    <HelmetProvider>
      <div className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Timetable</title>
        </Helmet>
        {timeManagementData.data ? (
          <React.Fragment>
            <div className={classes.title}>
              <ScreenTitle title="Time Management" />
            </div>
            <div className={classes.timetable}>
              {renderWeekDates()}
              <div className={classes.weeks}>
                {timeManagementData.data &&
                  timeManagementData.data.map((value: any) => {
                    return (
                      <WeekData
                        key={value._id}
                        styleProps={styleProps}
                        week={value.week}
                        weekTopic={value.weekTopic}
                        dateRecord={value.dateRecord}
                        displayAllEvents={displayAllEvents}
                      />
                    );
                  })}
              </div>
            </div>
            <TransitionsModal
              open={open}
              setOpen={setOpen}
              children={
                <EventModal
                  setOpen={setOpen}
                  allEvents={allEvents}
                  week={week}
                />
              }
            />
          </React.Fragment>
        ) : (
          <TimetableSkl />
        )}
      </div>
    </HelmetProvider>
  );
}

export default Timetable;
