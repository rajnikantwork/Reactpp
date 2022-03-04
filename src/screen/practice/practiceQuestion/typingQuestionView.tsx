import moment from "moment";
import React from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { QuestionDataModal } from "../../../modal";
import { KeyboardArrowDown } from "@material-ui/icons";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  createStyles,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "11px",
    },
    previousAttCon: {
      height: "43px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    formControl: {
      minWidth: 233,
      "& .MuiOutlinedInput-input": {
        padding: "11px 10px 7px 23px !important",
      },
      "& .MuiInputBase-input": {
        color: "#000000 !important",
      },
    },
    arrowIcon: {
      margin: "0 10px !important",
    },
    editorCon: {
      "& .rdw-option-wrapper, .rdw-dropdown-wrapper": {
        border: "none",
        backgroundColor: "#f8f8f8",
      },
      "& .rdw-colorpicker-wrapper, .rdw-inline-wrapper, .rdw-link-wrapper, .rdw-fontsize-wrapper, .rdw-fontfamily-wrapper, .rdw-list-wrapper, .rdw-text-align-wrapper":
        {
          borderRight: "1px solid #e8e9eb",
        },
      "& .rdw-editor-main": {
        minHeight: "219px",
        backgroundColor: "#ffffff",
        padding: "42.7px 128px 36.3px 35px",
        "& .DraftEditor-root": {
          maxWidth: "1177px",
        },
      },
    },
    editorFooterCon: {
      height: "65px",
      display: "flex",
      backgroundColor: "#ffffff",
      padding: "0px 22px 0px 35px",
      borderBottomLeftRadius: "10px",
      justifyContent: "space-between",
      borderBottomRightRadius: "10px",
    },
    wordsCount: {
      color: "#000000",
      fontSize: "16px",
      marginTop: "12px",
    },
    footerRightBtnsCon: {
      display: "flex",
      "& :first-child": {
        marginRight: "10px",
      },
    },
    templateBtn: {
      width: "180px",
      height: "46px",
      display: "grid",
      cursor: "pointer",
      borderRadius: "5px",
      placeItems: "center",
      backgroundColor: "#ebeff2",
      "& span": {
        fontWeight: 500,
        color: "#363353",
        fontSize: "16px",
      },
    },
  })
);

interface Props {
  setOpen: Function;
  onContinue: Function;
  useSelectedTempalte: any;
  openSelfAssesment: Function;
  questionData: QuestionDataModal;
}

const TypingQuestionView = forwardRef(
  (
    {
      setOpen,
      questionData,
      onContinue,
      useSelectedTempalte,
      openSelfAssesment,
    }: Props,
    ref
  ) => {
    const classes = styles();
    const [editorState, setEditorState] = useState<any>(
      EditorState.createEmpty()
    );
    const { userAnsweres, lastAttempt } = questionData;
    const [attempts, setAttempts] = useState(
      lastAttempt > 0 ? lastAttempt : ""
    );
    const [isSelfAssissmentDone, setEnableSelfAssisment] =
      React.useState(false);
    useImperativeHandle(ref, () => ({
      submitQuestion() {
        let str = editorState.getCurrentContent().getPlainText("\u0001");
        onContinue(str);
      },
    }));

    useEffect(() => {
      if (attempts !== "") {
        let data: any = userAnsweres.find(
          (a) => a.created === attempts
        )?.answere;
        let x: any = userAnsweres.find((a) => a.created === attempts);
        setEnableSelfAssisment(x.isSelfMarked);
        let newContent = ContentState.createFromText(
          useSelectedTempalte.description
            ? useSelectedTempalte.description
            : data
        );
        let newStateToUpdate = EditorState.createWithContent(newContent);
        setEditorState(newStateToUpdate);
      } else {
        let newContent = ContentState.createFromText(
          useSelectedTempalte.description ? useSelectedTempalte.description : ""
        );
        let newStateToUpdate = EditorState.createWithContent(newContent);
        setEditorState(newStateToUpdate);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attempts, useSelectedTempalte]);

    const handleChange = ({ target }: any) => {
      setAttempts(target.value);
    };

    const onEditorStateChange = (newState: any) => {
      setEditorState(newState);
    };

    const countWords = () => {
      let str = editorState.getCurrentContent().getPlainText("\u0001");
      str = str.replace(/(^\s*)|(\s*$)/gi, "");
      str = str.replace(/[ ]{2,}/gi, " ");
      str = str.replace(/\n /, "\n");
      if (str.trim().length === 0) {
        return 0;
      }
      return str.split(" ").length;
    };

    const previousAttemptDropDown = () => {
      return (
        <div className={classes.previousAttCon}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              displayEmpty
              value={attempts}
              onChange={handleChange}
              placeholder={"Previous attempts"}
              IconComponent={() => (
                <KeyboardArrowDown className={classes.arrowIcon} />
              )}
            >
              <MenuItem value="">{"Previous attempts"}</MenuItem>
              {userAnsweres.map((item) => {
                const { created } = item;
                const dateToShow = moment(created).format("DD/MM/YYYY h:mm a");
                return (
                  <MenuItem
                    key={created}
                    value={created}
                  >{`Attempt ${dateToShow}`}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      );
    };

    const editorFooter = () => {
      return (
        <div className={classes.editorFooterCon}>
          <span
            className={classes.wordsCount}
          >{`Word count ${countWords()}`}</span>
          <div className={classes.footerRightBtnsCon}>
            {userAnsweres.length !== 0 ? (
              isSelfAssissmentDone ? (
                <React.Fragment></React.Fragment>
              ) : (
                <div
                  style={{ backgroundColor: "#2aaebc" }}
                  className={classes.templateBtn}
                  onClick={() => openSelfAssesment(true)}
                >
                  <span style = {{color:'#fff'}}>{"Self Assessment"}</span>
                </div>
              )
            ) : (
              <React.Fragment></React.Fragment>
            )}

            <div className={classes.templateBtn} onClick={() => setOpen(true)}>
              <span>{"Use template"}</span>
            </div>
          </div>
        </div>
      );
    };

    const textEditor = () => {
      return (
        <div className={classes.editorCon}>
          <Editor
            placeholder="Type"
            editorState={editorState}
            toolbar={{
              link: { inDropdown: true },
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline"],
              },
              options: [
                "colorPicker",
                "inline",
                "link",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
              ],
            }}
            onEditorStateChange={onEditorStateChange}
            toolbarStyle={{
              backgroundColor: "#f8f8f8",
              border: "none",
              marginBottom: "0px",
            }}
          />
          {editorFooter()}
        </div>
      );
    };

    return (
      <div className={classes.container}>
        {previousAttemptDropDown()}
        {textEditor()}
      </div>
    );
  }
);

export default TypingQuestionView;
