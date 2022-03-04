import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LocalImages from "../../Utils/images";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../modal/index";
import InputField from "../../components/inputValues/index";
import ActionButton from "../../components/button/index";
import BackTo from "../../components/backTo/index";
import ImageContainer from "../../components/imageContainer/index";
import Utils from "../../Utils";
import { resetPassword } from "./action";
import { Helmet, HelmetProvider } from 'react-helmet-async';
const styles = makeStyles((theme: Theme) =>
  createStyles({
    forgotPasswordContainer: {
      justifyContent: "center",
      "& >div": {
        [theme.breakpoints.down("xs")]: {
          width: "100% !important",
        },
      },
    },
    error: {
      width: "90%",
      margin: "10px auto 0 auto",
      position: "absolute",
      top: "-5px",
      opacity: 0,
      transition: "all 0.4s ease-in-out",
      "& div": {
        borderRadius: "5px",
        padding: "10px 0",
        backgroundColor: "rgba(254, 105, 105, 0.28) !important",
        justifyContent: "center",
        textAlign: "center",
        color: "#f13030",
      },
    },
    errorAnim: {
      opacity: 1,
      top: "10px",
    },
    lockImg: {
      "& figure": {
        width: "150px",
        height: "150px",
      },
    },
    title: {
      margin: "10px 0",
      textAlign: "center",
      "& h5": {
        fontWeight: theme.typography.fontWeightBold,
      },
      "& p": {
        width: "80%",
        margin: "10px auto",
      },
    },
    formContainer: {
      width: "70%",
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    inputField: {
      margin: "10px 0",
      width: "100%",
    },
    submitFormBtn: {
      width: "100%",
      margin: "5px 0",
    },
  })
);
function ResetPassword({ history }: any) {
  const classes = styles();
  const dispatch = useDispatch();
  const { resetpassword } = useSelector(
    (state: ReducersModal) => state.resetPasswordReduce
  );
  const [err, getErr] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    dispatch({
      type: Utils.ActionName.RESET_PASSWORD,
      payload: { resetpassword: "" },
    });
  }, [dispatch]);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [display]);
  const checkValidity = (value: string) => {
    if (value === "") getErr("Password is required");
    else {
      if (value.length < 6) {
        getErr("Password should be minimum of six characters");
      } else if (value.length > 20) {
        getErr("Password should be maximum of twenty characters");
      } else {
        setLoading(true);
        dispatch(resetPassword(resetpassword, history, setLoading));
        getErr("");
        dispatch({
          type: Utils.ActionName.RESET_PASSWORD,
          payload: { resetpassword: "" },
        });
      }
    }
  };
  const updateValue = (value: string) => {
    dispatch({
      type: Utils.ActionName.RESET_PASSWORD,
      payload: { resetpassword: value },
    });
  };
  return (
    <HelmetProvider>
    <div className={classes.forgotPasswordContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>
      <div>
        <div
          className={
            !display ? classes.error : `${classes.error} ${classes.errorAnim}`
          }
        >
          {err ? (
            <div>
              <Typography variant="body2"> {err}</Typography>
            </div>
          ) : null}
        </div>

        <ImageContainer
          style={classes.lockImg}
          imgUrl={LocalImages.FORGOT_PASS_LOCK_IMG}
        />
        <div className={classes.title}>
          <Typography variant="h5">Reset Your Password</Typography>
          <Typography variant="body1">Choose a new password</Typography>
        </div>

        <div className={classes.formContainer}>
          <div className={classes.inputField}>
            <InputField
              name="password"
              placeHolder="6+ characters"
              label="Password"
              type={"password"}
              value={resetpassword}
              custom={true}
              updateValue={updateValue}
            />
          </div>
          <div className={classes.submitFormBtn}>
            <ActionButton
              name="Continue"
              type="submit"
              custom={true}
              isSubmitting={loading}
              onPress={() => {
                setDisplay(true);
                checkValidity(resetpassword);
              }}
            />
          </div>
        </div>

        <BackTo value="Back To Login" />
      </div>
    </div>
    </HelmetProvider>
  );
}

export default ResetPassword;
