import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Schema from "../../../schema/index";
import { Formik, Form } from "formik";
import InputField from "../../../components/inputValues/index";
import ActionButton from "../../../components/button/index";
import { changePassword } from "../action";
import TransitionsModal from "../../../components/popupModal/index";
import SuccessMessage from "../../../components/successMessage/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    formContainer: {},
    inputFieldContainer: {
      width: "70%",
      margin: "0 auto",
    },
    inputField: {
      width: "100%",
      margin: "5px 0 0 0",
      "& input": {
        background: "#fff",
      },
    },
    submitFormBtnAndCancelForm: {
      margin: "40px 0 0 0",
      display: "flex",
      alignItems: "center",
      width: "96%",
      justifyContent: "flex-end",
      "& button": {
        width: "28%",
        "&:nth-child(1)": {
          backgroundColor: "#ebeff2",
          color: "#363353",
          marginRight: 40,
        },
      },
    },
  })
);
function ChangePassword() {
  const classes = styles();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordVisible1, setPasswordVisible1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.container}>
      <Formik
        initialValues={{
          currentpassword: "",
          newpassword: "",
        }}
        validationSchema={Schema.ChangePasswordScheema()}
        enableReinitialize={true}
        onSubmit={(value, { setSubmitting, resetForm }) => {
          dispatch(changePassword(value, setSubmitting, resetForm, setOpen));
        }}
      >
        {({ errors, touched, isSubmitting, handleReset }) => (
          <React.Fragment>
            <Form className={classes.formContainer}>
              <div className={classes.inputFieldContainer}>
                <div className={classes.inputField}>
                  <InputField
                    name="currentpassword"
                    placeHolder="e.g. Password123"
                    label="Insert Current Password"
                    type={"password"}
                    touched={touched}
                    errors={errors}
                    passwordVisible={passwordVisible}
                    setPasswordVisible={setPasswordVisible}
                  />
                </div>
                <div className={classes.inputField}>
                  <InputField
                    name="newpassword"
                    placeHolder="6+ characters"
                    label="Choose Password"
                    type={"password"}
                    touched={touched}
                    errors={errors}
                    passwordVisible={passwordVisible1}
                    setPasswordVisible={setPasswordVisible1}
                  />
                </div>
              </div>
              <div className={classes.submitFormBtnAndCancelForm}>
                <ActionButton
                  name="Cancel"
                  type={"button"}
                  isSubmitting={isSubmitting}
                  onPress={() => handleReset()}
                />
                <ActionButton
                  name="Save"
                  type={"submit"}
                  isSubmitting={isSubmitting}
                  onPress={() => {
                    setPasswordVisible(false);
                    setPasswordVisible1(false);
                  }}
                />
              </div>
            </Form>
          </React.Fragment>
        )}
      </Formik>
      <TransitionsModal
        open={open}
        setOpen={setOpen}
        children={
          <SuccessMessage
            message1="Success!"
            message2="Your new password is been saved"
            setOpen={setOpen}
          />
        }
      />
    </div>
  );
}

export default ChangePassword;
