import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {ReducersModal} from "../../modal/index"
import {useSelector} from 'react-redux'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
export default function SimpleBackdrop() {
    const {backdrop} = useSelector((state:ReducersModal) => state.backdropReducer)
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
