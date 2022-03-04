import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
//@ts-ignore
import ReactHtmlParser from "react-html-parser";
import { format } from "date-fns";
import LocalImages from "../../../../Utils/images";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import {
  QuestionDataModal,
  SelfAssessmentItem,
  NoteModal,
  UserAnswereModal,
} from "../../../../modal";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import TransitionsModal from "../../../../components/popupModal";
import CloseModalButton from "../../../../components/button/closeModalButton";
import Utils from "../../../../Utils";
import "react-circular-progressbar/dist/styles.css";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    addTemplateContainer: {
      position: "relative",
      padding: "20px 10px",
    },
    headerSecCon: {
      width: "94%",
      height: "auto",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      padding: "19px 28px 23px 40px",
      boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
    },
    quesFlagCon: {
      height: 31,
      width: "100%",
      display: "flex",
      marginBottom: "2px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    quesNumHeading: {
      width: "auto",
      height: "100%",
      "& span": {
        opacity: 0.5,
        fontSize: "18px",
        color: "#000000",
        fontWeight: "bold",
      },
    },
    flagQuesCon: {
      height: "100%",
      display: "flex",
      cursor: "pointer",
      padding: "0 12px",
      borderRadius: "4px",
      alignItems: "center",
      justifyContent: "center",
      "& span": {
        fontWeight: 500,
        fontSize: "14px",
        marginLeft: "9px",
      },
    },
    quesTitleCon: {
      height: "28px",
      width: "auto",
      "& span": {
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    quesDesc: {
      fontSize: "16px",
      lineHeight: 1.38,
    },
    middleSectionCon: {
      width: "100%",
      height: "60vh",
      display: "flex",
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
    yourAnsViewCon: {
      display: "flex",
      width: "28.88vw",
      marginRight: "1.111vw",
      flexDirection: "column",
    },
    ansViewHeading: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "19px 0px 13px 6px",
      color: "rgba(63, 67, 74, 0.5)",
    },
    borderViewCon: {
      width: "100%",
      height: "100%",
      position: "relative",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      MozBoxSizing: "border-box",
      WebkitBoxSizing: "border-box",
      padding: "31px 29px 20px 14px",
      border: "solid 1px rgba(0, 0, 0, 0.1)",
    },
    noteModal: {
      "& > div": {
        position: "relative",
        padding: "30px 0px",
        "& label": {
          marginBottom: 8,
          display: "block",
        },
        "& button": {
          height: "38px",
          borderRadius: "5px",
          backgroundColor: "#2aaebc",
          fontWeight: 500,
          color: "#ffffff",
          fontSize: "16px",
          border: "none",
          marginTop: 16,
          padding: "0px 16px",
          float: "right",
          cursor: "pointer",
        },
        "& textarea": {
          width: "96%",
          maxWidth: "96%",
          outline: "none",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          padding: "8px",
        },
      },
    },
    scoreModal: {
      width: 509,
      paddingTop: 21,
      borderRadius: 8,
      textAlign: "center",
      "& svg": {
        width: 150,
      },
    },
    scoreModalHeading: {
      fontSize: 28,
      fontWeight: "bold",
    },
    scoreModalSubhead: {
      fontSize: 18,
      marginBottom: 10,
    },
    scoreModalData: {
      marginTop: "140%",
      "& div": {
        fontSize: 30,
      },
      "& span": {
        color: "#7c7c7c",
        fontWeight: 600,
        fontSize: 20,
      },
    },
    scoreModalFooter: {
      display: "flex",
      height: 68,
      margin: "2px -32px -24px",
      "& button": {
        height: "100%",
        flex: "1 0 0",
        border: "none",
        cursor: "pointer",
        fontSize: 18,
        "&:focus": {
          outline: "none",
        },
      },
    },
    scoreModalTempBtn: {
      backgroundColor: "#ebeff2",
      borderBottomLeftRadius: 4,
    },
    scoreModalNextBtn: {
      backgroundColor: "#2aaebc",
      borderBottomRightRadius: 4,
      color: "white",
    },
    noteCon: {
      margin: "10px 0",
      padding: "10px",
      borderRadius: "10px",
      backgroundColor: "#ebeff2",
      "& p": {
        marginBottom: 10,
      },
    },
    addNoteBtnCon: {
      marginTop: 30,
      "& button": {
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#fff",
        border: `2px dashed ${theme.palette.primary.main}`,
        padding: 12,
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        cursor: "pointer",
      },
    },
    yourAnsFooterCon: {
      width: "92%",
      bottom: "20px",
      display: "flex",
      position: "absolute",
      alignItems: "center",
      justifyContent: "space-between",
    },
    expandTxt: {
      fontWeight: 500,
      fontSize: "14px",
      color: "#000000",
    },
    wordsCountTxt: {
      fontSize: "14px",
      color: "#000000",
    },
    footerCon: {
      width: "100%",
      height: "auto",
      display: "flex",
      paddingTop: "40px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    saveTempBtn: {
      width: "210px",
      height: "62px",
      display: "grid",
      marginRight: "25px",
      borderRadius: "5px",
      placeItems: "center",
      backgroundColor: "#ebeff2",
      cursor: "pointer",
      "& span": {
        fontWeight: 500,
        color: "#363353",
        fontSize: "20px",
      },
    },
    doneBtn: {
      width: "174px",
      height: "62px",
      display: "grid",
      borderRadius: "5px",
      placeItems: "center",
      backgroundColor: "#2aaebc",
      cursor: "pointer",
      "& span": {
        fontWeight: 500,
        color: "#ffffff",
        fontSize: "18px",
      },
    },
    selfAssessmentItemCon: {
      width: "95%",
      height: "47px",
      display: "flex",
      cursor: "pointer",
      margin: "13px 0px",
      alignItems: "center",
      "& img": {
        width: "15px",
        height: "13.5px",
        marginRight: "18px",
      },
    },
    dotTxtCon: {
      display: "flex",
      width: "11.042vw",
      alignItems: "center",
      "& #dot": {
        width: "10px",
        height: "10px",
        borderRadius: "10px",
      },
      "& span": {
        fontWeight: 500,
        color: "#3f434a",
        fontSize: "18px",
        marginLeft: "6px",
      },
    },
    selfAssessmentInputCon: {
      width: "94px",
      height: "47px",
      borderRadius: 5,
      display: "flex",
      overflow: "hidden",
      marginRight: "20px",
      alignItems: "center",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      "& input": {
        outline: "none",
        margin: 0,
        width: "100%",
        border: "none",
        height: "100%",
        color: "#000000",
        fontSize: "20px",
        textAlign: "right",
        padding: "0px 4px",
        fontWeight: "bold",
      },
      "& span": {
        color: "#000000",
        fontSize: "20px",
        fontWeight: "bold",
        marginRight: "10px",
      },
    },
    markTxt: {
      opacity: 0.5,
      color: "#000000",
      fontSize: "14px",
      fontWeight: "normal",
      whiteSpace: "nowrap",
    },
    progressbarCircle:{
      '& .CircularProgressbar .CircularProgressbar-path':{
        stroke:theme.palette.primary.main
      }
    },
    noneSelectionTxt: {
      userSelect: "none",
      WebkitUserSelect: "none",
    },
  })
);

interface Props {
  setOpen: Function;
  questionNum: number;
  openFlagAlert: Function;
  questionData: QuestionDataModal;
  selfMark: Function;
  handleSaveTemplateClick: Function;
}

export default function SelfAssesment({
  setOpen,
  questionNum,
  questionData,
  openFlagAlert,
  selfMark,
  handleSaveTemplateClick,
}: Props) {
  const classes = styles();
  const dispatch = useDispatch();
  const [selections, setSelections] = useState<any>([]);
  const { subject, question, userAnsweres, lastAttempt, modelAnswere } =
    questionData;

  const editorRef = useRef(null);
  const [assessmentOptions, setAssessmentOptions] = useState<
    SelfAssessmentItem[]
  >([
    {
      id: 1,
      value: "",
      selected: false,
      color: "#ff7b7b",
      title: "Issue spotting",
      key: "issueSpotingMark",
      mark: questionData.issueSpotingMark,
    },
    {
      id: 2,
      value: "",
      title: "Rule",
      key: "ruleMark",
      selected: false,
      color: "#fcdd71",
      mark: questionData.ruleMark,
    },
    {
      id: 3,
      value: "",
      selected: false,
      color: "#00a8d4",
      title: "Application",
      key: "applicationMark",
      mark: questionData.applicationMark,
    },
    {
      id: 4,
      value: "",
      selected: false,
      color: "#7576f5",
      title: "Structure",
      key: "structureMark",
      mark: questionData.structureMark,
    },
  ]);
  const [notes, setNotes] = useState<Array<NoteModal>>([]);
  const [noteModal, setNoteModal] = useState(false);
  const [scoreModal, setScoreModal] =
    useState<{ totalMark: number; score: number } | null>(null);

  useEffect(() => {
    let find = userAnsweres.find((a) => a.created === lastAttempt);
    if (find) {
      setNotes(find.notes);
      setAssessmentOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        debugger
        return updatedOptions.map(({ key, mark, ...rest }) => ({
          ...rest,
          key,
          mark,
          value: mark > 0 ? `${((find?.marks[key] || 0) / mark) * 100}` : `${((find?.marks[key] || 0)) * 100}`,
        }));
      
      });
    }
  }, [setNotes, setAssessmentOptions, lastAttempt, userAnsweres]);

  const closeModal = () => {
    setOpen(false);
  };

  const countWords = (str: string) => {
    str = str.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");
    if (str.trim().length === 0) {
      return 0;
    }
    return str.split(" ").length;
  };

  const selectAssessmentOption = (id: number) => {
    let newData = [...assessmentOptions];
    newData.forEach((element) => {
      element.selected = element.id === id;
    });
    setAssessmentOptions([...newData]);
  };

  const updateAssessmentData = (value: string, id: number) => {
    let newData = [...assessmentOptions];
    let index = newData.findIndex((a) => a.id === id);
    if (index > -1) {
      newData[index]["value"] = value;
    }
    setAssessmentOptions([...newData]);
  };

  const handleInputChange = (value: string, id: number) => {
    if (/^\d+$/.test(value)) {
      //check if entered value is number or not
      if (parseInt(value) <= 100) {
        //if number is less than 100
        updateAssessmentData(value, id);
      }
    } else if (value.length === 0 || !value) {
      updateAssessmentData(value, id);
    }
  };

  const handleNoteChange = ({ target: { value } }: any) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];

      updatedNotes[updatedNotes.length - 1].text = value;

      return [...updatedNotes];
    });
  };

  const handleAddNoteClick = () => {
    setNotes((prevNotes) =>
      prevNotes.concat([{ text: "", createdAt: new Date().getTime() }])
    );
    setNoteModal(true);
  };

  const handleNoteModalClose = () => {
    setNotes((prevNotes) => prevNotes.slice(0, prevNotes.length - 1));
    setNoteModal(false);
  };

  const handleAddNote = () => {
    if (notes[notes.length - 1]?.text) {
      setNoteModal(false);
    }
  };

  const getFeedback = (percentage:number) => {
    if(percentage <= 50) return 'Fair'
    else if(percentage > 50 && percentage <= 70) return 'Good'
    else if(percentage > 70 && percentage <= 85) return 'Very Good'
    else return 'Excellent'
  }
  const handleSelfAssesment = () => {
    if (assessmentOptions.some(({ value }) => !value)) {
      Utils.showAlert(2, "Please enter proper scores!");
      return;
    }

    dispatch(
      selfMark(
        questionData,
        notes,
        assessmentOptions,
        ({ score, totalMark }: UserAnswereModal) => {
          setScoreModal({ score, totalMark });
        }
      )
    );
  };

  const getSelectionCharacterOffsetWithin = (element: any) => {
    let start = 0;
    let end = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        start = preCaretRange.toString().length;
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        end = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type !== "Control") {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToStart", textRange);
      start = preCaretTextRange.text.length;
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      end = preCaretTextRange.text.length;
    }
    return { start: start, end: end };
  };

  const startSelection = (e: any) => {
    let find = assessmentOptions.find((a) => a.selected === true);
    if (find) {
      onMouseUpHandler(e, find.id);
    } else {
      return;
    }
  };

  const clearTextSelection = () => {
    // @ts-ignore
    const sel = window.getSelection ? window.getSelection() : document.selection;
    if (sel) {
      if (sel.removeAllRanges) {
        sel.removeAllRanges();
      } else if (sel.empty) {
        sel.empty();
      }
    }
  };

  const onMouseUpHandler = (e: any, id: number) => {
    e.preventDefault();
    const { start, end } = getSelectionCharacterOffsetWithin(editorRef.current);
    if (end > start) {
      setSelections((prevValue: any) => prevValue.concat({ id, start, end }));
    }

    clearTextSelection();
  };

  // const flagQuestionBtn = () => {
  //   return (
  //     <div
  //       onClick={() => openFlagAlert()}
  //       className={classes.flagQuesCon}
  //       style={{ backgroundColor: isFlag ? "#fdb338" : "#ebeff2" }}
  //     >
  //       <img
  //         src={isFlag ? LocalImages.FLAG_FILLED_WHITE : LocalImages.FLAG}
  //         alt={"flg"}
  //       />
  //       <span style={{ color: isFlag ? "#ffffff" : "#7a7b7d" }}>
  //         {isFlag ? "Flagged Question" : "Flag Question"}
  //       </span>
  //     </div>
  //   );
  // };

  const headerSection = () => {
    return (
      <div className={classes.headerSecCon}>
        <div className={classes.quesFlagCon}>
          <div className={classes.quesNumHeading}>
            <span>{`QUESTION ${questionNum}`}</span>
          </div>
          {/* {flagQuestionBtn()} */}
        </div>
        <div className={classes.quesTitleCon}>
          <span>{subject}</span>
        </div>
        <span className={classes.quesDesc}>
          {question.replace(/<[^>]*>/g, "")}
        </span>
      </div>
    );
  };

  const renderYourAnswereText = (text: string) => {
    let childToRender: string = "";
    const sortedSelections = selections.sort(
      (a: any, b: any) => a.start - b.start
    );

    let lastEnd = 0;
    let prevDiffIndex = 1;
    sortedSelections.forEach(({ id, start, end }: any, index: number) => {
      const { start: prevStart, end: prevEnd } =
        sortedSelections[index - prevDiffIndex] || {};

      // if prev selection contains current one
      if (start > prevStart && end < prevEnd) {
        prevDiffIndex++;
        return;
      } else {
        prevDiffIndex = 1;
      }

      if (index !== 0 && prevEnd > start) {
        start = prevEnd;
      }

      let selectionClass = "";
      switch (id) {
        case 1:
          selectionClass = "issue-spotting-highlight";
          break;
        case 2:
          selectionClass = "rule-highlight";
          break;
        case 3:
          selectionClass = "application-highlight";
          break;
        case 4:
          selectionClass = "structure-highlight";
          break;
      }

      childToRender +=
        text.substring(lastEnd, start) +
        `<span class="none-selection-text ${selectionClass}">${text.substring(
          start,
          end
        )}</span>`;
      lastEnd = end;
    });
    lastEnd = Math.max.apply(
      Math,
      sortedSelections.map((o: any) => o.end)
    );
    childToRender += text.substring(lastEnd || 0, text.length);

    return (
      <span ref={editorRef} onMouseUp={startSelection}>
        {ReactHtmlParser(childToRender)}
      </span>
    );
  };

  const yourAnswerView = () => {
    let currentAnswer = "";
    let find = userAnsweres.find((a) => a.created === lastAttempt);
    if (find) {
      currentAnswer = find.answere;
    }
    return (
      <div className={classes.yourAnsViewCon}>
        <span className={classes.ansViewHeading}>{"YOUR ANSWER"}</span>
        <div className={classes.borderViewCon}>
          {renderYourAnswereText(currentAnswer)}
          <div className={classes.yourAnsFooterCon}>
            <span className={classes.expandTxt}>{"Expand"}</span>
            <span className={classes.wordsCountTxt}>{`Words count ${countWords(
              currentAnswer
            )}`}</span>
          </div>
        </div>
      </div>
    );
  };

  const modalAnswerView = () => {
    return (
      <div className={classes.yourAnsViewCon}>
        <span className={classes.ansViewHeading}>{"MODEL ANSWER"}</span>
        <div className={classes.borderViewCon}>
          <span>{modelAnswere}</span>
          <div className={classes.yourAnsFooterCon}>
            <span className={classes.expandTxt}>{"Expand"}</span>
            <span className={classes.wordsCountTxt}>{`Words count ${countWords(
              modelAnswere
            )}`}</span>
          </div>
        </div>
      </div>
    );
  };

  const selfAssessmentItem = (item: SelfAssessmentItem) => {
    const { title, color, value, selected, id, mark } = item;
    
    const imgToShow = selected
      ? LocalImages.SELF_ASSESSMENT_PENCIL_SELECTED
      : LocalImages.SELF_ASSESSMENT_PENCIL;
    return (
      <div className={classes.selfAssessmentItemCon}>
        <img
          src={imgToShow}
          alt="pencil"
          onClick={() => selectAssessmentOption(id)}
        />
        <div
          className={classes.dotTxtCon}
          onClick={() => selectAssessmentOption(id)}
        >
          <div id="dot" style={{ backgroundColor: color }} />
          <span>{title}</span>
        </div>
        <div className={classes.selfAssessmentInputCon}>
          <input
            value={value}
            onChange={({ target }: any) => handleInputChange(target.value, id)}
            maxLength={3}
          />
         {/* <span>{"%"}</span> */}
        </div>
        <span className={classes.markTxt}>{`${mark} mark${
          mark > 1 ? "s" : ""
        }`}</span>
      </div>
    );
  };
  const selfAssessmentView = () => {
    return (
      <div className={classes.yourAnsViewCon} style={{ marginLeft: "1.181vw" }}>
        <span className={classes.ansViewHeading}>{"SELF ASSESSMENT"}</span>
        <div
          className={classes.borderViewCon}
          style={{ padding: "28px 0px 10px 3px", height: "unset" }}
        >
          <div style  = {{display: "flex",alignItems: "center", width: "95%"}}>
            <div style = {{width:"55%"}}></div>
            <div style  = {{textAlign: "center", color: "rgb(63, 67, 74)", display:"flex", fontWeight: "bold"}}>
            <Typography variant="body1" style = {{marginRight: "5px", fontWeight: "bold"}}>%</Typography>
            <Typography variant="body1" style = {{fontWeight: "bold"}}>(1 - 100)</Typography>
            </div>
          
          </div>
          {assessmentOptions.map((item) => {
            return (
              <Fragment key={item.id}>{selfAssessmentItem(item)}</Fragment>
            );
          })}
          <TransitionsModal
            modstyle={classes.scoreModal}
            open={!!scoreModal}
            setOpen={() => setScoreModal(null)}
          >
            <div className={classes.scoreModalHeading}>{"Your Score"}</div>
            <div className={classes.scoreModalSubhead}>{scoreModal ? getFeedback((scoreModal.totalMark / (questionData.ruleMark + questionData.structureMark + questionData.issueSpotingMark + questionData.applicationMark)) * 100) : null}</div>
            {scoreModal && (
              <div className = {classes.progressbarCircle}>
              <CircularProgressbarWithChildren value={(scoreModal.totalMark / (questionData.ruleMark + questionData.structureMark + questionData.issueSpotingMark + questionData.applicationMark)) * 100}>
                <div className={classes.scoreModalData}>
                  <div>
                    {scoreModal.score * 100 < 100
                      ? `${((scoreModal.totalMark / (questionData.ruleMark + questionData.structureMark + questionData.issueSpotingMark + questionData.applicationMark)) * 100).toFixed(2)}%`
                      : `${((scoreModal.totalMark / (questionData.ruleMark + questionData.structureMark + questionData.issueSpotingMark + questionData.applicationMark)) * 100).toFixed(0)}%`}
                  </div>
                  <span>
                    {scoreModal.totalMark < questionData.ruleMark + questionData.structureMark + questionData.issueSpotingMark + questionData.applicationMark
                      ? `${scoreModal.totalMark.toFixed(0)} /${questionData.ruleMark + questionData.structureMark + questionData.issueSpotingMark + questionData.applicationMark}`
                      : `${scoreModal.totalMark.toFixed(1)}  /${questionData.ruleMark + questionData.structureMark + questionData.issueSpotingMark + questionData.applicationMark}`}
                  </span>
                </div>
              </CircularProgressbarWithChildren>
              </div>
            )}
         
            <div className={classes.scoreModalFooter}>
              <button
                className={classes.scoreModalTempBtn}
                onClick={() => handleSaveTemplateClick()}
              >
                {"Save As Template"}
              </button>
              <button
                className={classes.scoreModalNextBtn}
                onClick={() => {
                  setOpen(false);
                }}
              >
                {"Close"}
              </button>
            </div>
          </TransitionsModal>
          <TransitionsModal
            modstyle={classes.noteModal}
            open={noteModal}
            setOpen={handleNoteModalClose}
          >
            <div>
              <CloseModalButton onClick={handleNoteModalClose} />
              <label>{"Note"}</label>
              <textarea
                placeholder="Type a note here..."
                value={notes[notes.length - 1]?.text}
                onChange={handleNoteChange}
              />
              <button onClick={handleAddNote}>{"Add"}</button>
            </div>
          </TransitionsModal>
          {notes.map(({ createdAt, text }, index) => {
            // don't render current note being added
            if (index === notes.length - 1 && noteModal) {
              return null;
            }

            return (
              <div key={createdAt} className={classes.noteCon}>
                <Typography variant="body2">
                  {format(
                    createdAt ? new Date(createdAt) : new Date(),
                    "dd MMM, yyyy"
                  )}
                </Typography>
                <Typography variant="body2">{text}</Typography>
              </div>
            );
          })}
          <div className={classes.addNoteBtnCon}>
            <button onClick={handleAddNoteClick}>+ Add Note</button>
          </div>
        </div>
      </div>
    );
  };

  const middleSection = () => {
    return (
      <div className={classes.middleSectionCon}>
        {yourAnswerView()}
        {modalAnswerView()}
        {selfAssessmentView()}
      </div>
    );
  };

  const footerSection = () => {
    return (
      <div className={classes.footerCon}>
        <div
          className={classes.saveTempBtn}
          onClick={() => {
            handleSaveTemplateClick();
          }}
        >
          <span>{"Save template"}</span>
        </div>
        <div className={classes.doneBtn} onClick={handleSelfAssesment}>
          <span>{"Done"}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.addTemplateContainer}>
      <CloseModalButton onClick={closeModal} />
      {headerSection()}
      {middleSection()}
      {footerSection()}
    </div>
  );
}
