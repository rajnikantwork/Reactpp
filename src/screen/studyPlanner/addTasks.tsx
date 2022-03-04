import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CloseModalButton from "../../components/button/closeModalButton";
import { ReducersModal } from "../../modal/index";
import { useSelector, useDispatch } from "react-redux";
import Schema from "../../schema/index";
import { Formik, Form } from "formik";
import InputField from "../../components/inputValues/index";
import ActionButton from "../../components/button/index";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Utils from "../../Utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCategories, addTask, getSubjects } from "./action";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      padding: 20,
    },
    addTodoContent: {},
    title: {
      "& h5": {
        fontWeight: theme.typography.fontWeightBold,
        color: "#030c29",
        fontSize: 26,
      },
    },
    taskFormContainer: {},
    formContainer: {},
    inputField: {
      "& div": {
        width: "100% !important",
      },
    },
    inputField1: {
      minHeight: 95,
      "& p": {
        color: "#8a9099",
      },
      "& .MuiOutlinedInput-root": {
        transition: "all 0.2s ease",
      },
      "& .MuiOutlinedInput-inputMarginDense": {
        paddingTop: "8px  !important",
        paddingBottom: "8px  !important",
      },
      "& .MuiSelect-outlined": {},
      "& .MuiFormHelperText-root": {
        fontSize: 14.5,
        marginLeft: 0,
        fontWeight: theme.typography.fontWeightLight,
      },
    },
    inputField3: {
      "& >div": {
        "& >div": {
          "& >div": {
            minHeight: 100,
            maxHeight: 100,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
              borderRadius: "30px",
              cursor: "grab",
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
        },
      },
    },
    submitFormBtn: {
      width: "30%",
      margin: "0 auto",
    },
    selectType: {
      width: 225,
    },
    selectType1: {
      width: 225,
    },
    selectWeekAndCategory: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      marginTop: 5,
    },
  })
);
interface Props {
  setOpen: Function;
  setOpen1: Function;
}
function AddTasks({ setOpen, setOpen1 }: Props) {
  const closeModal = () => {
    setOpen(false);
    dispatch({
      type: Utils.ActionName.ADD_TODO,
      payload: {
        task: "",
        link: "",
        week: "",
        subject: "",
        category: "",
      },
    });
  };
  const dispatch = useDispatch();
  const { task, description, week, subject, category } = useSelector(
    (state: ReducersModal) => state.addTodoReducer
  );
  const [isDisabled, setIsDisabled] = React.useState(true);
  const { weekData } = useSelector(
    (state: ReducersModal) => state.addTodoWeekReducer
  );
  const { subjectData } = useSelector(
    (state: ReducersModal) => state.addTodoSubjectReducer
  );
  const { categoryData } = useSelector(
    (state: ReducersModal) => state.addTodoCategoryReducer
  );
  const { checklistData } = useSelector(
    (state: ReducersModal) => state.userChecklistReducer
  );
  const [enableTo, setEnableUpto] = React.useState(1);
  React.useEffect(() => {
    if (checklistData.week.length) {
      setEnableUpto(checklistData.week[0].weekDates.week);
    }
  }, [checklistData.week, enableTo]);

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    setValue: Function,
    type: string
  ) => {
    if (type === "week") {
      dispatch({
        type: Utils.ActionName.ADD_TODO,
        payload: {
          week: event.target.value as string,
        },
      });
      if (event.target.value === "Current Week") {
        setValue("week", enableTo);
      } else {
        setValue("week", event.target.value);
      }
    }
    if (type === "subject") {
      dispatch({
        type: Utils.ActionName.ADD_TODO,
        payload: {
          subject: event.target.value as string,
        },
      });
      setValue("subject", event.target.value);
    }
    const subjectFullData = subjectData.find(
      (value: any) => value.subject === event.target.value
    );
    if (subjectFullData) {
      dispatch(getCategories(subjectFullData._id));
      if (categoryData) setIsDisabled(false);
    }
    if (type === "category") {
      dispatch({
        type: Utils.ActionName.ADD_TODO,
        payload: {
          category: event.target.value as string,
        },
      });
      setValue("category", event.target.value);
    }
  };
  const handleDescriptionChange = (value: string) => {
    dispatch({
      type: Utils.ActionName.ADD_TODO,
      payload: {
        description: value,
      },
    });
  };
  React.useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);
  const classes = styles();
  return (
    <div className={classes.container}>
      {weekData && subjectData ? (
        <React.Fragment>
          <CloseModalButton onClick={closeModal} />
          <div className={classes.addTodoContent}>
            <div className={classes.title}>
              <Typography variant="h5">Add task </Typography>
            </div>
            <div className={classes.taskFormContainer}>
              <Formik
                initialValues={{
                  task,
                  // link,
                  description,
                  week,
                  subject,
                  category,
                }}
                validationSchema={Schema.AddTodoSchema()}
                onSubmit={(value, { setSubmitting }) => {
                  let getweek: any;
                  if (week === "Current Week") {
                    getweek = enableTo;
                  } else {
                    getweek = Number(value.week.split(" ")[1]);
                  }
                  let getcategory = value.category;
                  let getSubject = value.subject;
                  const weekFullData = weekData.data.find(
                    (value: any) => value.week === getweek
                  );

                  const categoryFullData = categoryData.find(
                    (value: any) => value.category === getcategory
                  );
                  const subjectFullData = subjectData.find(
                    (value: any) => value.subject === getSubject
                  );
                  const sessionID: any = localStorage.getItem("sessionId");

                  dispatch(
                    addTask(
                      value.task,
                      categoryFullData,
                      sessionID,
                      weekFullData,
                      subjectFullData,
                      description,
                      setSubmitting,
                      closeModal,
                      setOpen,
                      setOpen1
                    )
                  );
                }}
              >
                {({
                  errors,
                  touched,
                  isSubmitting,
                  setFieldValue,
                  handleReset,
                }) => (
                  <Form className={classes.formContainer}>
                    <div className={classes.inputField}>
                      <InputField
                        name="task"
                        placeHolder=""
                        label="Task"
                        type={"text"}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                    <div
                      className={`${classes.inputField} ${classes.inputField3}`}
                    >
                       <Typography variant="body2">Description</Typography>
                      <ReactQuill
                        value={description}
                        onChange={handleDescriptionChange}
                      />
                    </div>

                    <div className={classes.selectWeekAndCategory}>
                      <div className={classes.inputField1}>
                        <Typography variant="body2">Subject</Typography>
                        <TextField
                          className={classes.selectType}
                          select
                          name="subject"
                          value={subject}
                          onChange={(e) =>
                            handleChange(e, setFieldValue, "subject")
                          }
                          error={touched.subject && Boolean(errors.subject)}
                          helperText={touched.subject ? errors.subject : ""}
                          margin="dense"
                          variant="outlined"
                        >
                          <MenuItem disabled value={""}>
                            Select Subject
                          </MenuItem>
                          {subjectData.length &&
                            subjectData.map((value: any) => (
                              <MenuItem value={value.subject} key={value._id}>
                                {value.subject}
                              </MenuItem>
                            ))}
                        </TextField>
                      </div>
                      <div className={classes.inputField1}>
                        <Typography variant="body2">Topics</Typography>
                        <TextField
                          disabled={isDisabled}
                          className={`${classes.selectType} ${classes.selectType1}`}
                          select
                          name="category"
                          value={category}
                          onChange={(e) =>
                            handleChange(e, setFieldValue, "category")
                          }
                          error={touched.category && Boolean(errors.category)}
                          helperText={touched.category ? errors.category : ""}
                          margin="dense"
                          variant="outlined"
                        >
                          <MenuItem disabled value={""}>
                            Select Topic
                          </MenuItem>
                          {categoryData &&
                            categoryData.map((value: any) => (
                              <MenuItem
                                value={`${value.category}`}
                                key={value._id}
                              >
                                {value.category}
                              </MenuItem>
                            ))}
                        </TextField>
                      </div>
                    </div>
                    <div className={classes.inputField1}>
                      <Typography variant="body2">Week</Typography>
                      <TextField
                        className={classes.selectType}
                        select
                        name="week"
                        value={week}
                        onChange={(e) => handleChange(e, setFieldValue, "week")}
                        error={touched.week && Boolean(errors.week)}
                        helperText={touched.week ? errors.week : ""}
                        margin="dense"
                        variant="outlined"
                      >
                        <MenuItem disabled value={""}>
                          Select Week
                        </MenuItem>
                        <MenuItem value={"Current Week"}>Current Week</MenuItem>
                        {weekData.data &&
                          weekData.data.map((value: any, index: number) => {
                           
                              return (
                                <MenuItem
                                  value={`week ${value.week}`}
                                  key={value._id}
                                >
                                  {`Week ${value.week}`}
                                </MenuItem>
                              );
                          })}
                      </TextField>
                    </div>
                    <div className={classes.inputField}></div>
                    <div className={classes.submitFormBtn}>
                      <ActionButton
                        name="Create Task"
                        type={"submit"}
                        isSubmitting={isSubmitting}
                        onPress={() => console.log()}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default AddTasks;
