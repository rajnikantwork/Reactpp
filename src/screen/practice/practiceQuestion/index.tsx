import Utils from "../../../Utils";
import { useHistory } from "react-router";
import LocalImages from "../../../Utils/images";
import MCQQuestionView from "./mcqQuestionView";
import constants from "../../../Utils/constants";
import { QuestionDataModal } from "../../../modal";
import TypingQuestionView from "./typingQuestionView";
import React, { createRef, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ConfirmationDialog from "../../../components/confirmationDialog";
import PracticeQuestionSkl from "./practiceQuestionSkl";
import TimeLimit from "../timeLimit";
import differenceInSeconds from "date-fns/differenceInSeconds";
import { useSelector, useDispatch } from "react-redux";
import { ReducersModal } from "../../../modal/index";
import TransitionsModal from "../../../components/popupModal/index";
import UseTemplateModal from "./useTemplateModal";
import Typography from "@material-ui/core/Typography";
import IsTimeOverModal from "./isTimeOverModal";
import {
  getQuestionDetail,
  submitAnswer,
  selfMark,
  flagQuestion,
  removeQuestonFlag,
} from "./action";
import { getSubjects, getWeeks } from "../../studyPlanner/action";
import SelfAssesment from "./selfAssesment";
import SelfAssesmentTutorial from "./selfAssesment/selfAssesmentTutorial";
import CreateTemplate from "./createTemplate";
import StopWatch from "./stopWatch";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "grid",
    },
    backBtnCon: {
      height: "25px",
      width: "255px",
      display: "flex",
      cursor: "pointer",
      marginBottom: "2px",
      alignItems: "center",
      "& span": {
        fontSize: "16px",
      },
    },
    headerCon: {
      display: "flex",
      // alignItems: "center",
      justifyContent: "space-between",
    },
    heading: {
      color: "#030c29",
      fontSize: "33.7px",
      fontWeight: "bold",
    },
    flagQuesCon: {
      height: "34px",
      display: "flex",
      cursor: "pointer",
      padding: "0 12px",
      borderRadius: "4px",
      marginRight: "36px",
      alignItems: "center",
      justifyContent: "center",
      "& span": {
        fontWeight: 500,
        fontSize: "14px",
        marginLeft: "9px",
      },
    },
    timeLimit: {
      display: "flex",
      alignItems: "center",
    },
    timeContainer: {
      display: "flex",
      flexDirection: "column",
    },
    info: {
      marginTop: -2,
      marginRight: 10,
      "& figure": {
        margin: 0,
        width: 15,
        height: 15,
      },
    },
    questionPagCon: {
      height: "145px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    questionPagInnerCon: {
      height: "69px",
      display: "flex",
      justifyContent: "space-between",
    },
    quesHeading: {
      opacity: 0.5,
      color: "#000000",
      fontFamily: "18x",
      marginTop: "19px",
      fontWeight: "bold",
    },
    paginationCon: {
      width: 500,
      display: "flex",
      overflowX: "scroll",
      marginBottom: 10,
      "& #paginationCon": {
        display: "flex",
      },
      "&::-webkit-scrollbar": {
        width: "10px",
        height: "8px",
        borderRadius: "30px",
        cursor: "grab",
        // [theme.breakpoints.down("sm")]: {
        //   width: "0",
        // },
      },
      "&::-webkit-scrollbar-track": {
        background: " #efefef !important",
        borderRadius: "20px !important",
      },
      "&::-webkit-scrollbar-thumb": {
        width: "10px",
        height: "8px",
        background: `${theme.palette.primary.main} !important`,
        border: "1.7px solid #e9f5fb",
        borderRadius: "15px !important",
      },
    },
    pageCon: {
      width: "40px",
      height: "40px",
      display: "grid",
      cursor: "pointer",
      marginLeft: "40px",
      borderRadius: "40px",
      placeItems: "center",
      "& span": {
        fontSize: "20px",
        color: "#000000",
      },
    },
    quesTitleDescCon: {
      height: "auto",
      display: "grid",
      borderRadius: "10px",
      backgroundColor: "#fff",
      padding: "23px 99px 40px 30px",
    },
    quesTitle: {
      fontSize: "20px",
      color: "#000000",
      fontWeight: "bold",
    },
    quesDesc: {
      fontSize: "16px",
      color: "#000000",
      marginTop: "5px",
      fontWeight: "normal",
    },
    questionNum: {
      fontSize: "18px",
      color: "#000000",
      margin: "40px auto 18px auto",
    },
    footerCon: {
      display: "flex",
      justifyContent: "flex-end",
    },
    footerBtnCon: {
      height: "52px",
      width: "140px",
      display: "grid",
      marginTop: "43px",
      cursor: "pointer",
      borderRadius: "5px",
      placeItems: "center",
      backgroundColor: "#ebeff2",
      "& span": {
        fontWeight: 500,
        fontSize: "20px",
        color: "#ffffff",
      },
    },
    modalStyle: {
      height: "85%",
      minWidth: "93vw",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "10px",
        borderRadius: "30px",
        cursor: "grab",
        // [theme.breakpoints.down("sm")]: {
        //   width: "0",
        // },
      },
      "&::-webkit-scrollbar-track": {
        background: " #efefef !important",
        borderRadius: "20px !important",
      },
      "&::-webkit-scrollbar-thumb": {
        width: "10px",
        background: `${theme.palette.primary.main} !important`,
        border: "1.7px solid #e9f5fb",
        borderRadius: "15px !important",
      },
    },
  })
);

interface Props {
  match: any;
}

export default function PracticeQuestion({ match }: Props) {
  const classes = styles();
  const history = useHistory();
  const dispatch = useDispatch();
  const mcqRef: any = createRef();
  const alertRef: any = createRef();
  const typingRef: any = createRef();
  const flagAlertRef: any = createRef();
  const selfAssesmentRef: any = createRef();
  const [open, setOpen] = React.useState(false);
  const [isTimeOver, setIsTimeOver] = React.useState(false);
  // const [selfAssesmentOpen, setSelfAssesmentOpen] = React.useState(false);
  const [useSelectedTempalte, setUseSelectedTemplate] = React.useState<any>({});
  const {
    params: { questionId },
  } = match;
  //   const [data, setData] = useState<QuestionDataModal | null>(null);
  const [startTi, setStartTime] = useState(0);
  const { data } = useSelector(
    (state: ReducersModal) => state.practiceQuestionDetailReducer
  );
  const { selfAssesmentOpen } = useSelector(
    (state: ReducersModal) => state.selfAssesmentReducer
  );
  const [createTemplateModal, setCreateTemplateModal] = useState(false);

  useEffect(() => {
    dispatch(getWeeks());
    dispatch(getSubjects());
  }, [dispatch]);

  let endTime = 0;
  useEffect(() => {
    setUseSelectedTemplate({});
    let date = new Date();
    setStartTime(date.getTime());
    dispatch({
      type: Utils.ActionName.PRACTICE_QUESTION_DETAILS,
      payload: { data: null },
    });
    // setData(null);
    dispatch(
      getQuestionDetail(questionId, (quesData: QuestionDataModal) => {
        dispatch({
          type: Utils.ActionName.PRACTICE_QUESTION_DETAILS,
          payload: { data: quesData },
        });

        // setData(quesData);
        // setLoading(false);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  if (data === null) {
    return <PracticeQuestionSkl />;
  }

  const {
    allQuestions,
    _id,
    weekDetails: { week },
    subject,
    question,
    type,
    isFlag,
  } = data;
  const isEssay = type === constants.QuestionType.ESSAY;
  var questionNum = 1;
  if (allQuestions && allQuestions.length > 0) {
    questionNum = allQuestions.findIndex((a: any) => a._id === _id) + 1;
  }
  console.log(allQuestions);
  const onContinue = () => {
    if (isEssay) {
      if (typingRef && typingRef.current) {
        typingRef.current.submitQuestion();
      }
    } else {
      if (mcqRef && mcqRef.current) {
        mcqRef.current.submitQuestion();
      }
    }
  };

  const handleAfterAction = (id: string) => {
    if (questionNum < allQuestions.length) {
      //go to next question
      let index = allQuestions.findIndex((a: any) => a._id === id);
      history.push(
        `${Utils.Pathname.PRACTICE_QUESTION.replace(
          ":questionId",
          allQuestions[index + 1]["_id"]
        )}`
      );
    } else {
      history.push("/practice");
    }
  };
  const updateQuestionState = (id: string, updatedValue: string) => {
    let newData = Object.assign({}, data);
    newData.allQuestions.forEach((element: any) => {
      if (element._id === id) {
        element.questionStatus = updatedValue;
      }
    });
    dispatch({
      type: Utils.ActionName.PRACTICE_QUESTION_DETAILS,
      payload: { data: Object.assign({}, newData) },
    });
    // setData(Object.assign({}, newData));
    handleAfterAction(id);
  };

  const submitAnswerFun = (value: string) => {
    let date = new Date();
    endTime = date.getTime();
    let second = differenceInSeconds(new Date(endTime), new Date(startTi));
    console.log(second, "second");
    if (value.trim().length === 0) {
      //if answer not given alert user
      if (alertRef && alertRef.current) {
        alertRef.current.openAlert();
      }
    } else {
      //submit answer to database
      dispatch(
        submitAnswer(data, second, value, week, (id: string) =>
          updateQuestionState(id, constants.QuestionStatus.ATTEMPT)
        )
      );
    }
  };

  const submitAnyWay = () => {
    let date = new Date();
    endTime = date.getTime();
    let second = differenceInSeconds(new Date(endTime), new Date(startTi));
    dispatch(
      submitAnswer(data, second, "", week, (id: string) =>
        updateQuestionState(id, constants.QuestionStatus.SKIPED)
      )
    );
  };

  const openFlagAlert = () => {
    if (flagAlertRef && flagAlertRef.current) {
      flagAlertRef.current.openAlert();
    }
  };

  const handleSaveTemplateClick = () => {
    // dispatch({
    //   type: Utils.ActionName.SELF_ASSESSMENT,
    //   payload: { selfAssesmentOpen: false },
    // });
    setCreateTemplateModal(true);
  };

  const markQuestionAsFlag = (id: string, updatedValue: number) => {
    let newData = Object.assign({}, data);
    newData.isFlag = updatedValue;
    newData.allQuestions.forEach((element: any) => {
      if (element._id === id) {
        element.isFlag = updatedValue;
      }
    });
    dispatch({
      type: Utils.ActionName.PRACTICE_QUESTION_DETAILS,
      payload: { data: Object.assign({}, newData) },
    });
    // setData(Object.assign({}, newData));
    handleAfterAction(id);
  };

  const backBtnCon = () => {
    return (
      <div
        className={classes.backBtnCon}
        onClick={() => history.push("/practice")}
      >
        <Typography>{"< Back to all questions"}</Typography>
      </div>
    );
  };

  const flagQuestionBtn = () => {
    return (
      <div
        className={classes.flagQuesCon}
        onClick={openFlagAlert}
        style={{ backgroundColor: isFlag ? "#fdb338" : "#ebeff2" }}
      >
        <img
          src={isFlag ? LocalImages.FLAG_FILLED_WHITE : LocalImages.FLAG}
          alt={"flg"}
        />
        <Typography style={{ color: isFlag ? "#ffffff" : "#7a7b7d" }}>
          {isFlag ? "Flagged Question" : "Flag Question"}
        </Typography>
      </div>
    );
  };

  const timeLimitBtn = () => {
    return (
      <div className={classes.timeContainer}>
        <div className={classes.timeLimit}>
          <TimeLimit />
        </div>
        <StopWatch setIsTimeOver={setIsTimeOver} mark={data.mark} />
      </div>
    );
  };

  const headerCon = () => {
    return (
      <div className={classes.headerCon}>
        {headingCon()}
        <div className={classes.headerCon}>
          {flagQuestionBtn()}
          {timeLimitBtn()}
        </div>
      </div>
    );
  };

  const headingCon = () => {
    return (
      <Typography
        className={classes.heading}
      >{`Practice Questions - Week ${week}`}</Typography>
    );
  };

  const questionsPaination = () => {
    return (
      <div className={classes.paginationCon}>
        <div id="paginationCon">
          {allQuestions.map((item: any, index: number) => {
            const { _id, questionStatus, isFlag } = item;
            let borderColor = "";
            if (isFlag) {
              borderColor = "solid 2px #fdb338";
            } else {
              switch (questionStatus) {
                case constants.QuestionStatus.ATTEMPT:
                  borderColor = "solid 2px #31c39f";
                  break;
                case constants.QuestionStatus.SKIPED:
                  borderColor = "solid 2px #ff7b7b";
                  break;
                case constants.QuestionStatus.NOT_STARTED:
                default:
                  borderColor = "solid 2px transparent";
                  break;
              }
            }
            return (
              <div
                key={_id}
                className={classes.pageCon}
                style={{ border: borderColor }}
                onClick={() => {
                  history.push(
                    `${Utils.Pathname.PRACTICE_QUESTION.replace(
                      ":questionId",
                      _id
                    )}`
                  );
                  // Backdrop event called here //
                }}
              >
                <Typography>{index + 1}</Typography>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const questionPaginationCon = () => {
    return (
      <div className={classes.questionPagCon}>
        <div className={classes.questionPagInnerCon}>
          <Typography
            className={classes.quesHeading}
          >{`QUESTION ${questionNum}`}</Typography>
          {questionsPaination()}
        </div>
      </div>
    );
  };

  const questionTitleDesc = () => {
    return (
      <div className={classes.quesTitleDescCon}>
        <Typography className={classes.quesTitle}>{subject}</Typography>
        <Typography className={classes.quesDesc}>
          {question.replace(/<[^>]*>/g, "")} {`[${data.mark} marks]`}
        </Typography>
      </div>
    );
  };

  const questionNumber = () => {
    const totalQues = allQuestions.length;
    return (
      <Typography
        className={classes.questionNum}
      >{`Questions ${questionNum} of ${totalQues}`}</Typography>
    );
  };

  const footer = () => {
    return (
      <div className={classes.footerCon}>
        <div className={classes.footerBtnCon} onClick={onContinue}>
          <Typography style={{ color: "#000" }}>
            {allQuestions.length === questionNum ? "Finish" : "Continue"}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {backBtnCon()}
      {headerCon()}
      {questionPaginationCon()}
      {questionTitleDesc()}
      {isEssay ? (
        <TypingQuestionView
          ref={typingRef}
          setOpen={setOpen}
          questionData={data}
          useSelectedTempalte={useSelectedTempalte}
          onContinue={(value: string) => submitAnswerFun(value)}
          openSelfAssesment={(val: boolean) => {
            const { selfAssesmentViewed } = localStorage;
            if (selfAssesmentViewed === "true") {
              dispatch({
                type: Utils.ActionName.SELF_ASSESSMENT,
                payload: { selfAssesmentOpen: val },
              });
              // setSelfAssesmentOpen(val);
            } else {
              if (selfAssesmentRef && selfAssesmentRef.current) {
                selfAssesmentRef.current.openTutorial();
              }
            }
          }}
        />
      ) : (
        <MCQQuestionView
          ref={mcqRef}
          questionData={data}
          onContinue={(value: string) => submitAnswerFun(value)}
        />
      )}
      {questionNumber()}
      {footer()}
      <TransitionsModal
        open={open}
        setOpen={setOpen}
        children={
          <UseTemplateModal
            setOpen={setOpen}
            setUseSelectedTemplate={setUseSelectedTemplate}
          />
        }
      />
      <TransitionsModal
        open={isTimeOver}
        setOpen={setIsTimeOver}
        children={
          <IsTimeOverModal
            setOpen={setIsTimeOver}
            questionNum={questionNum}
            allQuestions={allQuestions}
          />
        }
      />
      <TransitionsModal
        open={selfAssesmentOpen}
        modstyle={classes.modalStyle}
        setOpen={(val: boolean) => {
          dispatch({
            type: Utils.ActionName.SELF_ASSESSMENT,
            payload: { selfAssesmentOpen: val },
          });
        }}
        children={
          <SelfAssesment
            questionData={data}
            questionNum={questionNum}
            setOpen={(val: boolean) => {
              dispatch({
                type: Utils.ActionName.SELF_ASSESSMENT,
                payload: { selfAssesmentOpen: val },
              });
            }}
            openFlagAlert={() => openFlagAlert()}
            selfMark={selfMark}
            handleSaveTemplateClick={handleSaveTemplateClick}
          />
        }
      />
      <TransitionsModal
        open={createTemplateModal}
        modstyle={classes.modalStyle}
        setOpen={() => {
          setCreateTemplateModal(false);
        }}
        children={
          <CreateTemplate
            questionNum={questionNum}
            questionData={data}
            setOpen={() => {
              setCreateTemplateModal(false);
            }}
          />
        }
      />
      <ConfirmationDialog
        ref={alertRef}
        title={"Submit Answer"}
        onSubmit={() => submitAnyWay()}
        description={"Are you sure you want to submit without giving answer?"}
      />
      <ConfirmationDialog
        ref={flagAlertRef}
        title={isFlag ? "Remove Flag" : "Flag Question"}
        description={
          isFlag
            ? "Are you sure you want to unflag this question?"
            : "Are you sure you want to flag this question?"
        }
        onSubmit={() => {
          if (isFlag) {
            dispatch(
              removeQuestonFlag(_id, (id: string) => markQuestionAsFlag(id, 0))
            );
          } else {
            dispatch(
              flagQuestion(_id, (id: string) => markQuestionAsFlag(id, 1))
            );
          }
        }}
      />
      <SelfAssesmentTutorial ref={selfAssesmentRef} />
    </div>
  );
}
