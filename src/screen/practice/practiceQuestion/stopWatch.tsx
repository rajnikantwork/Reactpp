import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "10px 0",
      display: "flex",
      justifyContent: "center",
    },
    stopWatch: {
      textAlign: "center",
      width: "30%",
      border: "1px solid #ccc",
      fontWeight: theme.typography.fontWeightMedium,
      padding: 2,
    },
  })
);
interface Props {
  setIsTimeOver: Function;
  mark: number;
}
function StopWatch({ setIsTimeOver, mark }: Props) {
  const intervalRef = React.useRef<any>(null);
  const [timer, setTimer] = React.useState("00:00");
  const getTimeReaining = (endTime: any) => {
    const date: any = new Date();
    const total = Date.parse(endTime) - Date.parse(date);
    const seconds = Math.floor((total / 1000) % 60);
    const minute = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      seconds,
      minute,
    };
  };
  function startTimer(deadline: any) {
    if(localStorage.getItem('selfAssesmentViewed') === 'true') {
      let { total, seconds, minute } = getTimeReaining(deadline);
      if (total >= 0) {
        // let getHour = hour > 9 ? hour : `0${hour}`;
        let getMin = minute > 9 ? minute : `0${minute}`;
        let getSecond = seconds > 9 ? seconds : `0${seconds}`;
        if (minute === 0 && seconds === 0) {
          setIsTimeOver(true);
        }
        setTimer(`${getMin}:${getSecond}`);
      } else clearInterval(intervalRef.current);
    }
  }
  function clearTimer(endTime: any) {
    if (mark === 1) {
      setTimer("02:00");
    } else if (mark === 2) {
      setTimer("03:30");
    } else if (mark === 3) {
      setTimer("05:30");
    } else if (mark === 4) {
      setTimer("07:00");
    } else if (mark === 5) {
      setTimer("09:00");
    } else if (mark === 6) {
      setTimer("11:00");
    } else if (mark === 7) {
      setTimer("12:30");
    } else if (mark === 8) {
      setTimer("14:30");
    } else if (mark === 9) {
      setTimer("16:00");
    } else if (mark === 10) {
      setTimer("18:00");
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);
    intervalRef.current = id;
  }
  function getDeadlineTime() {
    let deadlineTime = new Date();
    if (mark === 1) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 2);
    } else if (mark === 2) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 3);
      deadlineTime.setSeconds(deadlineTime.getSeconds() + 30);
    } else if (mark === 3) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 5);
      deadlineTime.setSeconds(deadlineTime.getSeconds() + 30);
    } else if (mark === 4) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 7);
    } else if (mark === 5) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 9);
    } else if (mark === 6) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 11);
    } else if (mark === 7) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 12);
      deadlineTime.setSeconds(deadlineTime.getSeconds() + 30);
    } else if (mark === 8) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 14);
      deadlineTime.setSeconds(deadlineTime.getSeconds() + 30);
    } else if (mark === 9) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 16);
    } else if (mark === 10) {
      deadlineTime.setMinutes(deadlineTime.getMinutes() + 18);
    }
    return deadlineTime;
  }
  React.useEffect(() => {
    clearTimer(getDeadlineTime());
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography variant="body1" className={classes.stopWatch}>
        {timer}
      </Typography>
    </div>
  );
}

export default StopWatch;
