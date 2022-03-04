import Utils from "../../Utils";
export const profile = () => {
  return async (dispatch: any) => {
    dispatch({
      type: Utils.ActionName.BACKDROP,
      payload: { backdrop: true },
    });
    Utils.api.getApiCall(
      `${Utils.endPoints.profile}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.PROFILE,
            payload: {
              email: data.data.email ? data.data.email : "",
              name: data.data.firstName ? data.data.firstName : "",
              surname: data.data.lastName ? data.data.lastName : "",
            },
          });

          dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: false },
          });
        } else {
          dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: false },
          });
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
        dispatch({
          type: Utils.ActionName.BACKDROP,
          payload: { backdrop: false },
        });
      }
    );
  };
};
export const updateUserProfile = (value: any, setSubmitting: any) => {
  return (dispatch: Function, getState: any) => {
    const { name, surname } = value;
    const dataToSend = {
      firstName: name,
      lastName: surname,
    };
    dispatch({
      type: Utils.ActionName.BACKDROP,
      payload: { backdrop: true },
    });
    Utils.api.putApiCall(
      Utils.endPoints.profile,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          Utils.showAlert(1, data.message);
          dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: false },
          });
          setSubmitting(false);
          const { rememberMe } = getState().logInReducer;
          if (rememberMe) {
            localStorage.setItem(
              "userName",
              `${data.data.firstName} ${data.data.lastName}`
            );
          } else {
            sessionStorage.setItem(
              "userName",
              `${data.data.firstName} ${data.data.lastName}`
            );
          }

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
        } else {
          setSubmitting(false);
          dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: false },
          });
        }
      },
      (error: any) => {
        let { data } = error;
        dispatch({
          type: Utils.ActionName.BACKDROP,
          payload: { backdrop: false },
        });
        Utils.showAlert(2, data.message);
        setSubmitting(false);
      }
    );
  };
};
export const changePassword = (
  value: any,
  setSubmitting: any,
  resetForm: any,
  setOpen:Function
) => {
  return (dispatch: Function) => {
    const { currentpassword, newpassword } = value;

    dispatch({
      type: Utils.ActionName.BACKDROP,
      payload: { backdrop: true },
    });
    const dataToSend = {
      oldPassword: currentpassword,
      password: newpassword,
    };
    Utils.api.postApiCall(
      Utils.endPoints.changepassword,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          setSubmitting(false);
          // Utils.showAlert(1, data.message);
          dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: false },
          });
          resetForm();
          setOpen(true);
        } else {
          dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: false },
          });
        }
      },
      (error: any) => {
        let { data } = error;
        setSubmitting(false);
        Utils.showAlert(2, data.message);
        dispatch({
          type: Utils.ActionName.BACKDROP,
          payload: { backdrop: false },
        });
      }
    );
  };
};
