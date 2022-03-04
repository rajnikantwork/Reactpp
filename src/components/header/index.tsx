import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ImageContainer from "../imageContainer/index";
import LocalImages from "../../Utils/images";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../Utils";
import { ReducersModal } from "../../modal/index";
import HeaderDropdown from "../dropdown/headerDropDown";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "fixed",
      background: "#fff",
      width: "100%",
      padding: "8px 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 18px 0 rgba(16, 13, 46, 0.09)",
      fontFamily: theme.typography.fontFamily,
      zIndex: 999,
    },
    headerBranding: {
      width: "20%",
      [theme.breakpoints.between(310, 390)]: {
        width: "28%",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    userProfile: {
      width: "80%",
      display: "flex",
      alignItems: "center",
    },
    branding: {
      "& figure": {
        height: 50,
        width: 100,
        margin: 0,
      },
    },
    menu: {
      "& figure": {
        width: 18,
        height: 18,
        margin: 0,
      },
    },
    placeholder: {
      "& figure": {
        width: 30,
        height: 30,
        margin: 0,
      },
    },
    userNameAndNotification: {
      display: "flex",
      width: "20%",
      [theme.breakpoints.down("xs")]: {
        width: "32%",
      },
      [theme.breakpoints.between(310, 390)]: {
        width: "40%",
      },
      alignItems: "center",
      justifyContent: "space-between",
    },
    notificationContainer: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    notification: {
      "& figure": {
        width: 20,
        height: 20,
        margin: 0,
      },
    },
    profileDp: {
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "rgba(42,174,188, 0.5)",
      padding: "7px 0",
      minWidth: "41.25px",
      "& p": {
        marginTop: "-2px",
        fontSize: 20,
        textTransform: "uppercase",
        color: "rgb(42,174,188)",
        "&:nth-child(1)": {
          marginRight: "2px",
        },
      },
    },
    userName: {
      display: "flex",
      "& p": {
        maxWidth: 96,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        fontSize: 15,
        textTransform: "capitalize",
        fontWeight: theme.typography.fontWeightBold,
        margin: "0 10px",
        // fontFamily: "Montserrat",
        color: theme.palette.text.secondary,
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    dropdown: {
      "& figure": {
        width: 10,
        height: 10,
        margin: 0,
        "& img": {
          marginBottom: "-2px !important",
        },
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    dropdownOpen: {
      "& figure": {
        "& img": {
          transform: "rotate(180deg)",
          marginBottom: "-2px !important",
        },
      },
    },
  })
);
function Header({ history }: any) {
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { fullName } = useSelector(
    (state: ReducersModal) => state.headerDataReducer
  );
  const { toggle } = useSelector(
    (state: ReducersModal) => state.toggleSideNavReducer
  );
  React.useEffect(() => {
    dispatch({
      type: Utils.ActionName.HEADER_DATA,
      payload: {
        fullName: localStorage.getItem("userName")
          ? localStorage.getItem("userName")
          : sessionStorage.getItem("userName"),
        email: localStorage.getItem("userEmail")
          ? localStorage.getItem("userEmail")
          : sessionStorage.getItem("userEmail"),
      },
    });
  }, [dispatch]);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  // //
  //
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  return (
    <div className={classes.container}>
      <div className={classes.headerBranding}>
        <ImageContainer
          imgUrl={LocalImages.BRAND_LOGO}
          style={classes.branding}
        />
        <div
          onClick={() =>
            dispatch({
              type: Utils.ActionName.TOGGLE_SIDENAV,
              payload: { toggle: !toggle },
            })
          }
        >
          <ImageContainer
            imgUrl={LocalImages.HEADER_MENU}
            style={classes.menu}
          />
        </div>
      </div>
      <div className={classes.userNameAndNotification}>
        <div className={classes.notificationContainer} onClick={() => history.push('/notification')}>
          <ImageContainer
            imgUrl={LocalImages.NOTIFICATION_DARK}
            style={classes.notification}
          />
        </div>
        <div className={classes.userProfile}>
          <div className={classes.profileDp}>
            <Typography variant="body2">
              {fullName && fullName.split(" ")[0].charAt(0)}
            </Typography>
            <Typography variant="body2">
              {fullName && fullName.split(" ")[1].charAt(0)}
            </Typography>
          </div>
          <div className={classes.userName} onClick={handleClick}>
            <Typography variant="body2">{fullName && fullName}</Typography>
            <div>
              <ImageContainer
                imgUrl={LocalImages.DROPDOWN}
                style={
                  !open
                    ? classes.dropdown
                    : `${classes.dropdown} ${classes.dropdownOpen}`
                }
              />
            </div>
          </div>
        </div>
        
        <HeaderDropdown
          anchorEL={anchorEl}
          handleClose={handleClose}
          history={history}
        />
      </div>
    </div>
  );
}

export default Header;
