import React from "react";
import { Typography } from "@material-ui/core";
import ActionButton from "../../../components/button/index";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useHistory } from "react-router";
import Utils from "../../../Utils";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "50%",
      margin: "0 auto",
      padding: 20,
      textAlign: "center",
      "& h5": {
        fontWeight: theme.typography.fontWeightMedium,
        margin: "10px 0",
        fontSize: 25,
      },
    },
  })
);
interface Props {
  setOpen: Function;
  questionNum: any;
  allQuestions: any;
}
function IsTimeOverModal({ setOpen, questionNum, allQuestions }: Props) {
  const history = useHistory();
  const classes = styles();
  const id = history.location.pathname.split("/")[2];
  const goToNextQuestion = () => {
    if (questionNum < allQuestions.length) {
      let currentIndex = allQuestions.findIndex(
        (value: any) => value._id === id
      );
      history.push(
        `${Utils.Pathname.PRACTICE_QUESTION.replace(
          ":questionId",
          allQuestions[currentIndex + 1]["_id"]
        )}`
      );
    } else history.push("/practice");
    setOpen(false);
  };
  return (
    <div className={classes.container}>
      <Typography variant="h5">Time is over</Typography>
      <ActionButton
        name={
          questionNum < allQuestions.length
            ? "Go to Next Question"
            : "Go to practice questions page"
        }
        onPress={() => goToNextQuestion()}
        custom={true}
      />
    </div>
  );
}

export default IsTimeOverModal;
