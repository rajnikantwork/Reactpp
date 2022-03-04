import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    topRow: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    leftSection: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      "& span": {
        width: "100%",
        "&:nth-child(1)": {
          height: 40,
        },
        "&:nth-child(2)": {
          height: 50,
        },
      },
    },
    rightSection: {
      width: "30%",
      "& span": {
        height: 100,
      },
    },
    week: {
      marginTop: 30,
      "& span": {
        width: 150,
        height: 40,
      },
    },
    basicInfo: {
      marginTop: 30,
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      "& div": {
        width: "15%",
        "& span": {
          height: 80,
        },
      },
    },
    graphs: {
      marginTop: 30,
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      "& div": {
        "&:nth-child(1)": {
          width: "58%",
          "& span": {
            height: 200,
          },
        },
        "&:nth-child(2)": {
          width: "38%",
          "& span": {
            height: 200,
          },
        },
      },
    },
  })
);
function MyProgressSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        <div className={classes.leftSection}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
        <div className={classes.rightSection}>
          <Skeleton variant="text" />
        </div>
      </div>
      <div className={classes.week}>
        <Skeleton variant="rect" />
      </div>
      <div className={classes.basicInfo}>
        <div>
          <Skeleton variant="rect" />
        </div>
        <div>
          <Skeleton variant="rect" />
        </div>
        <div>
          <Skeleton variant="rect" />
        </div>
        <div>
          <Skeleton variant="rect" />
        </div>
        <div>
          <Skeleton variant="rect" />
        </div>
        <div>
          <Skeleton variant="rect" />
        </div>
      </div>
      <div className={classes.graphs}>
        <div>
          <Skeleton variant="rect" />
        </div>
        <div>
          <Skeleton variant="rect" />
        </div>
      </div>
      <div className={classes.graphs}>
        <div>
          <Skeleton variant="rect" />
        </div>
        <div>
          <Skeleton variant="rect" />
        </div>
      </div>
    </div>
  );
}

export default MyProgressSkl;
