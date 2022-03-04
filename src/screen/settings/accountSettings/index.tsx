import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PersonalInformation from "./personalInformation";
import Notifications from "./notifications";
import ChangePassword from "./changePassword";
import Backdrop from "../../../components/backdrop";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#fff",
      padding: 20,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      minHeight: "360px",
    },
    screenSwitch: {
      marginTop: 30,
      display: "flex",
      flexDirection: "column",
      width: "32%",
      [theme.breakpoints.down("xs")]:{
        width: "100%",
      },
      marginLeft: 50,
    },
    content: {
      width: "60%",
      [theme.breakpoints.down("xs")]:{
        width: "100%",
      }
    },
    category: {
      color: "#363353",
      fontSize: 18,
      fontWeight: theme.typography.fontWeightMedium,
      margin: "10px 0",
      transition: "all 0.3s ease",
      "& span": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    selected: {
      color: theme.palette.primary.main,
    },
  })
);
function AccountSettings() {
  const [selected, setSelected] = React.useState(1);
  const classes = styles();
  const selectCategory = (value: number) => {
    setSelected(value);
  };
  return (
    <div className={classes.container}>
      <Backdrop />
      <div className={classes.screenSwitch}>
        <Typography
          variant="body2"
          className={
            selected === 1
              ? `${classes.category} ${classes.selected}`
              : classes.category
          }
        >
          <span onClick={() => selectCategory(1)}> Personal Information </span>
        </Typography>
        <Typography
          variant="body2"
          className={
            selected === 2
              ? `${classes.category} ${classes.selected}`
              : classes.category
          }
        >
          <span onClick={() => selectCategory(2)}> Change Password</span>
        </Typography>
        <Typography
          variant="body2"
          className={
            selected === 3
              ? `${classes.category} ${classes.selected}`
              : classes.category
          }
        >
          <span onClick={() => selectCategory(3)}> Notifications</span>
        </Typography>
      </div>
      <div className={classes.content}>
        {selected === 1 ? (
          <PersonalInformation />
        ) : selected === 2 ? (
          <ChangePassword />
        ) : (
          <Notifications />
        )}
      </div>
    </div>
  );
}

export default AccountSettings;
