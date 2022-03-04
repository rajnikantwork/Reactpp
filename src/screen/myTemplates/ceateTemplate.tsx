import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import CloseModalButton from "../../components/button/closeModalButton";
import Select from "./select";
import { ReducersModal } from "../../modal/index";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../studyPlanner/action";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ActionButton from "../../components/button/index";
import Typography from "@material-ui/core/Typography";
import { createNewTemplate } from "./action";
import Utils from "../../Utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      width: "90%",
      margin: "10px auto 0 auto",
      position: "absolute",
      top: "-5px",
      opacity: 0,
      transition: "all 0.4s ease-in-out",
      zIndex: 999,
      "& div": {
        borderRadius: "5px",
        padding: "10px 0",
        backgroundColor: "rgb(254, 105, 105) !important",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
      },
    },
    errorAnim: {
      opacity: 1,
      top: "10px",
    },
    addTemplateContainer: {
      position: "relative",
      padding: "20px 10px",
    },
    select: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      "& div": {
        width: "90%",
      },
    },
    titleSection: {
      margin: "20px 0",
      "& input": {
        width: "100%",
        borderRadius: 3,
        padding: "8px 5px",
        outline: "none",
        border: "1px solid #e8e9eb",
        transition: "all 0.2s ease",

        "&:hover": {
          marginTop: "-2px",
          border: `2px solid ${theme.palette.primary.main}`,
        },
        "&:focus": {
          marginTop: "-2px",
          border: `2px solid ${theme.palette.primary.main}`,
        },
      },
    },
    textEditor: {
      marginTop: 20,
      "& .rdw-option-wrapper, .rdw-dropdown-wrapper": {
        border: "none",
        backgroundColor: "#f8f8f8",
      },
      "& .rdw-colorpicker-wrapper, .rdw-inline-wrapper, .rdw-link-wrapper, .rdw-fontsize-wrapper, .rdw-fontfamily-wrapper, .rdw-list-wrapper, .rdw-text-align-wrapper":
        {
          borderRight: "1px solid #e8e9eb",
        },
      "& .rdw-editor-main": {
        borderLeft: "1px solid #e8e9eb",
        borderBottom: "1px solid #e8e9eb",
        borderRight: "1px solid #e8e9eb",
        minHeight: "250px",
        maxHeight: "250px",
        overflowY: "auto",
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
        backgroundColor: "#ffffff",
        padding: "20px 5px 20px 5px",
        "& .DraftEditor-root": {
          maxWidth: "1177px",
        },
      },
    },
    wordCountAndAction: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
    },
    wordCount: {
      width: "20%",
    },
    copyBtn: {
      padding: "9px 8px",
      outline: "none",
      border: "none",
      fontSize: "14px",
      borderRadius: 4,
      textTransform: "capitalize",
      fontFamily: "Roboto, sans-serif",
      fontWeight: theme.typography.fontWeightMedium,
      transition: "all 0.2s ease",
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      "&:hover": {
        cursor: "pointer",
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      },
    },
    actionButons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "40%",
      "& button": {
        width: "45%",
        "&:nth-child(1)": {
          backgroundColor: "#ebeff2",
          color: "#363353",
        },
      },
    },
  })
);
interface Props {
  setOpen: Function;
  setOpen5: Function;
}
function CeateTemplate({ setOpen, setOpen5 }: Props) {
  const classes = styles();
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState<string>("");
  const { subjectData } = useSelector(
    (state: ReducersModal) => state.addTodoSubjectReducer
  );
  const [copy, setCopy] = React.useState(false);
  const { categoryData } = useSelector(
    (state: ReducersModal) => state.addTodoCategoryReducer
  );
  const { weekData } = useSelector(
    (state: ReducersModal) => state.addTodoWeekReducer
  );
  const [error, setError] = React.useState<string>("");
  const { selectedWeek, selectedSubject, selectedTopic } = useSelector(
    (state: ReducersModal) => state.createTemplateSelectionReducer
  );
  const [editorState, setEditorState] = React.useState<any>(
    EditorState.createEmpty()
  );
  const [isSubmitting, setSubmitting] = React.useState(false);
  const closeModal = () => {
    dispatch({
      type: Utils.ActionName.CREATE_TEMPLATE_SELECT,
      payload: {
        selectedWeek: "",
        selectedSubject: "",
        selectedTopic: "",
      },
    });
    setOpen(false);
  };
  const [display, setDisplay] = React.useState(false);
  const textRef = React.useRef<any>(null);
  //Code to display error for a set time range //
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [display]);
  //Code to display error for a set time range //

  //Code to get value from select inputs //
  const getSelectedData = (type: string, val: string) => {
    if (type === "selectedSubject") {
      const getSubject = subjectData.find(
        (value: any) => value.subject === val
      );
      dispatch({
        type: Utils.ActionName.CREATE_TEMPLATE_SELECT,
        payload: {
          selectedTopic: "",
        },
      });
      dispatch(getCategories(getSubject._id));
    } else if (type === "selectedTopic") {
    }
  };
  //Code to get value from select inputs //

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
  const createTemplate = () => {
    setDisplay(true);
    let str = editorState.getCurrentContent().getPlainText("\u0001");
    let commonErrorTxt = "Opps it looks like you haven't selected any";
    if (selectedWeek === "") setError(`${commonErrorTxt} week!`);
    else if (selectedSubject === "") setError(`${commonErrorTxt} subject!`);
    else if (selectedTopic === "") setError(`${commonErrorTxt} topic!`);
    else if (title === "") setError("Title cannot be blank");
    else if (str === "") setError("Template field cannot be blank");
    if (
      selectedWeek !== "" &&
      selectedTopic !== "" &&
      selectedTopic !== "" &&
      title !== "" &&
      str !== ""
    ) {
      setError("");
      dispatch(
        createNewTemplate(
          selectedWeek,
          selectedSubject,
          selectedTopic,
          title,
          str,
          setSubmitting,
          setOpen5,
        )
      );
      closeModal();
      // Post Api Goes here //
    }
  };
  const renderSelectDropdown = () => {
    return (
      <div className={classes.select}>
        <Select
          selectedWeek={selectedWeek}
          selectedSubject={selectedSubject}
          selectedTopic={selectedTopic}
          subjectData={subjectData}
          weekData={weekData}
          categoryData={categoryData}
          getSelectedData={getSelectedData}
        />
      </div>
    );
  };
  const renderTitleSection = () => {
    return (
      <div className={classes.titleSection}>
        <input
          type="text"
          placeholder="Template Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    );
  };
  const renderTextEditorSection = () => {
    return (
      <div className={classes.textEditor}>
        <Editor
          ref={textRef}
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
      </div>
    );
  };
  const renderWordCountAndActionBtnSection = () => {
    return (
      <div className={classes.wordCountAndAction}>
        <div className={classes.wordCount}>{`Word count ${countWords()}`}</div>
        <div className={classes.actionButons}>
          <CopyToClipboard
            text={editorState.getCurrentContent().getPlainText("\u0001")}
            onCopy={() => setCopy(true)}
          >
            <button className={classes.copyBtn} disabled={copy}>
              {!copy ? "Copy text" : "Copied"}
            </button>
          </CopyToClipboard>
          <ActionButton
            name="Save"
            type={"submit"}
            isSubmitting={isSubmitting}
            onPress={createTemplate}
          />
        </div>
      </div>
    );
  };
  return (
    <div className={classes.addTemplateContainer}>
      <div
        className={
          !display ? classes.error : `${classes.error} ${classes.errorAnim}`
        }
      >
        {error ? (
          <div>
            <Typography variant="body2"> {error}</Typography>
          </div>
        ) : null}
      </div>
      <CloseModalButton onClick={closeModal} />
      {renderSelectDropdown()}
      {renderTitleSection()}
      {renderTextEditorSection()}
      {renderWordCountAndActionBtnSection()}
    </div>
  );
}

export default CeateTemplate;
