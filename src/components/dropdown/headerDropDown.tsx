import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { makeStyles, createStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { logOut } from "../header/action";
import ImageContainer from "../../components/imageContainer/index";
import LocalImages from "../../Utils/images";
import Utils from "../../Utils";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      "&:focus": {
        outline: "none",
      },
      [theme.breakpoints.down("xs")]: {
        "& .MuiPaper-rounded": {
          left: "70% !important",
        },
      },
      [theme.breakpoints.between(350, 380)]: {
        "& .MuiPaper-rounded": {
          left: "64% !important",
        },
      },
      [theme.breakpoints.between(310, 340)]: {
        "& .MuiPaper-rounded": {
          left: "53% !important",
        },
      },
    },
    profileDropdown: {
      width: "210px",
      outline: "none",
    },
    innerProfileContainer: {
      padding: "10px 25px",

      "& div": {
        display: "flex",
        alignItems: "center",
        padding: "4px 0",

        "& div": {
          paddingRight: 15,
          "&:hover": {
            cursor: "pointer",
          },
        },
        "& p": {
          paddingLeft: 5,
          color: "#000",
          fontSize: 16,
          // fontFamily: "Montserrat",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
    imgstyle: {
      "& figure": {
        width: 18,
        height: 18,
        margin: 0,
      },
    },
    logoutContainer: {
      backgroundColor: "#ebeff2",
      textAlign: "center",
      padding: "8px 0",
      color: "#000",
      "& p": {
        // fontFamily: "Montserrat",
      },
      fontWeight: theme.typography.fontWeightMedium,
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);
const StyledMenu = withStyles({
  paper: {
    "&:focus": {
      outline: "none",
    },
    borderRadius: "10px",
    border: "1px solid #d3d4d5",
    left: "82% !important",
    top: "54px !important",
    "& ul": {
      padding: "0",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "0",
    },
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
interface Props {
  anchorEL: any;
  handleClose: Function;
  history: any;
  userDetails?: any;
}
export default function HeaderDropdown({
  anchorEL,
  handleClose,
  history,
}: Props) {
  const classes = styles();
  const dispatch = useDispatch();
  const routeTo = (value: string) => {
    history.push(value);
    handleClose();
  };
  const logout = () => {
    dispatch(logOut(history));
  };
  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEL}
        keepMounted
        open={Boolean(anchorEL)}
        onClose={() => handleClose()}
        className={classes.menu}
        disableScrollLock={true}
      >
        <div className={classes.profileDropdown}>
          <div className={classes.innerProfileContainer}>
            <div>
              <span onClick={() => routeTo(Utils.Pathname.STUDY_PLANNER)}>
                <ImageContainer
                  imgUrl={LocalImages.NAV_STUDY_PLANNER_DARK}
                  style={classes.imgstyle}
                />
              </span>
              <Typography
                variant="body2"
                onClick={() => routeTo(Utils.Pathname.STUDY_PLANNER)}
              >
                My tasks
              </Typography>
            </div>
            <div>
              <span onClick={() => routeTo(Utils.Pathname.MY_PROGRESS)}>
                <ImageContainer
                  imgUrl={LocalImages.NAV_MY_PROGRESS_PLANNER_DARK}
                  style={classes.imgstyle}
                />
              </span>
              <Typography
                variant="body2"
                onClick={() => routeTo(Utils.Pathname.MY_PROGRESS)}
              >
                My progress
              </Typography>
            </div>
            <div>
              <span onClick={() => routeTo(Utils.Pathname.PRACTICE)}>
                <ImageContainer
                  imgUrl={LocalImages.NAV_PRACTICE_DARK}
                  style={classes.imgstyle}
                />
              </span>
              <Typography
                variant="body2"
                onClick={() => routeTo(Utils.Pathname.PRACTICE)}
              >
                Practice
              </Typography>
            </div>
            <div>
              <span onClick={() => routeTo(Utils.Pathname.SETTINGS)}>
                <ImageContainer
                  imgUrl={LocalImages.NAV_SETTINGS_DARK}
                  style={classes.imgstyle}
                />
              </span>
              <Typography
                variant="body2"
                onClick={() => routeTo(Utils.Pathname.SETTINGS)}
              >
                Account Settings
              </Typography>
            </div>
          </div>
          <div className={classes.logoutContainer} onClick={logout}>
            <Typography variant="body2">Log Out</Typography>
          </div>
        </div>
      </StyledMenu>
    </div>
  );
}
