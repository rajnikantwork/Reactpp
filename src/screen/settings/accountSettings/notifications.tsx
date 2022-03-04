import React from "react";
import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      marginTop:40,
      marginLeft:50,
      width:'85%',
      justifyContent: "space-between",
    },
  })
);
interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 44,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      transform: "translateX(2.5px)",
      "&$checked": {
        transform: "translateX(18px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 23,
      height: 23.5,
    },
    track: {
      borderRadius: 26 / 2,
       backgroundColor: '#f5f5f5',
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
function Notifications() {
  const classes = styles();
  const [checked, setChecked] = React.useState(true);
  return (
    <div className={classes.container}>
      <Typography variant="body2">Email Notification</Typography>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={checked}
            onChange={() => setChecked(!checked)}
            name="checked"
          />
        }
        label=""
      />
    </div>
  );
}

export default Notifications;
