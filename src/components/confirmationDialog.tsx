import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
interface Props {
    title: string;
    onSubmit: Function;
    description: string;
}

const ConfirmationDialog = forwardRef(({ title, description, onSubmit }: Props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openAlert() {
            setOpen(true);
        }
    }));

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {"Cancel"}
                </Button>
                <Button onClick={() => {
                    onSubmit();
                    handleClose();
                }} color="primary" autoFocus>
                    {"OK"}
                </Button>
            </DialogActions>
        </Dialog>
    );

});

export default ConfirmationDialog;