import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import CircularProgress from "../../components/circularProgress/index";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "rgba(235, 239, 242, 0.5)",
      border: "1px solid #ebeff2",
      borderRadius: 5,
      padding: "15px 10px",
      marginBottom: 15,
      display: "flex",
      alignItems: "center",
    },
    percentage: {},
    subjectDetails: {
      width: "80%",
    },

    subjectNameAndQuestions: {
      marginLeft: 10,
      display: "flex",
      alignItems: "center",
    },
    name: {
      marginRight: 10,
      "& p": {
        fontSize: 16,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    question: {
      display: "flex",
      alignItems: "center",
      color: "#243847",
      "& span": {
        margin: "0 12px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "1px",
        height: "10px",
      },
    },
    best: {
      marginTop: 5,
      display: "flex",
      alignItems: "center",
      "& p": {
        fontSize: 14,
        "&:nth-child(1)": {
          fontWeight: theme.typography.fontWeightBold,
          marginRight: 3,
        },
      },
    },
    bestAndWorse: {
      width: "90%",
      justifyContent: "space-between",
    },
  })
);
interface Props {
  subjectName: string;
  cat: any;
  retries: number;
  totalQuestions: number;
  history: any;
  percentage: number;
}
function Subject({
  subjectName,
  history,
  cat,
  retries,
  totalQuestions,
  percentage,
}: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.percentage}>
        <CircularProgress value={percentage} />
      </div>
      <div className={classes.subjectDetails}>
        <div className={classes.subjectNameAndQuestions}>
          <div className={classes.name}>
            <Typography variant="body1">{subjectName}</Typography>
          </div>
          <div className={classes.question}>
            <Typography variant="body1">{totalQuestions} Questions </Typography>
            <span></span>
            <Typography variant="body1"> {retries} Retries</Typography>
          </div>
        </div>
        <div
          className={`${classes.subjectNameAndQuestions} ${classes.bestAndWorse}`}
        >
          {cat.length >= 1 ? (
            <div className={classes.best}>
              <Typography variant="body1">Best - </Typography>
              <Typography variant="body1">
                {" "}
                {cat[0].category} ({Math.round(cat[0].avgScore)})
              </Typography>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {cat.length > 1 ? (
            <div className={classes.best}>
              <Typography variant="body1">Worst - </Typography>
              <Typography variant="body1">
                {" "}
                {cat[cat.length - 1].category} (
                {Math.round(cat[cat.length - 1].avgScore)})
              </Typography>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subject;
