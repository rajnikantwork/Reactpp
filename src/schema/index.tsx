import * as Yup from "yup";
const LoginScheema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .max(100, "Email can be maximum of hundred characters")
      .trim()
      .required("Email field cannot be blank"),
    password: Yup.string().trim().required("Password field cannot be blank"),
  });
};
const ProfileScheema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, "Your name should only contain characters")
      .matches(/^(\b[A-Z]\w*\s*)+$/, "First letter should be capital")
      .trim()
      .min(2, "Your name should be at least of two characters")
      .max(40, "Your name should have at most forty characters")
      .required("Name field cannot be blank"),
    surname: Yup.string()
      .matches(/^[a-zA-Z ]+$/, "Your surname should only contain characters")
      .matches(/^(\b[A-Z]\w*\s*)+$/, "First letter should be capital")
      .trim()
      .min(2, "Your surname should be at least of two characters")
      .max(80, "Your name should have at most eighty characters")
      .required("Surname field cannot be blank"),
    email: Yup.string()
      .email("Please enter valid email")
      .trim()
      .required("Email field cannot be blank"),
  });
};
const ChangePasswordScheema = () => {
  return Yup.object().shape({
    currentpassword: Yup.string()
      .trim()
      .required("Current Password field cannot be blank"),
    newpassword: Yup.string()
      .min(6, "Password should be minimum of six characters")
      .max(20, "Password should be maximum of twenty characters")
      .trim()
      .required("New Password field cannot be blank")
      .test(
        "notBothAtTheSameTime",
        "Current Password and New Password should not be the same",
        function (newpassword) {
          const { currentpassword } = this.parent;
          if (currentpassword === newpassword) {
            return false;
          }
          return true;
        }
      ),
  });
};
const AddTodoSchema = () => {
  return Yup.object().shape({
    task: Yup.string()
      .trim()
      .min(2, "Your name should be at least of two characters")
      .max(40, "Your name should have at most forty characters")
      .required("Task field cannot be blank"),
    // link: Yup.string()
    //   .matches(
    //     /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
    //     "Link is not valid"
    //   ),
    subject: Yup.string().required("Select your subject"),
    week: Yup.string().required("Select your week"),
    category: Yup.string().required("Select your category"),
  });
};
const Schema = {
  LoginScheema: LoginScheema,
  ProfileScheema: ProfileScheema,
  ChangePasswordScheema: ChangePasswordScheema,
  AddTodoSchema: AddTodoSchema,
};
export default Schema;
