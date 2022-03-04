import Utils from "../../Utils";
export const allTasks = (week: string = "") => {
  return async (dispatch: any, getState: Function) => {
    const { page } = getState().allTaskReducer;
    let url = `${Utils.endPoints.getTasks}?pageNo=${page}&limit=20`;
    Utils.api.getApiCall(
      week !== ""
        ? `${Utils.endPoints.getTasks}?pageNo=${page}&limit=20&week=${Number(
            week
          )}`
        : url,
      ``,
      (respData: any) => {
        let { data } = respData;
        
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.ALL_TASK,
            payload: {
              allTask: data,
              totalCount: data.total,
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
export const checkList = (week:string = "") => {
  let url = `${Utils.endPoints.checklist}`
  return async (dispatch: any) => {
    Utils.api.getApiCall(week === "" ? url :
      `${Utils.endPoints.checklist}?week=${Number(week)}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.CHECKLIST,
            payload: {
              checklistData: data.data,
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
export const getOverdue = () => {
  return async (dispatch: any, getState: Function) => {
    const { page1 } = getState().overdueReducer;
    Utils.api.getApiCall(
      `${Utils.endPoints.overdue}?pageNo=${page1}&limit=20`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.OVERDUE,
            payload: {
              overdue: data,
              totalCount1: data.total,
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
export const taskDetails = (id: string) => {
  return async (dispatch: any) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.getTasks}/${id}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.TASK_DETAILS,
            payload: {
              details: data.data,
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
export const getWeeks = () => {
  return async (dispatch: any) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.weeks}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.GET_WEEK,
            payload: {
              weekData: data,
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
export const getSubjects = () => {
  return async (dispatch: any) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.subjects}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.GET_SUBJECTS,
            payload: {
              subjectData: data.data,
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
export const getCategories = (id: any) => {
  return async (dispatch: any) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.categories}?subjectId=${id}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.GET_CATEGORY,
            payload: {
              categoryData: data.data,
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
export const addTask = (
  title: string,
  categoryData: any,
  sessionId: string,
  weekData: any,
  subjectData: any,
  description: string,
  setSubmitting: any,
  resetForm: any,
  setOpen: Function,
  setOpen1: Function
) => {
  return (dispatch: Function) => {
    dispatch({
      type: Utils.ActionName.BACKDROP,
      payload: { backdrop: true },
    });
    const dataToSend = {
      title: title,
      description: description,
      category: categoryData.category,
      categoryId: categoryData._id,
      subject: subjectData.subject,
      subjectId: subjectData._id,
      sessionId: sessionId,
      weekDetails: {
        weekId: weekData._id,
        week: weekData.week,
        startDate: weekData.startDate,
        endDate: weekData.endDate,
      },
      link:""
    };
    Utils.api.postApiCall(
      Utils.endPoints.addTask,
      dataToSend,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 201) {
          setSubmitting(false);
          dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: false },
          });
          resetForm();
          setOpen(false)
          setOpen1(true);
          dispatch(allTasks(weekData.week));
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
export const startTask = (id: string) => {
  return (dispatch: Function) => {
    Utils.api.putApiCall(
      Utils.endPoints.startTask,
      {
        Id: id,
      },
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
        }
      },
      (error: any) => {
        // let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};
export const endTask = (id: string, time: any, type: string, status:string) => {
  return (dispatch: Function, getState: Function) => {
    const { allTask } = getState().allTaskReducer;
    const { overdue } = getState().overdueReducer;
    if (type === "alltask") {
      var updateTasks = allTask.data.map((task: any) => {
        if (task._id === id) {
          return { ...task, taskStatus: status, timerEndDate: time };
        } else return task;
      });
    } else {
      var updateTasks1 = overdue.data.map((task: any) => {
        if (task._id === id) {
          return { ...task, taskStatus: status };
        } else return task;
      });
    }

    Utils.api.putApiCall(
      Utils.endPoints.endTask,
      {
        Id: id,
        recordTime: time,
        status: status,
      },
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          if (type === "alltask") {
            dispatch({
              type: Utils.ActionName.ALL_TASK,
              payload: { allTask: { data: updateTasks } },
            });
           
          } else {
            dispatch({
              type: Utils.ActionName.OVERDUE,
              payload: { overdue: { data: updateTasks1 } },
            });
          }
          dispatch(checkList());
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
