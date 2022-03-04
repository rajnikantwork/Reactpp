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
function ResourceViewAllSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.titleSkl}>
        <Skeleton variant="text" animation="wave" />
      </div>
      <div className={classes.resourceContainerSkl}>
        {Array.from(String(123456), Number).map((index) => (
          <div className={classes.resourceSkl} key  = {index}>
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

export default ResourceViewAllSkl;
