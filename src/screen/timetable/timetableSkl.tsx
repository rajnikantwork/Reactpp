import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleSkl: {
      paddingTop: 10,
      marginBottom:40,
      "& .MuiSkeleton-text": {
        height: 50,
        width: "30%",
      },
    },
    timetable: {
      "& .MuiSkeleton-wave": {
        height: 400,
        width: "100%",
      },
    },
  })
);
function TimetableSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.titleSkl}>
        <Skeleton variant="text" animation="wave" />
      </div>
      <div className={classes.timetable}>
        <Skeleton variant="rect" animation="wave" />
      </div>
    </div>
  );
}

export default TimetableSkl;
