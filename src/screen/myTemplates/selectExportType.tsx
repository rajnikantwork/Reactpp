import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CloseModalButton from "../../components/button/closeModalButton";
import ActionButton from "../../components/button/index";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      width: "100%",
      margin: "10px auto 0 auto",
      position: "absolute",
      top: "-5px",
      opacity: 0,
      transition: "all 0.4s ease-in-out",
      zIndex: 999,
      "& div": {
        borderRadius: "5px",
        padding: "10px 0",
        backgroundColor: "rgb(254, 105, 105) !important",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
      },
    },
    errorAnim: {
      opacity: 1,
      top: "0px",
    },
    container: {
      position: "relative",
    },
    title: {
      "& h3": {
        fontSize: 26,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    selectionContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: 30,
    },
    actionButton: {
      width: "30%",
      margin: "0 auto",
    },
  })
);
interface Props {
  setOpen: Function;
  setOpen1: Function;
  selectedTemplate: Array<any>;
}
function SelectExportType({ setOpen, setOpen1, selectedTemplate }: Props) {
  const classes = styles();
  const [checkedA, setCheckedA] = React.useState(true);
  const [checkedB, setCheckedB] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const closeModal = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [display]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (name === "checkedA") {
      setCheckedA(true);
      setCheckedB(false);
    } else {
      setDisplay(false);
      setCheckedA(false);
      setCheckedB(true);
    }
  };
  const handleModalUpdate = () => {
    setDisplay(true);
    let err = "";
    if (checkedA) {
      if (selectedTemplate.length > 1) {
        setError(
          "Oops it looks like you are trying to export multiple templates with single template per page option. Either select continous option for multiple template export or select only single document with signle document per page"
        );
        err = "Error";
      } else {
        setError("");
        err = "";
      }
    }
    if (err === "") {
      setDisplay(false);
      setOpen(false);
      setOpen1(true);
    }
  };
  return (
    <div className={classes.container}>
      <CloseModalButton onClick={closeModal} />
      <div
        className={
          !display ? classes.error : `${classes.error} ${classes.errorAnim}`
        }
      >
        {error ? (
          <div>
            <Typography variant="body2"> {error}</Typography>
          </div>
        ) : null}
      </div>
      <div className={classes.title}>
        <Typography variant="h3">Export to RTF Document</Typography>
      </div>
      <div className={classes.selectionContainer}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedA}
              onChange={handleChange}
              name="checkedA"
              color="primary"
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
            />
          }
          label="1 template per page"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
            />
          }
          label="Continuous"
        />
      </div>
      <div className={classes.actionButton}>
        <ActionButton name="Export" onPress={handleModalUpdate} />
      </div>
    </div>
  );
}

export default SelectExportType;
