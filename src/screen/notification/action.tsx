import Utils from "../../Utils";

export const notificationDataApi = (page: number = 1) => {
  return async (dispatch: any, getState: Function) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.notification}?pageNo=${page}&limit=20`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type:Utils.ActionName.TOTAL_COUNT,
            payload:{totalCount:data.data.total}
          })
          dispatch({
            type: Utils.ActionName.NOTIFICATION_DATA,
            payload: { notificationData: data.data },
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
