import Utils from "../../../Utils";
import api from "../../../Utils/api";
import showAlert from "../../../Utils/alert";
import endPoint from "../../../Utils/endPoints";
import { NoteModal, QuestionDataModal, SelfAssessmentItem } from "../../../modal";

export const getQuestionDetail = (questionId: string, callBack: Function) => {
    return async (dispatch: any) => {
        dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: true },
          });
        let url = `${endPoint.question}/${questionId}`;
    
        api.getApiCall(
            url,
            ``,
            (respData: any) => {
                let { data: { statusCode, data: innerData } } = respData;
                if (statusCode === 200) {
                    callBack(innerData);
                    dispatch({
                        type: Utils.ActionName.BACKDROP,
                        payload: { backdrop: false },
                      });
                } else {
                    showAlert(2);
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
                showAlert(2, data.message);
            }
        );
    };
};


export const submitAnswer = (questionData: QuestionDataModal, seconds:any, value: string, week:any,callBack: Function) => {
    return (dispatch: Function, getState: Function) => {
        dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { submitAnswerbackdrop: true },
        });
        const { _id: questionId, subjectId, categoryId, type, seriesId } = questionData;
        const isEssay = type === Utils.constants.QuestionType.ESSAY;
        const isAnswered = value.length > 0;
        const {enable} = getState().practiceQuestionTimeLimitReducer
        const dataToSend = {
            type,
            seriesId,
            subjectId,
            isAnswered,
            categoryId,
            week:week,
            questionId,
            recordTime: enable ? seconds : 0,
            ...(isAnswered && isEssay && { answere: value }),
            ...(isAnswered && !isEssay && { options: [{ option: value }] })
        };

        Utils.api.postApiCall(
            Utils.endPoints.submitAnswer,
            dataToSend,
            (respData: any) => {
                let { data } = respData;
            
                if (data.statusCode === 201) {
                    Utils.showAlert(1, data.message);
                    dispatch({
                        type: Utils.ActionName.BACKDROP,
                        payload: { backdrop: false },
                    });
                    callBack(questionId);
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

export const selfMark = (questionData: QuestionDataModal, notes: Array<NoteModal>, assessmentOptions: Array<SelfAssessmentItem>, callBack: Function) => {
  return (dispatch: Function, getState: Function) => {
      const { practiceQuestionDetailReducer } = getState();

      dispatch({
          type: Utils.ActionName.BACKDROP,
          payload: { submitAnswerbackdrop: true },
      });
      const { _id: questionId, type, userAnsweres, lastAttempt } = questionData;

      let selfMarkAnswere = "";
      let Id = "";
      let find = userAnsweres.find((a) => a.created === lastAttempt);
      if (find) {
        selfMarkAnswere = find.answere;
        Id = find._id;
      }

      const dataToSend = {
        Id,
        questionId,
        selfMarkAnswere,
        marks: assessmentOptions.reduce((prev, { key, value, mark }) => {
            
          prev[key] = parseFloat((parseFloat(value) / 100 * mark).toFixed(2));

          return prev;
        }, {} as { [index: string]: number }),
        type,
        notes: notes.map(({ createdAt, text }) => ({ createdAt, text })),
      }
      Utils.api.postApiCall(
          Utils.endPoints.selfMark,
          dataToSend,
          (respData: any) => {
              let { data } = respData;
              if (data.statusCode === 201) {
                  const updatedIndex = practiceQuestionDetailReducer.data.userAnsweres.findIndex(({ _id }: { _id: string}) => _id === Id);
                  if (updatedIndex !== -1) {
                    practiceQuestionDetailReducer.data.userAnsweres[updatedIndex] = data.data;
                    practiceQuestionDetailReducer.data.lastAttempt = data.data.created;
                  }

                  Utils.showAlert(1, data.message);
                  dispatch({
                      type: Utils.ActionName.BACKDROP,
                      payload: { backdrop: false },
                  });
                  dispatch({
                      type: Utils.ActionName.PRACTICE_ANSWER_SCORE,
                      payload: practiceQuestionDetailReducer,
                  });
                  callBack(data.data);
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

export const flagQuestion = (Id: string, callBack: Function) => {
    return (dispatch: Function) => {
        dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: true },
        });

        Utils.api.postApiCall(
            Utils.endPoints.flagQuestion,
            { Id },
            (respData: any) => {
                let { data } = respData;
                if (data.statusCode === 201) {
                    Utils.showAlert(1, data.message);
                    dispatch({
                        type: Utils.ActionName.BACKDROP,
                        payload: { backdrop: false },
                    });
                    callBack(Id);
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

export const removeQuestonFlag = (Id: string, callBack: Function) => {
    return (dispatch: Function) => {
        dispatch({
            type: Utils.ActionName.BACKDROP,
            payload: { backdrop: true },
        });

        Utils.api.patchApiCall(
            Utils.endPoints.flagQuestion,
            { Id },
            (respData: any) => {
                let { data } = respData;
                console.log("unflagQuestionn resp", respData);
                if (data.statusCode === 201) {
                    Utils.showAlert(1, data.message);
                    dispatch({
                        type: Utils.ActionName.BACKDROP,
                        payload: { backdrop: false },
                    });
                    callBack(Id);
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
export const selftMarkingTutorial = () => {
    return (dispatch: Function) => {
      Utils.api.putApiCall(
        Utils.endPoints.markingTutoial,
        {},
        (respData: any) => {
          let { data } = respData;
        
          if (data.statusCode === 200) {
            localStorage.setItem("selfAssesmentViewed", "true");
          }
        },
        (error: any) => {
          // let { data } = error;
        }
      );
    };
  };