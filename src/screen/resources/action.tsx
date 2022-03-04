import Utils from "../../Utils";
export const resources = () => {
  return async (dispatch: any) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.resources}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.RESOURCE,
            payload: {
              seminars: data.data.seminars,
              examAnnouncements: data.data.examAnouncements,
              documents: data.data.documents,
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

export const resourcesList = (
  type: any = "document",
  save: any,
  query: any,
  reading: string,
  read: string,
  unread: string,
  page: any = 1
) => {
  return async (dispatch: any, getState: Function) => {
    const {page} = getState().resourcesViewMoreReducer
  
    var url = `${Utils.endPoints.resourcesList}?type=${type}&pageNo=${page}&limit=20`;
    if (
      read === "false" &&
      reading === "false" &&
      unread === "false" &&
      save === "false"
    ) {
      //No filter applied //
      if (query !== "") {
        // No filter with search //
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&pageNo=${page}&limit=20`;
      } else {
        // No filter no search //
        url = `${Utils.endPoints.resourcesList}?type=${type}&pageNo=${page}&limit=20`;
      }
    }
    //Either one of filter applied with saved applied too //
    if (read === "true" && save === "true") {
      //Read is applied with saved//
      if (query !== "") {
        //Read is applied with save and search //
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&readStatus=read&isSaved=true&pageNo=${page}&limit=20`;
      } else {
        //Read is applied with save but no search //
        url = `${Utils.endPoints.resourcesList}?type=${type}&readStatus=read&isSaved=true&pageNo=${page}&limit=20`;
      }
    } else if (reading === "true" && save === "true") {
      //Reading is applied with saved//
      if (query !== "") {
        //Reading is applied with saved and search//
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&readStatus=reading&isSaved=true&pageNo=${page}&limit=20`;
      } else {
        //Reading is applied with saved and no search//
        url = `${Utils.endPoints.resourcesList}?type=${type}&readStatus=reading&isSaved=true&pageNo=${page}&limit=20`;
      }
    } else if (unread === "true" && save === "true") {
      //Unread is applied with save  //
      if (query !== "") {
        //Unread is applied with save  and search//
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&readStatus=none&isSaved=true&pageNo=${page}&limit=20`;
      } else {
        //Unread is applied with save  but no search//
        url = `${Utils.endPoints.resourcesList}?type=${type}&readStatus=none&isSaved=true&pageNo=${page}&limit=20`;
      }
    } else if (
      save === "true" &&
      unread === "false" &&
      read === "false" &&
      reading === "false"
    ) {
      if (query !== "") {
        //Unread is applied with save  and search//
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&isSaved=true&pageNo=${page}&limit=20`;
      } else {
        //Unread is applied with save  but no search//
        url = `${Utils.endPoints.resourcesList}?type=${type}&isSaved=true&pageNo=${page}&limit=20`;
      }
    }
    //Either one of filter applied with saved applied too //
    if (read === "true" && save === "false") {
      //Read is applied with saved//
      if (query !== "") {
        //Read is applied with save and search //
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&readStatus=read&pageNo=${page}&limit=20`;
      } else {
        //Read is applied with save but no search //
        url = `${Utils.endPoints.resourcesList}?type=${type}&readStatus=read&pageNo=${page}&limit=20`;
      }
    } else if (reading === "true" && save === "false") {
      //Reading is applied with saved//
      if (query !== "") {
        //Reading is applied with saved and search//
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&readStatus=reading&pageNo=${page}&limit=20`;
      } else {
        //Reading is applied with saved and no search//
        url = `${Utils.endPoints.resourcesList}?type=${type}&readStatus=reading&pageNo=${page}&limit=20`;
      }
    } else if (unread === "true" && save === "false") {
      //Unread is applied with save  //
      if (query !== "") {
        //Unread is applied with save  and search//
        url = `${Utils.endPoints.resourcesList}?search=${query}&type=${type}&readStatus=none&pageNo=${page}&limit=20`;
      } else {
        //Unread is applied with save  but no search//
        url = `${Utils.endPoints.resourcesList}?type=${type}&readStatus=none&pageNo=${page}&limit=20`;
      }
    }
    Utils.api.getApiCall(
      url,
      ``,
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.RESOURCES_VIEW_ALL,
            payload: {
              data: { ...data.data },
            },
          });
          dispatch({
            type:Utils.ActionName.TOTAL_COUNT,
            payload:{totalCount:data.data.total}
          })
        }
      },
      (error: any) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const resourcesDetails = (id: string) => {
  return async (dispatch: any) => {
    Utils.api.getApiCall(
      `${Utils.endPoints.resources}/${id}`,
      ``,
      (respData: any) => {
        let { data } = respData;
        dispatch({
          type: Utils.ActionName.BACKDROP,
          payload: { backdrop: true },
        });
        if (data.statusCode === 200) {
          dispatch({
            type: Utils.ActionName.RESOURCES_DETAILS,
            payload: {
              data: data.data,
            },
          });
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
          payload: { backdrop: true },
        });
      }
    );
  };
};
const createSaveAndUnsaveData = (actionType: number, data: any, id: any) => {
  return data.map((value: any) => {
    if (value._id === id) {
      return { ...value, isSaved: actionType };
    } else return value;
  });
};
const updateSaveAndUnsaveRealTime = (
  dispatch: any,
  type: string,
  documents: any,
  updatedDocuments: any,
  updatedDocumentsReading: any,
  updatedDocumentsRead: any,
  seminars: any,
  updatedSeminars: any,
  updatedSeminarsRead: any,
  examAnnouncements: any,
  updatedExamAnnouncements: any,
  updatedExamAnnouncementsReading: any,
  updatedExamAnnouncementsRead: any
) => {
  if (type === "document") {
    dispatch({
      type: Utils.ActionName.RESOURCE,
      payload: {
        documents: {
          ...documents,
          all: updatedDocuments,
          new: updatedDocuments,
          viewing: updatedDocumentsReading ? updatedDocumentsReading : [],
          viewed: updatedDocumentsRead ? updatedDocumentsRead : [],
        },
      },
    });
  } else if (type === "seminars") {
    dispatch({
      type: Utils.ActionName.RESOURCE,
      payload: {
        seminars: {
          ...seminars,
          all: updatedSeminars,
          new: updatedSeminars,
          viewed: updatedSeminarsRead ? updatedSeminarsRead : [],
        },
      },
    });
  } else if (type === "exam announcement") {
    dispatch({
      type: Utils.ActionName.RESOURCE,
      payload: {
        examAnnouncements: {
          ...examAnnouncements,
          all: updatedExamAnnouncements,
          new: updatedExamAnnouncements,
          viewed: updatedExamAnnouncementsRead
            ? updatedExamAnnouncementsRead
            : [],
          viewing: updatedExamAnnouncementsReading
            ? updatedExamAnnouncementsReading
            : [],
        },
      },
    });
  }
};
export const saveResources = (
  id: any,
  type: any,
  readStatus: any,
  dataType: string
) => {
  return (dispatch: Function, getState: Function) => {
    let { seminars, documents, examAnnouncements } = getState().resourceReducer;
    const { data } = getState().resourcesViewMoreReducer;
    if (dataType !== "resources") {
      var allDataUpdated = createSaveAndUnsaveData(1, data.data, id);
    } else {
      if (type === "document") {
        var updatedDocuments = createSaveAndUnsaveData(1, documents.all, id);
        if (readStatus === "read") {
          var updatedDocumentsRead = createSaveAndUnsaveData(
            1,
            documents.viewed,
            id
          );
        } else if (readStatus === "reading") {
          var updatedDocumentsReading = createSaveAndUnsaveData(
            1,
            documents.viewing,
            id
          );
        }
      } else if (type === "seminars") {
        var updatedSeminars = createSaveAndUnsaveData(1, seminars.all, id);
        if (readStatus === "read") {
          var updatedSeminarsRead = createSaveAndUnsaveData(
            1,
            seminars.viewed,
            id
          );
        }
        // else if (readStatus === "reading") {
        //   var updatedSeminarsReading = createSaveAndUnsaveData(
        //     1,
        //     seminars.viewing,
        //     id
        //   );
        // }
      } else if (type === "exam announcement") {
        var updatedExamAnnouncements = createSaveAndUnsaveData(
          1,
          examAnnouncements.all,
          id
        );
        if (readStatus === "read") {
          var updatedExamAnnouncementsRead = createSaveAndUnsaveData(
            1,
            examAnnouncements.viewed,
            id
          );
        } else if (readStatus === "reading") {
          var updatedExamAnnouncementsReading = createSaveAndUnsaveData(
            1,
            examAnnouncements.viewing,
            id
          );
        }
      }
    }

    Utils.api.putApiCall(
      `${Utils.endPoints.savecourse}/${id}`,
      {},
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 201) {
          if (dataType !== "resources") {
            dispatch({
              type: Utils.ActionName.RESOURCES_VIEW_ALL,
              payload: { data: { data: allDataUpdated } },
            });
          } else {
            updateSaveAndUnsaveRealTime(
              dispatch,
              type,
              documents,
              updatedDocuments,
              updatedDocumentsReading,
              updatedDocumentsRead,
              seminars,
              updatedSeminars,
              updatedSeminarsRead,
              examAnnouncements,
              updatedExamAnnouncements,
              updatedExamAnnouncementsReading,
              updatedExamAnnouncementsRead
            );
          }

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
export const unSaveResources = (
  id: any,
  type: any,
  readStatus: any,
  dataType: string
) => {
  return (dispatch: Function, getState: Function) => {
    let { seminars, documents, examAnnouncements } = getState().resourceReducer;
    const { data } = getState().resourcesViewMoreReducer;
    if (dataType !== "resources") {
      var allDataUpdated = createSaveAndUnsaveData(0, data.data, id);
    } else {
      if (type === "document") {
        var updatedDocuments = createSaveAndUnsaveData(0, documents.all, id);
        if (readStatus === "read") {
          var updatedDocumentsRead = createSaveAndUnsaveData(
            0,
            documents.viewed,
            id
          );
        } else if (readStatus === "reading") {
          var updatedDocumentsReading = createSaveAndUnsaveData(
            0,
            documents.viewing,
            id
          );
        }
      } else if (type === "seminars") {
        var updatedSeminars = createSaveAndUnsaveData(0, seminars.all, id);
        if (readStatus === "read") {
          var updatedSeminarsRead = createSaveAndUnsaveData(
            0,
            seminars.viewed,
            id
          );
        }
        // else if (readStatus === "reading") {
        //   var updatedSeminarsReading = createSaveAndUnsaveData(
        //     0,
        //     seminars.viewing,
        //     id
        //   );
        // }
      } else if (type === "exam announcement") {
        var updatedExamAnnouncements = createSaveAndUnsaveData(
          0,
          examAnnouncements.all,
          id
        );
        if (readStatus === "read") {
          var updatedExamAnnouncementsRead = createSaveAndUnsaveData(
            0,
            examAnnouncements.viewed,
            id
          );
        } else if (readStatus === "reading") {
          var updatedExamAnnouncementsReading = createSaveAndUnsaveData(
            0,
            examAnnouncements.viewing,
            id
          );
        }
      }
    }
    Utils.api.putApiCall(
      `${Utils.endPoints.unsavecourse}/${id}`,
      {},
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 201) {
          if (dataType !== "resources") {
            dispatch({
              type: Utils.ActionName.RESOURCES_VIEW_ALL,
              payload: { data: { data: allDataUpdated } },
            });
          } else {
            updateSaveAndUnsaveRealTime(
              dispatch,
              type,
              documents,
              updatedDocuments,
              updatedDocumentsReading,
              updatedDocumentsRead,
              seminars,
              updatedSeminars,
              updatedSeminarsRead,
              examAnnouncements,
              updatedExamAnnouncements,
              updatedExamAnnouncementsReading,
              updatedExamAnnouncementsRead
            );
          }
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
export const markSeminarAsRead = (id: any, type: string, dataType: string) => {
  return (dispatch: Function, getState: Function) => {
    let { seminars } = getState().resourceReducer;
    let { data } = getState().resourcesViewMoreReducer;
    if (type === "seminars") {
      if (dataType === "resources") {
        var seminarData = seminars.all.find((value: any) => value._id === id);
      } else if (dataType === "all") {
        seminarData = data.data.find((value: any) => value._id === id);
        var updatedseminarData = data.data.map((value: any) => {
          if (value._id === id) return { ...value, readStatus: "read" };
          else return value;
        });
      }
    }
    if (seminarData.readStatus === "none") {
      const dataToSend = {
        Id: id,
      };
      Utils.api.postApiCall(
        `${Utils.endPoints.view}`,
        dataToSend,
        (respData: any) => {
          let { data } = respData;
          if (data.statusCode === 200) {
            if (
              type === "seminars" &&
              seminarData.readStatus === "none" &&
              dataType === "resources"
            ) {
              seminarData.readStatus = "read";
              dispatch({
                type: Utils.ActionName.RESOURCE,
                payload: {
                  ...seminars,
                  viewed: seminars.viewed.push(seminarData),
                },
              });
            } else if (
              dataType === "all" &&
              seminarData.readStatus === "none"
            ) {
              dispatch({
                type: Utils.ActionName.RESOURCES_VIEW_ALL,
                payload: { data: { data: updatedseminarData } },
              });
            }

            // Utils.showAlert(1, data.message);
          } else {
            // Utils.showAlert(2, data.message);
          }
        },
        (error: any) => {
          let { data } = error;
          Utils.showAlert(2, data.message);
        }
      );
    }
  };
};
export const markAsRead = (id: any, type: any, dataType: string) => {
  return (dispatch: Function, getState: Function) => {
    let { documents, examAnnouncements } = getState().resourceReducer;
    let { data } = getState().resourcesViewMoreReducer;
    if (type === "document") {
      if (dataType === "resources") {
        var readingDocument = documents.all.find(
          (value: any) => value._id === id
        );
        var currentReading = documents.viewing.filter(
          (value: any) => value._id !== readingDocument._id
        );
      } else {
        var updatedData = data.data.map((value: any) => {
          if (id === value._id) return { ...value, readStatus: "read" };
          else return value;
        });
      }
    } else if (type === "exam announcement") {
      if (dataType === "resources") {
        var readingExamAnnouncements = examAnnouncements.all.find(
          (value: any) => value._id === id
        );
        var currentExamAnnouncementsReading = examAnnouncements.viewing.filter(
          (value: any) => value._id !== readingExamAnnouncements._id
        );
      } else {
        var updatedDataOne = data.data.map((value: any) => {
          if (id === value._id) return { ...value, readStatus: "read" };
          else return value;
        });
      }
    }
    Utils.api.putApiCall(
      `${Utils.endPoints.markAsRead}/${id}`,
      {},
      (respData: any) => {
        let { data } = respData;
        if (data.statusCode === 201) {
          if (type === "document") {
            if (dataType === "resources") {
              readingDocument.readStatus = "read";
              dispatch({
                type: Utils.ActionName.RESOURCE,
                payload: {
                  documents: {
                    ...documents,
                    viewed: [...documents.viewed, readingDocument],
                    viewing: currentReading.length > 0 ? currentReading : [],
                  },
                },
              });
            } else {
              dispatch({
                type: Utils.ActionName.RESOURCES_VIEW_ALL,
                dispatch: { data: { data: updatedData } },
              });
            }
          } else if (type === "exam announcement") {
            if (dataType === "resources") {
              readingExamAnnouncements.readStatus = "read";
              dispatch({
                type: Utils.ActionName.RESOURCE,
                payload: {
                  examAnnouncements: {
                    ...examAnnouncements,
                    viewed: [
                      ...examAnnouncements.viewed,
                      readingExamAnnouncements,
                    ],
                    viewing:
                      currentExamAnnouncementsReading.length > 0
                        ? currentExamAnnouncementsReading
                        : [],
                  },
                },
              });
            } else {
              dispatch({
                type: Utils.ActionName.RESOURCES_VIEW_ALL,
                dispatch: { data: { data: updatedDataOne } },
              });
            }
          }

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
export const updateReading = (cardData: any) => {
  return (dispatch: Function, getState: Function) => {
    let { documents, examAnnouncements } = getState().resourceReducer;
    if (cardData.type === "document" && cardData.readStatus === "none") {
      cardData.readStatus = "read";
      dispatch({
        type: Utils.ActionName.RESOURCE,
        payload: {
          documents: {
            ...documents,
            viewing: [...documents.viewing, cardData],
          },
        },
      });
    } else if (
      cardData.type === "exam announcement" &&
      cardData.readStatus === "none"
    ) {
      cardData.readStatus = "read";
      dispatch({
        type: Utils.ActionName.RESOURCE,
        payload: {
          examAnnouncements: {
            ...examAnnouncements,
            viewing: [...examAnnouncements.viewing, cardData],
          },
        },
      });
    }
  };
};
