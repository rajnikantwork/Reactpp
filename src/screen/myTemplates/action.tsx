import Utils from "../../Utils";
import { ConstFunction } from "../../Utils/constFunctions";
//@ts-ignore
import { saveAs } from "file-saver";

export const templateData = (page: number = 1) => {
  return async (dispatch: any, getState: Function) => {
    const { allSubjects, allTopics, allWeeks } =
      getState().customRangeFilterReducer;
    const { search } = getState().resourcesSearchReducer;
    const { subjectData } = getState().addTodoSubjectReducer;
    const { categoryData } = getState().addTodoCategoryReducer;
    const { page } = getState().templatesDateReducer;
    const url: any = ConstFunction.getUrlForTemplate(
      search,
      allSubjects,
      allTopics,
      allWeeks,
      subjectData,
      categoryData,
      page
    );
    Utils.api.getApiCall(
      url,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.TOTAL_COUNT,
            payload: { totalCount: data.total },
          });
          dispatch({
            type: Utils.ActionName.GET_TEMPLATES,
            payload: {
              templatesData: data,
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
export const createNewTemplate = (
  week: string,
  subject: string,
  topic: string,
  title: string,
  template: string,
  setSubmitting: Function,
  setOpen5?: Function | any
) => {
  return async (dispatch: Function, getState: Function) => {
    setSubmitting(true);
    const { weekData } = getState().addTodoWeekReducer;
    const { subjectData } = getState().addTodoSubjectReducer;
    const { categoryData } = getState().addTodoCategoryReducer;
    let weekDetails = weekData.data.find(
      (value: any) => value.week === Number(week)
    );
    let subjectDetails = subjectData.find(
      (value: any) => value.subject === subject
    );
    let topicDetails = categoryData.find(
      (value: any) => value.category === topic
    );
    const dataToSend = {
      title: title,
      description: template,
      subjectId: subjectDetails._id,
      categoryId: topicDetails._id,
      weekDetails: {
        weekId: weekDetails._id,
        startDate: weekDetails.startDate,
        endDate: weekDetails.endDate,
        week: weekDetails.week,
      },
    };
    Utils.api.postApiCall(
      Utils.endPoints.createAndEditTemplate,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 201) {
          setSubmitting(false);
          // Utils.showAlert(1, data.message);
          dispatch(templateData());
          setOpen5(true);
        }
      },
      (error: any) => {
        setSubmitting(false);
        // let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};
export const deleteTemplate = (id: string) => {
  return async (dispatch: Function) => {
    Utils.api.deleteApiCall(
      `${Utils.endPoints.deleteTemplate}/${id}`,
      {},
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          Utils.showAlert(1, data.message);
          dispatch(templateData());
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const templateDetails = (
  id: string,
  setOpen: Function,
  getCategories: Function
) => {
  return async (dispatch: any, getState: Function) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.deleteTemplate}/${id}`,
      "",
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.CREATE_TEMPLATE_SELECT,
            payload: {
              selectedWeek: data.data.weekDetails.week.toString(),
              selectedSubject: data.data.subject.subject,
              selectedTopic: data.data.category.category,
            },
          });
          dispatch(getCategories(data.data.subject._id));
          dispatch({
            type: Utils.ActionName.TEMPLATE_DETAIL,
            payload: {
              singleTemplateData: data.data,
            },
          });
          setOpen(true);
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const editTemplate = (
  id: string,
  week: string,
  subject: string,
  topic: string,
  title: string,
  template: string,
  setSubmitting: Function
) => {
  return async (dispatch: Function, getState: Function) => {
    setSubmitting(true);
    const { weekData } = getState().addTodoWeekReducer;
    const { subjectData } = getState().addTodoSubjectReducer;
    const { categoryData } = getState().addTodoCategoryReducer;
    let weekDetails = weekData.data.find(
      (value: any) => value.week === Number(week)
    );
    let subjectDetails = subjectData.find(
      (value: any) => value.subject === subject
    );
    let topicDetails = categoryData.find(
      (value: any) => value.category === topic
    );
    const dataToSend = {
      Id: id,
      title: title,
      description: template,
      subjectId: subjectDetails._id,
      categoryId: topicDetails._id,
      weekDetails: {
        weekId: weekDetails._id,
        startDate: weekDetails.startDate,
        endDate: weekDetails.endDate,
        week: weekDetails.week,
      },
    };
    Utils.api.putApiCall(
      Utils.endPoints.createAndEditTemplate,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          setSubmitting(false);
          Utils.showAlert(1, data.message);
          dispatch(templateData());
        }
      },
      (error: any) => {
        setSubmitting(false);
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const exportTemplateData = (arrayOfId: Array<string>, type: string) => {
  return async (dispatch: any, getState: Function) => {
    let query = "";
    arrayOfId.forEach((value: string, index: number) => {
      if (index === 0) {
        query += `Id=${value}`;
      } else query += `&Id=${value}`;
    });
    let url = `${Utils.endPoints.exportTemplate}?${query}&type=${type.toLocaleLowerCase()}`;
    Utils.api.getApiCallOne(
      url,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (respData.status === 200) {
          if (type === "PDF") {
            const file = new File([data], `template.pdf`, {
              type: "text/pdf;charset=utf-8",
            });
            saveAs(file);
          } else if (type === "CSV") {
            const file = new File([data], `template.csv`, {
              type: "text/csv;charset=utf-8",
            });
            saveAs(file);
          } else if (type === "Excel") {
            const file = new File([data], `template.xlsx`, {
              type: "text/xlsx;charset=utf-8",
            });
            saveAs(file);
          }
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
