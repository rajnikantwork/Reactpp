import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleAndSearch: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    titleSkl: {
      width: "20%",
      "& .MuiSkeleton-text": {
        height: 60,
      },
    },
    search: {
      width: "75%",
      "& .MuiSkeleton-wave": {
        height: 35,
      },
    },
    filterAndAdd: {
      marginTop: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    allfilter: {
      width: "55%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    filter: {
      width: "30%",
      "& .MuiSkeleton-wave": {
        height: 45,
      },
    },
    add: {
      width: "30%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& div": {
        width: "40%",
      },
    },
    templates: {
        marginTop:'30px',
      width: "100%",
      "& div": {
        margin: "5px 0",
        "& .MuiSkeleton-wave": {
          height: 55,
        },
      },
    },
  })
);
function TemplateSkl() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.titleAndSearch}>
        <div className={classes.titleSkl}>
          <Skeleton variant="text" animation="wave" />
        </div>
        <div className={classes.search}>
          <Skeleton variant="rect" animation="wave" />
        </div>
      </div>
      <div className={classes.filterAndAdd}>
        <div className={classes.allfilter}>
          <div className={classes.filter}>
            <Skeleton variant="rect" animation="wave" />
          </div>
          <div className={classes.filter}>
            <Skeleton variant="rect" animation="wave" />
          </div>
          <div className={classes.filter}>
            <Skeleton variant="rect" animation="wave" />
          </div>
        </div>
        <div className={classes.add}>
          <div className={classes.filter}>
            <Skeleton variant="rect" animation="wave" />
          </div>
          <div className={classes.filter}>
            <Skeleton variant="rect" animation="wave" />
          </div>
        </div>
      </div>
      <div className={classes.templates}>
        <div>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div>
          <Skeleton variant="rect" animation="wave" />
        </div>
        <div>
          <Skeleton variant="rect" animation="wave" />
        </div>
      </div>
    </div>
  );
}

export default TemplateSkl;
