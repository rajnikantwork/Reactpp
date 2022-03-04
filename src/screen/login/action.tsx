import Utils from "../../Utils";
export const login = (
  value: any,
  history: any,
  setSubmitting: Function,
  rememberMe: boolean
) => {
  return (dispatch: any) => {
    const { email, password } = value;
    const dataToSend = {
      email: email,
      password: password,
      deviceId: "string",
      deviceToken: "string",
    };
    Utils.api.loginApiCall(
      Utils.endPoints.login,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          localStorage.setItem("sessionId", data.data.data.sessionId)
          // localStorage.setItem("selfAssesmentViewed", 'false')
           localStorage.setItem("selfAssesmentViewed", `${data.data.data.isTutorialSeen}`)
          if (rememberMe) {
            localStorage.setItem("access_token", `${data.data.accessToken}`);
            localStorage.setItem("refresh-token", `${data.data.refreshToken}`);
            localStorage.setItem(
              "userName",
              `${data.data.data.firstName} ${data.data.data.lastName}`
            );
            localStorage.setItem(
              "iswelcome-popup",
              `${data.data.data.isWelcomePopup}`
            );
            localStorage.setItem("userEmail", `${data.data.data.email}`);
            localStorage.setItem(
              "filter",
              JSON.stringify({
                'saved': 'false',
                'read': 'false',
                'unread': 'false',
                'reading': 'false',
              })
            );
            localStorage.setItem("rememberMe", "yes")
           
          } else {
            sessionStorage.setItem("access_token", `${data.data.accessToken}`);
            sessionStorage.setItem(
              "refresh-token",
              `${data.data.refreshToken}`
            );
            sessionStorage.setItem(
              "userName",
              `${data.data.data.firstName} ${data.data.data.lastName}`
            );
            sessionStorage.setItem(
              "iswelcome-popup",
              `${data.data.data.isWelcomePopup}`
            );
            sessionStorage.setItem("userEmail", `${data.data.data.email}`);
            sessionStorage.setItem(
              "filter",
              JSON.stringify({
                'saved': 'false',
                'read': 'false',
                'unread': 'false',
                'reading': 'false',
              })
            );
            localStorage.setItem("rememberMe", "no")
          }

          history.push(Utils.Pathname.MY_PROGRESS);
        } else setSubmitting(false);
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
        setSubmitting(false);
      }
    );
  };
};
export const forgotPassword = (
  value: string,
  history: any,
  setLoading: Function
) => {
  return (dispatch: Function) => {
    const dataToSend = {
      email: value,
    };
    Utils.api.loginApiCall(
      Utils.endPoints.forgotPassword,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          setLoading(false);
          Utils.showAlert(1, data.message);
        }
      },
      (error: any) => {
        let { data } = error;
        setLoading(false);
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const resetPassword = (
  value: string,
  history: any,
  setLoading: Function
) => {
  return (dispatch: Function) => {
    const dataToSend = {
      password: value,
    };
    console.log(history.location.search.split("=")[1]);
    const query = history.location.search.split("=")[1];
    Utils.api.loginApiCall(
      `${Utils.endPoints.resetpassword}?accessToken=${query}`,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
      
        if (data.statusCode === 200) {
          setLoading(false);
          Utils.showAlert(1, data.message);
          history.push(Utils.Pathname.LOGIN);
        }
      },
      (error: any) => {
        let { data } = error;
        setLoading(false);
        Utils.showAlert(2, data.message);
      }
    );
  };
};
