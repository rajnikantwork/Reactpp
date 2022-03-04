import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Field, ErrorMessage } from "formik";
import Typography from "@material-ui/core/Typography";
import LocalImages from "../../Utils/images";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    fieldContainer: {
      position: "relative",
      minHeight: "75px",
      fontFamily: theme.typography.fontFamily,
      "& p": {
        color: theme.palette.text.primary,
        '&:nth-child(2)':{
          color:'red'
        }
      },
      "& input": {
        border: "1px solid #ccc",
        width: "99%",
        padding: "8px 0px 8px 5px",
        color: theme.palette.text.primary,
        position: "relative",
        transition: "all 0.2s ease",
        backgroundColor: "#fff",
        "&:hover": {
          // marginTop: "-px",
          border: `1px solid ${theme.palette.primary.main}`,
        },
        "&:focus": {
          marginTop: "-2px",
          outline: "none",
          border: `2px solid ${theme.palette.primary.main}`,
        },
      },
    },
    inputField: {
      width: "96%",
      borderRadius: "2px",
      outline: "none",
      marginTop: 5,
      display: "flex",
      alignItems: "center",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
    },
    passwordField: {
      paddingRight: "30px !important",
    },
    errorActive: {
      "& input": {
        marginTop: "-2px",
        border: `1px solid red !important`,
      },
    },
    err:{
      fontSize: "14px",
        color:'red !important'
    },
    togglePasswordVisiblity: {
      position: "absolute",
      top: 34,
      right: 16,
      marginRight: 5,
      marginBottom: "-2px",
    },
  })
);
interface Props {
  name: string;
  placeHolder: string;
  type: string;
  touched?: any;
  label: string;
  errors?: any;
  custom?: boolean;
  value?: string;
  disabled?: boolean;
  updateValue?: Function;
  passwordVisible?: boolean;
  setPasswordVisible?: Function;
}
function InputField({
  name,
  placeHolder,
  type,
  touched,
  label,
  errors,
  custom = false,
  value,
  disabled = false,
  passwordVisible,
  setPasswordVisible = () => null,
  updateValue = () => null,
}: Props) {
  const classes = styles();
  if (!custom) {
    return (
      <div className={classes.fieldContainer}>
        {type === "email" || type === "text" ? (
          <React.Fragment>
            <Typography variant="body2">{label}</Typography>
            <div
              className={
                errors[name] && touched[name]
                  ? `${classes.inputField} ${classes.errorActive}`
                  : classes.inputField
              }
            >
              <Field
                type={type}
                name={name}
                placeholder={placeHolder}
                disabled={disabled}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="body2">{label}</Typography>
            <div
              className={
                errors[name] && touched[name]
                  ? `${classes.inputField} ${classes.errorActive}`
                  : classes.inputField
              }
            >
              <Field
                className={classes.passwordField}
                type={passwordVisible ? "text" : "password"}
                name={name}
                placeholder={placeHolder}
              />
              <span className={classes.togglePasswordVisiblity}>
                {!passwordVisible ? (
                  <img
                    src={LocalImages.PASSWORD_HIDE}
                    alt="passwordhide"
                    onClick={() => setPasswordVisible(true)}
                  />
                ) : (
                  <img
                    src={LocalImages.PASSWORD_SHOW}
                    alt="passwordshow"
                    onClick={() => setPasswordVisible(false)}
                  />
                )}
              </span>
            </div>
          </React.Fragment>
        )}
        {`${errors[name] && touched[name]}` ? (
          <ErrorMessage name={name} className={classes.errorMessage}>
            {(msg) => <Typography className = {classes.err} variant="body2">{msg}</Typography>}
          </ErrorMessage>
        ) : null}
      </div>
    );
  } else
    return (
      <div className={classes.fieldContainer}>
        <Typography variant="body2">{label}</Typography>
        <div className={classes.inputField}>
          <input
            value={value}
            type={type}
            name={name}
            placeholder={placeHolder}
            onChange={(e) => updateValue(e.target.value)}
          />
        </div>
      </div>
    );
}

export default InputField;
