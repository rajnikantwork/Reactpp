import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Header from "../../components/header/index"
import MiniDrawer from "../../components/sideNavigation/index"
const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      minHeight: "100vh",
      minWidth: "100vh",
      flexDirection:'column'
    },
    headerContainer: {},
    navAndBodyContainer: {
      display: "flex",
    },
    navContainer: {},
    bodyContainer: {
      width:'100%',
      minHeight:'calc(100vh - 69px)',
      paddingTop:'68px',
      backgroundColor: theme.palette.primary.light,
      '& >div':{
        padding: "25px 50px 25px 50px",
        color:'#000'
      }
    },
  })
);
interface Props {
  children?: any;
  history?: any;
}
function MainContainer({ children, history }: Props) {
  const classes = styles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.headerContainer}>
          <Header history={history}/>
      </div>
      <div className={classes.navAndBodyContainer}>
        <div className={classes.navContainer}>
          <MiniDrawer history = {history}/>
        </div>
        <div className={classes.bodyContainer}>{children}</div>
      </div>
    </div>
  );
}

export default MainContainer;
