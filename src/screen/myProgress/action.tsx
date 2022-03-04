import Utils from "../../Utils";
export const updateWelcomePopup = () => {
  return (dispatch: Function) => {
    Utils.api.putApiCall(
      Utils.endPoints.welcomePopup,
      {},
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
        }
      },
      (error: any) => {
        // let { data } = error;
      }
    );
  };
};
export const dahsboardData = () => {
  return (dispatch: Function, getState: Function) => {
    const { allWeeks } = getState().customRangeFilterReducer;
    const getUrl = () => {
      if (allWeeks === "All Weeks") {
        return `${Utils.endPoints.dashboard}`;
      } else return `${Utils.endPoints.dashboard}?week=${allWeeks}`;
    };
    Utils.api.getApiCall(
      getUrl(),
      "",
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 201) {
          const result = data.data.result;
          dispatch({
            type: Utils.ActionName.DASHBOARD_DATA,
            payload: { dashboardData: data },
          });
          dispatch({
            type: Utils.ActionName.PRACTICE_EXAM_RESULTS,
            payload: {
              percentageOne:
                result.exam_one.percentage === 0
                  ? ""
                  : result.exam_one.percentage,
              fileOne: result.exam_one.result,
              percentageTwo:
                result.exam_two.percentage === 0
                  ? ""
                  : result.exam_two.percentage,
              fileTwo: result.exam_two.result,
              percentageThree:
                result.exam_three.percentage === 0
                  ? ""
                  : result.exam_three.percentage,
              fileThree: result.exam_three.result,
              percentageFour:
                result.exam_four.percentage === 0
                  ? ""
                  : result.exam_four.percentage,
              fileFour: result.exam_four.result,
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
export const topicsDetails = () => {
  return (dispatch: Function) => {
    Utils.api.getApiCall(
      Utils.endPoints.topics,
      "",
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 201) {
          dispatch({
            type: Utils.ActionName.DASHBOARD_SUBJECT_DETAIL,
            payload: { topicDetails: data },
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
export const uploadExamResults = () => {
  return async (dispatch: Function, getState: Function) => {
    const {
      percentageOne,
      fileOne,
      percentageTwo,
      fileTwo,
      percentageThree,
      fileThree,
      percentageFour,
      fileFour,
    } = getState().practiceExamResultsReducer;
    const createExamObject = (value: string, percentageType: string) => {
      if (value === "") {
        return {
          percentage: percentageType === "" ? 0 : Number(percentageType),
        };
      } else {
        return {
          percentage: percentageType === "" ? 0 : Number(percentageType),
          result: value,
        };
      }
    };
    const dataToSend = {
      exam_one: createExamObject(fileOne, percentageOne),
      exam_two: createExamObject(fileTwo, percentageTwo),
      exam_three: createExamObject(fileThree, percentageThree),
      exam_four: createExamObject(fileFour, percentageFour),
    };
    Utils.api.putApiCall(
      Utils.endPoints.examResult,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          Utils.showAlert(1, data.message);
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
