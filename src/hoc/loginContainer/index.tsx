import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import LocalImages from "../../Utils/images";
const styles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100vh",
      width: "100%",
      background: `url(${LocalImages.LOGIN_BG_IMG}) no-repeat center center fixed`,
      backgroundSize: "cover",
    },
    loginContainer: {
      width: "92%",
      height: "100%",
      margin: "0 auto",
      [theme.breakpoints.down('md')]:{
        margin: "0",
        width: "100%"
      },
      [theme.breakpoints.between(800, 850)]:{
        height: "auto"
      },
      '& >div':{
          display: "flex",
          width: "100%",
          height: "100%",
          '& >div':{
            width: "38%",
            margin: "3% 0",
            background: "#fff",
            borderRadius: "10px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            fontFamily: theme.typography.fontFamily,
            [theme.breakpoints.down('md')]:{
              margin: "0",
            }
          }
      }
    },
  })
);
interface Props {
  children?: any;
  history?: any
}
function LoginContainer({ children, history }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.loginContainer}>{children}</div>
    </div>
  );
}

export default LoginContainer;
