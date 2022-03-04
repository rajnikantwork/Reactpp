import { makeStyles, Theme, createStyles } from "@material-ui/core";
import ImageContainer from "../../components/imageContainer/index";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../modal/index";
import Schema from "../../schema/index";
import { Formik, Form } from "formik";
import InputField from "../../components/inputValues/index";
import ActionButton from "../../components/button/index";
import Checkbox from "@material-ui/core/Checkbox";
import Utils from "../../Utils";
import { Link } from "react-router-dom";
import LocalImages from "../../Utils/images";
import { login } from "./action";
import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
const styles = makeStyles((theme: Theme) =>
  createStyles({
    loginContainer: {
      justifyContent: "flex-end",
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
      "& >div": {
        [theme.breakpoints.down("md")]: {
          width: "100% !important",
        },
      },
    },
    brandLogo: {
      "& figure": {
        margin: 0,
        width: "140px",
        height: "70px",
      },
    },
    title: {
      margin: "25px 0 15px 0",
      "& .MuiTypography-h5": {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    formContainer: {
      width: "70%",
      margin: "0 auto",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    inputField: {
      margin: "5px 0 0 0",
    },
    rememberMeAndForgotPass: {
      margin: "5px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rememberMe: {
      display: "flex",
      alignItems: "center",
      "& span": {
        paddingLeft: "0",
      },
    },
    forgotPassword: {
      "& p": {
        fontSize: "14px",
        "& a": {
          textDecoration: "none",
          color: theme.palette.primary.main,
        },
      },
    },
    submitFormBtn: {
      margin: "5px 0",                      
    },
  })
);
function Login({ history }: any) {
  const classes = styles();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { email, password, rememberMe } = useSelector(
    (state: ReducersModal) => state.logInReducer
  );
  const handleChange = (event: any) => {
    dispatch({
      payload: { rememberMe: event.target.checked },
      type: Utils.ActionName.LOGIN,
    });
  };
  return (
    <HelmetProvider>
    <div className={classes.loginContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div>
        <ImageContainer
          style={classes.brandLogo}
          imgUrl={LocalImages.BRAND_LOGO}
        />
        <div className={classes.title}>
          <Typography variant="h5">Log In To Your Account</Typography>
        </div>

        <Formik
          initialValues={{
            email,
            password,
            rememberMe,
          }}
          validationSchema={Schema.LoginScheema()}
          onSubmit={(value, { setSubmitting }) => {
            console.log(value);
            debugger
            dispatch(login(value, history, setSubmitting, rememberMe));
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={classes.formContainer}>
              <div className={classes.inputField}>
                <InputField
                  name="email"
                  placeHolder="e.g. example@xyz.com"
                  label="Email"
                  type={"email"}
                  touched={touched}
                  errors={errors}
                />
              </div>
              <div className={classes.inputField}>
                <InputField
                  name="password"
                  placeHolder="e.g. Password123"
                  label="Password"
                  type={"password"}
                  touched={touched}
                  errors={errors}
                  passwordVisible={passwordVisible}
                  setPasswordVisible={setPasswordVisible}
                />
              </div>
              <div className={classes.rememberMeAndForgotPass}>
                <div className={classes.rememberMe}>
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <Typography variant="body2">Remember Me</Typography>
                </div>
                <div className={classes.forgotPassword}>
                  <Typography variant="body2">
                    <Link to={Utils.Pathname.FORGOT_PASSWORD}>
                      Forgot Password?
                    </Link>
                  </Typography>
                </div>
              </div>
              <div className={classes.submitFormBtn}>
                <ActionButton
                  name="Log In"
                  type={"submit"}
                  isSubmitting={isSubmitting}
                  onPress={() => setPasswordVisible(false)}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </HelmetProvider>
  );
}

export default Login;
