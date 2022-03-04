import React from "react";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    filter: {
      display: "flex",
      alignItems: "center",
      padding: "7px 0",
      justifyContent: "space-between",
      "& p": {
        color: "#000",
        fontSize: 17,
        transition: "all 0.3s ease",
      },
      "&:hover": {
        cursor: "pointer",
        "& p": {
          color: theme.palette.primary.main,
        },
      },
      "& svg": {
        color: theme.palette.primary.main,
      },
    },
    active: {
      "& p": {
        color: theme.palette.primary.main,
      },
    },
  })
);
interface Props {
  title: string;
  updateFilter1: Function;
  state: string;
  command: string;
}
function ResourceFilterMenu({ title, updateFilter1, state, command }: Props) {
  const classes = styles();
  return (
    <div
      onClick={() => updateFilter1(command)}
      className={
        state === "true"
          ? `${classes.filter} ${classes.active}`
          : classes.filter
      }
    >
      <Typography variant="body2">{title}</Typography>
      {state === "true" ? <CheckIcon /> : <React.Fragment></React.Fragment>}
    </div>
  );
}

export default ResourceFilterMenu;
