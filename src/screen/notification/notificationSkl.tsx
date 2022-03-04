import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    title: {
      "& span": {
        width: "30%",
        height: "60px",
      },
    },
    bar: {
      "& div": {
        margin: "15px 0",
        "& span": {
          height: 80,
        },
      },
    },
  })
);
function NotificationSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Skeleton variant="text" />
      </div>
      <div className={classes.bar}>
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
    </div>
  );
}

export default NotificationSkl;
