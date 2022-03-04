import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import CloseModalButton from "../../../components/button/closeModalButton";
import Select from "../../myTemplates/select";
import { QuestionDataModal, ReducersModal } from "../../../modal/index";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../studyPlanner/action";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ActionButton from "../../../components/button/index";
import Typography from "@material-ui/core/Typography";
import { createNewTemplate } from "../../myTemplates/action";
import Utils from "../../../Utils";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      width: "90%",
      margin: "10px auto 0 auto",
      position: "absolute",
      bottom: "-5px",
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
      bottom: "18px",
    },
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
      marginBottom: 28,
      position: 'relative',
    },
    quesFlagCon: {
      width: "100%",
      display: "flex",
      marginBottom: "2px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    quesNumHeading: {
      width: "auto",
      "& span": {
        fontSize: 14,
        opacity: 0.5,
        color: "#000000",
        fontWeight: "bold",
        position: 'absolute',
        right: 28,
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
        width: "99%",
        borderRadius: 3,
        padding: "0px 10px",
        height: 36,
        outline: "none",
        border: "1px solid #e8e9eb",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
        "&:focus": {
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
      },
    },
    textEditor: {
      marginTop: 20,
      "& .rdw-editor-wrapper": {
        opacity: 0.5,
      },
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
      "& button": {
        width: 'auto',
      },
    },
    wordCount: {
      width: "20%",
    },
  })
);
interface Props {
  questionNum: number;
  questionData: QuestionDataModal;
  setOpen: Function;
}
function CreateTemplate({ questionNum, questionData, setOpen }: Props) {
  const classes = styles();
  const dispatch = useDispatch();
  const { subject, question, lastAttempt, userAnsweres, weekDetails: { week }, category, subjectId } = questionData;
  let currentAnswer = "";
  let find = userAnsweres.find((a) => a.created === lastAttempt);
  if (find) {
    currentAnswer = find.answere;
  }

  const [title, setTitle] = React.useState<string>("");
  const { subjectData } = useSelector(
    (state: ReducersModal) => state.addTodoSubjectReducer
  );
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
  // default select data
  React.useEffect(() => {
    const newContent = ContentState.createFromText(currentAnswer);
    const newStateToUpdate = EditorState.createWithContent(newContent);
    setEditorState(newStateToUpdate);

    dispatch({
      type: Utils.ActionName.CREATE_TEMPLATE_SELECT,
      payload: {
        selectedWeek: week.toString(),
        selectedSubject: subject,
        selectedTopic: category,
      },
    });
  }, [currentAnswer, weekData, categoryData, subjectData, week, subject, category, dispatch]);
  React.useEffect(() => {
    dispatch(getCategories(subjectId));
  }, [dispatch, subjectId]);
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
          setSubmitting
        )
      );
      closeModal();
      // Post Api Goes here //
    }
  };
  const headerSection = () => {
    return (
      <div className={classes.headerSecCon}>
        <div className={classes.quesFlagCon}>
          <div className={classes.quesNumHeading}>
            <span>{`QUESTION ${questionNum}`}</span>
          </div>
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
          readOnly
        />
      </div>
    );
  };
  const renderWordCountAndActionBtnSection = () => {
    return (
      <div className={classes.wordCountAndAction}>
        <div className={classes.wordCount}>{`Words count ${countWords()}`}</div>
        <ActionButton
          name="Save"
          type={"submit"}
          isSubmitting={isSubmitting}
          onPress={createTemplate}
        />
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
      {headerSection()}
      {renderSelectDropdown()}
      {renderTitleSection()}
      {renderTextEditorSection()}
      {renderWordCountAndActionBtnSection()}
    </div>
  );
}

export default CreateTemplate;
