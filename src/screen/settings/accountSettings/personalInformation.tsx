import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../../modal/index";
import Schema from "../../../schema/index";
import { Formik, Form } from "formik";
import InputField from "../../../components/inputValues/index";
import ActionButton from "../../../components/button/index";
import { profile, updateUserProfile } from "../action";
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
function PersonalInformation() {
  const classes = styles();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  const { name, surname, email } = useSelector(
    (state: ReducersModal) => state.profileReducer
  );
  return (
    <div className={classes.container}>
      <Formik
        initialValues={{
          name: name,
          surname: surname,
          email: email,
        }}
        validationSchema={Schema.ProfileScheema()}
        enableReinitialize={true}
        onSubmit={(value, { setSubmitting }) => {
          dispatch(updateUserProfile(value, setSubmitting));
        }}
      >
        {({ errors, touched, isSubmitting, handleReset }) => (
          <React.Fragment>
            <Form className={classes.formContainer}>
              <div className={classes.inputFieldContainer}>
                <div className={classes.inputField}>
                  <InputField
                    name="name"
                    placeHolder="e.g. Axel "
                    label="Name"
                    type={"text"}
                    touched={touched}
                    errors={errors}
                  />
                </div>
                <div className={classes.inputField}>
                  <InputField
                    name="surname"
                    placeHolder="e.g. Blaze"
                    label="Surname"
                    type={"text"}
                    touched={touched}
                    errors={errors}
                  />
                </div>
                <div className={classes.inputField}>
                  <InputField
                    name="email"
                    placeHolder="e.g. example@xyz.com"
                    label="Email"
                    type={"email"}
                    touched={touched}
                    errors={errors}
                    disabled={true}
                  />
                </div>
              </div>
              <div className={classes.submitFormBtnAndCancelForm}>
                <ActionButton
                  name="Cancel"
                  type={"button"}
                  onPress={() => handleReset()}
                  custom={true}
                />
                <ActionButton
                  name="Save"
                  type={"submit"}
                  isSubmitting={isSubmitting}
                  onPress={() => console.log("")}
                />
              </div>
            </Form>
          </React.Fragment>
        )}
      </Formik>
    </div>
  );
}

export default PersonalInformation;
