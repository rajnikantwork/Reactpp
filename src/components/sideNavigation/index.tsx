import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../modal/index";
import Typography from "@material-ui/core/Typography";
import sideNavigation from "../../Utils/constData";
import Utils from "../../Utils";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& div": {
        top: 68,
        background: "#363353",
        color: "#fff",
        padding: "12px 0",
        border: "none",
        "& >ul": {
          marginTop: "-44px",
          zIndex: 1200,
          "& div": {
            transition: "all .2s ease-out",
            position: "relative",
            "&:hover": {
              minWidth: "244px !important",
              background:
                "linear-gradient(90deg,rgba(1,169,212,.6) 0,rgba(10,202,174,.6) 104.02%) !important",
            },
          },
          "& img": {
            width: 20,
            height: 20,
            marginLeft: 30,
            [theme.breakpoints.down("xs")]: {
              marginLeft: 19,
            },
          },
          "& p": {
            marginLeft: 27,
            fontSize: 15,
          },
        },
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    active: {
      background:
        "linear-gradient(90deg,rgba(1,169,212,.6) 0,rgba(10,202,174,.6) 104.02%) !important",
    },
    normal: {},
  })
);
interface Props {
  history: any;
}

export default function MiniDrawer({ history }: Props) {
  const classes = useStyles();
  const { toggle } = useSelector(
    (state: ReducersModal) => state.toggleSideNavReducer
  );
  const redirectTo = (value: string) => {
    if (value === "Study Planner") history.push(Utils.Pathname.STUDY_PLANNER);
    if (value === "My Progress") history.push(Utils.Pathname.MY_PROGRESS);
    if (value === "Timetable") history.push(Utils.Pathname.TIMETABLE);
    if (value === "Practice") history.push(Utils.Pathname.PRACTICE);
    if (value === "Resources") history.push(Utils.Pathname.RESOURCE);
    if (value === "My Templates") history.push(Utils.Pathname.MY_TEMPLATE);
    if (value === "Notification") history.push(Utils.Pathname.NOTIFICATION);
    if (value === "Settings") history.push(Utils.Pathname.SETTINGS);
  };
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: toggle,
          [classes.drawerClose]: !toggle,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: toggle,
            [classes.drawerClose]: !toggle,
          }),
        }}
      >
        <List>
          {sideNavigation.map((value, index) => (
            <ListItem
              button
              key={index}
              onClick={() => redirectTo(value.name)}
              className={
                history.location.pathname.split("/")[1] ===
                value.name.split(" ").join("").toLowerCase()
                  ? classes.active
                  : classes.normal
              }
            >
              <img src={value.icon} alt="img" />
              <Typography variant="body2">{value.name}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
