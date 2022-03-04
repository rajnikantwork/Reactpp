import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleSkl: {
      paddingTop: 10,
      "& .MuiSkeleton-text": {
        height: 35,
        width: "30%",
        marginBottom: 30,
      },
    },
    titleAndTime: {
      display: "flex",
      justifyContent: "space-between",
    },
    time: {
      "& .MuiSkeleton-text": {
        height: 40,
        width: 150,
      },
    },
    weekProgressAndTime: {
      marginTop: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    week: {
      "& .MuiSkeleton-wave": {
        height: 40,
        width: 160,
      },
    },
    content: {
      marginTop: 30,
      "& .MuiSkeleton-wave": {
        height: 50,
        width: "100%",
        marginBottom: 10,
      },
    },
  })
);
function PracticeQuestionSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.titleSkl}>
        <div className={classes.titleAndTime}>
          <Skeleton variant="text" animation="wave" />
          <div className={classes.time}>
            <Skeleton variant="text" animation="wave" />
          </div>
        </div>

        <div className={classes.week}>
          <Skeleton variant="rect" animation="wave" />
        </div>
      </div>
      <div className={classes.weekProgressAndTime}>
        <div className={classes.week}>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div className={classes.week}>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div className={classes.week}>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div className={classes.week}>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div className={classes.week}>
          <Skeleton variant="rect" animation="wave" />
        </div>
      </div>
      <div className={classes.content}>
        <Skeleton variant="rect" animation="wave" />
        <Skeleton variant="rect" animation="wave" />
        <Skeleton variant="rect" animation="wave" />
        <Skeleton variant="rect" animation="wave" />
        <Skeleton variant="rect" animation="wave" />
      </div>
    </div>
  );
}

export default PracticeQuestionSkl;
