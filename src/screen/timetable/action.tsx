import Utils from "../../Utils";
export const timeManagementApi = () => {
  return async (dispatch: any, getState: Function) => {
    Utils.api.getApiCall(Utils.endPoints.timeTable,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.TIME_MANAGEMENT_DATA,
            payload: {
                timeManagementData: data
            },
          });
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};