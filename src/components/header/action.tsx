import Utils from "../../Utils";
export const logOut = (history?: any) => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.endPoints.logout,
      {},
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          localStorage.clear();
          sessionStorage.clear();
          if (history) {
            history.push(Utils.Pathname.LOGIN);
          } else window.location.href = "/";
        } else Utils.showAlert(2, data.message);
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
