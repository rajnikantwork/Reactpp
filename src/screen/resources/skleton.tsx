import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleSkl: {
      width: "20%",
      "& .MuiSkeleton-text": {
        height: 60,
      },
    },
    resourceContainerSkl: {
      marginTop: 60,
    },
    resourceSkl: {
      margin: "20px 0",
    },
    resourceTitleSkl: {
      marginBottom: 30,
      "& .MuiSkeleton-wave": {
        height: 40,
        width: "22%",
        marginBottom: 20,
      },
      "& span": {
        "&:last-child": {
          height: 20,
          width: "40%",
        },
      },
    },
    cardsSks: {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiSkeleton-root": {
        width: "30%",
        height: "200px",
      },
    },
  })
);
function ResourceSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.titleSkl}>
        <Skeleton variant="text" animation="wave" />
      </div>
      <div className={classes.resourceContainerSkl}>
        {Array.from(String(123), Number).map((index) => (
          <div className={classes.resourceSkl} key  = {index}>
            <div className={classes.resourceTitleSkl}>
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="rect" animation="wave" />
            </div>
            <div className={classes.cardsSks}>
              <Skeleton variant="rect" animation="wave" />
              <Skeleton variant="rect" animation="wave" />
              <Skeleton variant="rect" animation="wave" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceSkl;
