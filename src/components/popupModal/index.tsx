import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      width: 540,
      borderRadius: 10,
      outline: "none",
      backgroundColor: "#fff",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
interface Props {
  children: any;
  open: boolean;
  setOpen: Function;
  modstyle?: any;
}
export default function TransitionsModal({
  children,
  open,
  setOpen,
  modstyle,
}: Props) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 600,
        }}
      >
        <Fade in={open}>
          <React.Fragment>
            <Backdrop open={true} />
            <div
              className={
                modstyle
                  ? `${classes.container}  ${modstyle}`
                  : classes.container
              }
            >
              {children}
            </div>
          </React.Fragment>
        </Fade>
      </Modal>
    </div>
  );
}
