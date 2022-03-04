import Utils from "../../Utils";
import { ConstFunction } from "../../Utils/constFunctions";
export const questionList = (week:number = 0, page:number = 1) => {
  return async (dispatch: any, getState: Function) => {
    const { allSubjects, allTopics, allCategory, allSeries, answered } =
      getState().customRangeFilterReducer;
    const { subjectData } = getState().addTodoSubjectReducer;
    const { categoryData } = getState().addTodoCategoryReducer;
    const { allSeriesData } = getState().allSeriesDropdownReducer;
    const url: any = ConstFunction.getUrl(
      allSubjects,
      allTopics,
      allCategory,
      allSeries,
      answered,
      subjectData,
      categoryData,
      allSeriesData,
      week,
      page
    );
    Utils.api.getApiCall(
      url,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type:Utils.ActionName.TOTAL_COUNT,
            payload:{totalCount:data.data.total}
          })
          dispatch({
            type: Utils.ActionName.PRACTICE_QUESTION,
            payload: {
              practice: data.data,
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

export const seriesDropdownData = (
  subjectId: string,
  categoryId: string = ""
) => {
  return async (dispatch: any) => {
    let url = "";
    if (categoryId === "") {
      url = `${Utils.endPoints.series}?subjectId=${subjectId}`;
    } else {
      url = `${Utils.endPoints.series}?subjectId=${subjectId}&categoryId=${categoryId}`;
    }
    Utils.api.getApiCall(
      url,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.ALL_SERIES_DROPDOWN,
            payload: {
              allSeriesData: data.data,
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
