import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ActionButton from "../../components/button/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "20px",
      color: "#3f434a",
    },
    title: {
      "& h5": {
        fontWeight: theme.typography.fontWeightBold,
      },
      textAlign: "center",
    },
    content: {
      margin: "20px 0 15px 0",
      "& p": {
        "& span": {
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
        },
      },
    },
    button: {
      width: "40%",
      margin: "40px auto 0px auto",
    },
  })
);
interface Props {
  setOpen: Function;
}
function WelcomeMessage({ setOpen }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h5">Welcome to the Bar Exam Course!</Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="body2">
          The Guide is a key document which explains the BEC study methods and
          how to maximize the benefits of the tools in this web portal.
        </Typography>
        <Typography variant="body2">
          It is under the <span>Resources</span> tab.
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="body2">
          In the interim, a few quick bits of advice.
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="body2">
          <span>Templates. </span>From Week 1, you will create 'templates' which
          are pre-prepared statements of the rule which a space for application.
          You will refer these so that they allow you to answer questions in
          time.
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="body2">
          <span>Categories. </span>The Category system is explained in the Guide.{" "}
        </Typography>
        <Typography variant="body2">
          In short, Category 1 is material for which you should create a
          template. Category 2 is material which should be memorized. Category 3
          is content which has not been examined before.
        </Typography>
      </div>
      <div className={classes.button}>
        <ActionButton
          name={"Continue"}
          custom={true}
          onPress={() => setOpen(false)}
        />
      </div>
    </div>
  );
}

export default WelcomeMessage;
