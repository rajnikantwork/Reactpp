import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import CloseModalButton from "../../components/button/closeModalButton";
import Typography from "@material-ui/core/Typography";
import ActionButton from "../../components/button/index";
import {useDispatch} from "react-redux";
import { deleteTemplate } from "./action";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      marginTop:30,
      '& >div':{
        top:'-25px',
        right:0,
      }
    },
    title: {
      textAlign: "center",
      margin: "10px 0",
    },
    actionBtn: {
      width:'60%',
      margin:'0 auto',
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      '& button':{
        width:'45%'
      }
    },
  })
);
interface Props {
  setOpen: Function;
  selectedDeleteId:string
}
function DeleteConfirmationDialogue({ setOpen, selectedDeleteId }: Props) {
  const dispatch = useDispatch();
  const closeModal = () => {
    setOpen(false);
  };
  const handleDetete = () => {
    dispatch(deleteTemplate(selectedDeleteId));
    setOpen(false);
  };
  const classes = styles();
  return (
    <div className={classes.container}>
      <CloseModalButton onClick={closeModal} />
      <div className={classes.title}>
        <Typography variant="h5">
          Are you sure want to delete this template?
        </Typography>
      </div>
      <div className={classes.actionBtn}>
        <ActionButton name="No" onPress={closeModal} />
        <ActionButton name="Yes" onPress={handleDetete} />
      </div>
    </div>
  );
}

export default DeleteConfirmationDialogue;
