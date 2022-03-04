import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CheckedFilledIcon from "../customMuiIcons/checkedIcon";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '20px 0',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    imgContainer: {
      margin: "0 auto",
      '& svg':{
          fontSize:100
      }
    },
    message: {
      margin: "10px 0",
      '& h5':{
          textAlign: "center",
          fontSize:28,
          fontWeight: 500,
          color:'#3f434a',
          fontFamily: 'Raleway !important'
      }
    },
  })
);
interface Props {
  message1: string;
  message2?: string;
  setOpen: Function;
}

function SuccessMessage({ message1, message2, setOpen }: Props) {
  React.useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, [setOpen]);
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <CheckedFilledIcon />
      </div>
      <div className={classes.message}>
        <Typography variant="h5">{message1}</Typography>
        <Typography variant="h5">{message2}</Typography>
      </div>
    </div>
  );
}

export default SuccessMessage;
