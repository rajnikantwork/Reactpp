import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      position: "absolute",
      top: 0,
      right: 0,
      background: "#F8F8F8",
      borderRadius: "50%",
      padding: "3px 5px 2px 5px",
      "&:hover": {
        cursor: "pointer",
      },
      "& svg": {
        fontSize: 15,
      },
    },
  })
);
interface Props {
  onClick: Function;
}
function CloseModalButton({ onClick }: Props) {
  const classes = styles();
  return (
    <div className={classes.close} onClick={() => onClick()}>
      <ClearIcon />
    </div>
  );
}

export default CloseModalButton;
