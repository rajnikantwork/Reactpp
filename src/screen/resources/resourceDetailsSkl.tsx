import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleSkl: {
        paddingTop:50,
      "& .MuiSkeleton-text": {
        height: 50,
        width: "70%",
      },
    },
    content: {
        marginTop:30,
        width: "100%",
        "& .MuiSkeleton-text": {
          height: 30,
        },
    }
  })
);
function ResourceDetailsSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.titleSkl}>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        </div>
        <div className = {classes.content}> 
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        </div>
   

    </div>
  );
}

export default ResourceDetailsSkl;
