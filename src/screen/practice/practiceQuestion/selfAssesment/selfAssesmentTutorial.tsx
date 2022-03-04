import { Clear } from "@material-ui/icons";
import LocalImages from "../../../../Utils/images";
import { forwardRef, useImperativeHandle, useState } from "react";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import {
  makeStyles,
  createStyles,
  Theme,
  Dialog,
  Slide,
} from "@material-ui/core";
import ImageContainer from "../../../../components/imageContainer";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ActionButton from "../../../../components/button/index";
import { selftMarkingTutorial } from "../action";
import { useDispatch } from "react-redux";
import Utils from "../../../../Utils";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    paperFullScreen: {
      backgroundColor: "transparent",
    },
    mainContainer: {
      height: "100%",
      width: "100%",
      display: "grid",
      placeItems: "center",
    },
    addTemplateContainer: {
      width: "92%",
      maxHeight: "90% !important",
      overflow: "auto",
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
      borderRadius: "15px",
      position: "relative",
      backgroundColor: "#fff",
      padding: "26px 40px 52px 25px",
      [theme.breakpoints.between(4000, 5500)]: {
        height: "100%",
      },
    },
    headerSecCon: {
      marginTop: "20px",
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
    close: {
      top: 15,
      right: 25,
      borderRadius: "50%",
      position: "absolute",
      background: "#F8F8F8",
      padding: "3px 5px 2px 5px",
      "& svg": {
        fontSize: 15,
      },
    },
    mockContainer: {
      top: 0,
      left: 0,
      zIndex: 9,
      width: "100%",
      opacity: 0.85,
      height: "100%",
      position: "fixed",
      backgroundColor: "#363353",
      "& button": {
        zIndex: 999,
        position: "absolute",
        top: 0,
        left: 0,
      },
    },
    middleContentContainer: {
      marginTop: 10,
      width: "100%",
      height: "52%",
      display: "grid",
      paddingLeft: "6px",
      gridGap: "20px",
      gridTemplateColumns: "32% 32% 32%",
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
    yourAnsCon: {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateRows: "8.68% 91.31%",
    },
    borderViewCon: {
      width: "100%",
      height: "100%",
      position: "relative",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      MozBoxSizing: "border-box",
      WebkitBoxSizing: "border-box",
      padding: "10px 29px 20px 14px",
      border: "solid 1px rgba(0, 0, 0, 0.1)",
    },
    yourAnsFooterCon: {
      width: "92%",
      bottom: "20px",
      display: "flex",
      position: "absolute",
      alignItems: "center",
      justifyContent: "space-between",
    },
    middleItemHeaderCon: {
      width: "100%",
      height: "100%",
      // width: '100%',
      // paddingTop: '19px',
      // marginBottom: '13px',
      "& #yourAnsHeading": {
        fontSize: "18px",
        marginLeft: "6px",
        fontWeight: "bold",
        color: "rgba(63, 67, 74, 0.5)",
      },
    },
    yourAnsViewCon: {
      display: "flex",
      width: "28.88vw",
      marginRight: "1.111vw",
      flexDirection: "column",
    },
    yourAnsViewConOne: {
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
    yourAnsContentCon: {
      width: "100%",
      height: "auto",
      position: "relative",
      backgroundColor: "#ffffff",
      // padding: '31px 29px 20px 14px',
      border: "solid 1px rgba(0, 0, 0, 0.1)",
      "& span": {
        lineHeight: 1.56,
        fontSize: "16px",
      },
    },
    textContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: "red",
    },
    markingCon: {},
    selfMarking: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "10px 0",
    },
    selfMarkingLeftSection: {
      display: "flex",
      alignItems: "center",
      width: "43%",
      "& p": {
        fontSize: "15px",
        color: "#000",
        marginLeft: "-8px",
      },
      "& div": {
        marginRight: 15,
      },
    },
    selfMarkingRightSection: {
      width: "45%",
      display: "flex",
      alignItems: "center",
    },
    selfMarkingCon: {},
    noteCon: {
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
    img: {
      "& figure": {
        width: 15,
        height: 15,
        margin: 0,
      },
    },
    redDot: {
      padding: 5,
      borderRadius: "50%",
      backgroundColor: "#ff7b7b",
    },
    yellowDot: {
      padding: 5,
      borderRadius: "50%",
      backgroundColor: "#fcdd71",
    },
    blueDot: {
      padding: 5,
      borderRadius: "50%",
      backgroundColor: "#00a8d4",
    },
    purpleDot: {
      padding: 5,
      borderRadius: "50%",
      backgroundColor: "#7576f5",
    },
    activeTute: {
      zIndex: 999,
    },
    inputCon: {
      border: "1px solid rgba(0, 0, 0, 0.2)",
      display: "flex",
      alignItems: "center",
      width: "40%",
      padding: 8,
      marginRight: 10,
      "& p": {
        color: "#000",
        fontSize: 16,
        fontWeight: theme.typography.fontWeightMedium,
      },
      "& input": {
        textAlign: "center",
        width: "80%",
        border: "none",
        outline: "none",
      },
    },
    howToUseHeading: {
      position: "fixed",
      [theme.breakpoints.between(1200, 1300)]: {
        top: "38%",
        left: "120px",
      },
      [theme.breakpoints.between(1300, 1450)]: {
        top: "30%",
        left: "120px",
      },
      [theme.breakpoints.between(1460, 1750)]: {
        top: "30%",
        left: "189px",
      },
      [theme.breakpoints.between(1800, 1900)]: {
        top: "30%",
        left: "189px",
      },
      [theme.breakpoints.between(4000, 5500)]: {
        top: "80px",
        left: "650px",
      },
      "& p": {
        fontSize: 20,
        color: "#fff",
        fontWeight: theme.typography.fontWeightBold,
        [theme.breakpoints.between(4000, 5500)]: {
          fontSize: 60,
        },
      },
    },
    rightArrowOne: {
      position: "fixed",
      [theme.breakpoints.between(1200, 1300)]: {
        top: "48%",
        left: "432px",
      },
      [theme.breakpoints.between(1300, 1450)]: {
        top: "48%",
        left: "479px",
      },
      [theme.breakpoints.between(1460, 1680)]: {
        top: "48%",
        left: "538px",
      },
      [theme.breakpoints.between(1690, 1800)]: {
        top: "48%",
        left: "588px",
      },
      [theme.breakpoints.between(1800, 1900)]: {
        top: "29%",
        left: "541px",
      },
      [theme.breakpoints.between(4000, 5500)]: {
        top: "100px",
        left: "1400px",
      },
    },
    rightArrowOneImg: {
      "& figure": {
        width: 150,
        height: 150,
        margin: 0,
        [theme.breakpoints.between(4000, 5500)]: {
          width: 400,
          height: 400,
          margin: 0,
        },
      },
    },
    rightArrowTwo: {
      position: "fixed",
      [theme.breakpoints.between(1200, 1300)]: {
        top: "28%",
        left: "672px",
      },
      [theme.breakpoints.between(1300, 1450)]: {
        top: "27%",
        left: "772px",
      },
      [theme.breakpoints.between(1460, 1680)]: {
        top: "22%",
        left: "912px",
      },
      [theme.breakpoints.between(1690, 1800)]: {
        top: "24%",
        left: "1000px",
      },
      [theme.breakpoints.between(1800, 1900)]: {
        top: "29%",
        left: "1091px",
      },
      [theme.breakpoints.between(4000, 5500)]: {
        top: "100px",
        left: "3091px",
      },
    },
    rightArrowThree: {
      position: "fixed",
      [theme.breakpoints.between(1200, 1300)]: {
        top: "28%",
        left: "745px",
      },
      [theme.breakpoints.between(1300, 1450)]: {
        top: "26%",
        left: "802px",
      },
      [theme.breakpoints.between(1460, 1680)]: {
        top: "22%",
        left: "950px",
      },
      [theme.breakpoints.between(1690, 1800)]: {
        top: "23%",
        left: "1000px",
      },
      [theme.breakpoints.between(1800, 1900)]: {
        top: "29%",
        left: "1091px",
      },
      [theme.breakpoints.between(4000, 5500)]: {
        top: "100px",
        left: "3091px",
      },
    },
    reviewYourAnswwer: {
      position: "fixed",
      [theme.breakpoints.between(1200, 1300)]: {
        top: "59%",
        left: 590,
      },
      [theme.breakpoints.between(1300, 1450)]: {
        top: "58%",
        left: 637,
      },
      [theme.breakpoints.between(1460, 1680)]: {
        top: "57%",
        left: "696px",
      },
      [theme.breakpoints.between(1690, 1800)]: {
        top: "57%",
        left: "746px",
      },
      [theme.breakpoints.between(1800, 1900)]: {
        top: "37%",
        left: "700px",
      },
      [theme.breakpoints.between(4000, 5500)]: {
        top: "310px",
        left: "1800px",
      },
      "& p": {
        fontSize: 20,
        color: "#fff",
        [theme.breakpoints.between(4000, 5500)]: {
          fontSize: 50,
        },
      },
    },
    reviewModalAnswwer: {
      position: "fixed",
      [theme.breakpoints.between(1200, 1300)]: {
        top: "39%",
        left: 832,
      },
      [theme.breakpoints.between(1300, 1450)]: {
        top: "37%",
        left: 937,
      },
      [theme.breakpoints.between(1460, 1680)]: {
        top: "31%",
        left: "1070px",
      },
      [theme.breakpoints.between(1690, 1800)]: {
        top: "32%",
        left: "1157px",
      },
      [theme.breakpoints.between(1800, 1900)]: {
        top: "37%",
        left: "1200px",
      },
      [theme.breakpoints.between(4000, 5500)]: {
        top: "320px",
        left: "3391px",
      },
      // [theme.breakpoints.between(4000, 5500)]: {
      //   top: "100px",
      //   left: "3091px",
      // },
      "& p": {
        fontSize: 20,
        color: "#fff",
        [theme.breakpoints.between(4000, 5500)]: {
          fontSize: 50,
        },
      },
    },
    selfMarkingTute: {
      maxWidth: 200,
      position: "fixed",
      [theme.breakpoints.between(1200, 1300)]: {
        top: "46%",
        left: 631,
      },
      [theme.breakpoints.between(1300, 1450)]: {
        top: "42%",
        left: 733,
      },
      [theme.breakpoints.between(1460, 1680)]: {
        top: "34%",
        left: "849px",
      },
      [theme.breakpoints.between(1690, 1800)]: {
        top: "36%",
        left: "900px",
      },
      [theme.breakpoints.between(1800, 1900)]: {
        top: "38%",
        left: "1000px",
      },
      [theme.breakpoints.between(4000, 5500)]: {
        top: "340px",
        left: "2591px",
        maxWidth: "600px"
      },
      "& p": {
        fontSize: 20,
        color: "#fff",
        [theme.breakpoints.between(4000, 5500)]: {
          fontSize:50
        },
      },
    },
    continueBtn: {
      width: 100,
      position: "fixed",
      top: 40,
      left: "50%",
      transform: "translateX(-50%)",
      [theme.breakpoints.between(4000, 5500)]: {
        width: 200,
        position: "fixed",
        top: 40,
        left: "50%",
        padding:'10px 20px',
        transform: "translateX(-50%)",
        fontSize: 50,
        '& span':{
          fontSize: 50,
        }
      },
    },
    backBtn: {
      width: 100,
      position: "fixed",
      top: 40,
      left: "40%",
      [theme.breakpoints.between(1200, 1500)]: {
        width: 200,
        position: "fixed",
        top: 30,
        left: "45%",
        padding:'10px 20px',
        transform: "translateX(-40%)",
        fontSize: 50,
        '& span':{
          fontSize: 50,
        }
      },
      "&:hover": {
        cursor: "pointer",
      },
      "& p": {
        color: "#fff",
        fontSize: 20,
        [theme.breakpoints.between(4000, 5500)]: {
          fontSize: 50,
        }
      },
    },
  })
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line no-empty-pattern
const SelfAssesmentTutorial = forwardRef(({}, ref) => {
  const [selfMarkingValue] = React.useState({
    issueSporting: "21",
    rule: "55",
    application: "77",
    structure: "34",
  });
  const dispatch = useDispatch();
  const classes = styles();
  const [open, setOpen] = useState(false);
  const [tutorial, setTutorial] = React.useState({
    tute1: true,
    tute2: false,
    tute3: false,
    tute4: false,
  });
  const updateFlow = () => {
    if (tutorial.tute1) {
      setTutorial({ tute1: false, tute2: true, tute3: false, tute4: false });
    } else if (tutorial.tute2) {
      setTutorial({ tute1: false, tute2: false, tute3: true, tute4: false });
    } else if (tutorial.tute3) {
      setTutorial({ tute1: false, tute2: false, tute3: false, tute4: true });
    }
    debugger
  };
  const backFlow = () => {
    if (tutorial.tute2) {
      setTutorial({ tute1: true, tute2: false, tute3: false, tute4: false });
    } else if (tutorial.tute3) {
      setTutorial({ tute1: false, tute2: true, tute3: false, tute4: false });
    }
  };
  React.useEffect(() => {
    if (tutorial.tute4) {
      if (localStorage.getItem("selfAssesmentViewed") === "false") {
        dispatch(selftMarkingTutorial());
        setOpen(false);
        dispatch({
          type: Utils.ActionName.SELF_ASSESSMENT,
          payload: { selfAssesmentOpen: true },
        });
      }
    }
  }, [dispatch, tutorial]);
  useImperativeHandle(ref, () => ({
    openTutorial() {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  const flagQuestionBtn = () => {
    return (
      <div
        className={classes.flagQuesCon}
        style={{ backgroundColor: "#ebeff2" }}
      >
        <img src={LocalImages.FLAG} alt={"flg"} />
        <span style={{ color: "#7a7b7d" }}>{"Flag Question"}</span>
      </div>
    );
  };

  const closeBtn = () => {
    return (
      <div className={classes.close}>
        <Clear />
      </div>
    );
  };

  const headerSection = () => {
    return (
      <div className={classes.headerSecCon}>
        <div className={classes.quesFlagCon}>
          <div className={classes.quesNumHeading}>
            <span>{"QUESTION 5"}</span>
          </div>
          {flagQuestionBtn()}
        </div>
        <div className={classes.quesTitleCon}>
          <span>{"Criminal Procedure:"}</span>
        </div>
        <span className={classes.quesDesc}>
          {
            "The police are making an application to remand My Rayon in custody. He has a number of Children’s Court priors including for assault. threat to inflic seriosly injury and possess a drug of dependence. Can Mr Rayon make an application for bail? Who can grant My Ryon bail? What test will be applied? What consideration would be relevant? [4 marks]"
          }
        </span>
      </div>
    );
  };

  const yourAnswerView = () => {
    return (
      <div
        className={
          tutorial.tute1
            ? `${classes.yourAnsViewCon} ${classes.activeTute}`
            : classes.yourAnsViewCon
        }
      >
        <span className={classes.ansViewHeading}>{"YOUR ANSWER"}</span>
        <div className={classes.borderViewCon}>
          <span>
            S/C Staples can issue a summons (along with the charge) himself for
            the accused’s appearance at Court pursuant to s 14 CPA. If he does
            this, he must file the charge with the Court within 7 days (s
            14(2)). S/C Staples may also file the charges with the Court and
            have the Court issue either a summons or warrant to arrest pursuant
            to s 12 CPA. The Court will only issue a warrant if satisfied on
            evidence (either affidavit or on oath) that the accused is unlikely
            to answer a summons, may abscond or other. Again the accused’s
            priors, personal circumstances, interaction with police and so on
            will be relevant.
          </span>
          <div className={classes.yourAnsFooterCon}>
            <span className={classes.expandTxt}>{"Expand"}</span>
            <span className={classes.wordsCountTxt}>{`Words count 200`}</span>
          </div>
        </div>
      </div>
    );
  };
  const modalAnswerView = () => {
    return (
      <div
        className={
          tutorial.tute2
            ? `${classes.yourAnsViewConOne} ${classes.activeTute}`
            : classes.yourAnsViewConOne
        }
      >
        <span className={classes.ansViewHeading}>{"MODEL ANSWER"}</span>
        <div className={classes.borderViewCon}>
          <span>
            {" "}
            S/C Staples can issue a summons (along with the charge) himself for
            the accused’s appearance at Court pursuant to s 14 CPA. If he does
            this, he must file the charge with the Court within 7 days (s
            14(2)). S/C Staples may also file the charges with the Court and
            have the Court issue either a summons or warrant to arrest pursuant
            to s 12 CPA. The Court will only issue a warrant if satisfied on
            evidence (either affidavit or on oath) that the accused is unlikely
            to answer a summons, may abscond or other. Again the accused’s
            priors, personal circumstances, interaction with police and so on
            will be relevant.
          </span>
          <div className={classes.yourAnsFooterCon}>
            <span className={classes.expandTxt}>{"Expand"}</span>
            <span className={classes.wordsCountTxt}>{`Words count 200`}</span>
          </div>
        </div>
      </div>
    );
  };
  const selfMarking = (color: any, name: string, value: string) => {
    return (
      <div className={classes.selfMarking}>
        <div className={classes.selfMarkingLeftSection}>
          <ImageContainer
            imgUrl={LocalImages.INACTIVE_MARKER}
            style={classes.img}
          />
          <div className={color}></div>
          <Typography variant="body2">{name}</Typography>
        </div>
        <div className={classes.selfMarkingRightSection}>
          <div className={classes.inputCon}>
            <input type="text" value={value} />
            <Typography variant="body2">%</Typography>
          </div>
          <Typography variant="body2">0.5 marks</Typography>
        </div>
      </div>
    );
  };
  const selfAssessmentView = () => {
    const { issueSporting, rule, application, structure } = selfMarkingValue;
    return (
      <div
        className={
          tutorial.tute3
            ? `${classes.yourAnsViewCon} ${classes.activeTute}`
            : classes.yourAnsViewCon
        }
        style={{ marginLeft: "1.181vw" }}
      >
        <span className={classes.ansViewHeading}>{"SELF ASSESMENT"}</span>
        <div className={classes.borderViewCon}>
          <div className={classes.markingCon}>
            <div className={classes.selfMarkingCon}>
              {selfMarking(classes.redDot, "Issue spotting", issueSporting)}
              {selfMarking(classes.yellowDot, "Rule", rule)}
              {selfMarking(classes.blueDot, "Application", application)}
              {selfMarking(classes.purpleDot, "Structure", structure)}
            </div>
            <div className={classes.noteCon}>
              <Typography variant="body2">2 June 2021</Typography>
              <Typography variant="body2">
                It is a long established fact that a reader will be distracted
                by the readable content of a
              </Typography>
            </div>
            <div className={classes.addNoteBtnCon}>
              <button>+ Add Note</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderBackContent = () => {
    return (
      <div className={classes.addTemplateContainer}>
        {closeBtn()}
        {headerSection()}
        <div className={classes.middleContentContainer}>
          {yourAnswerView()}
          {modalAnswerView()}
          {selfAssessmentView()}
        </div>
      </div>
    );
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      classes={{
        paperFullScreen: classes.paperFullScreen,
      }}
    >
      <div className={classes.mainContainer} id="selfmark">
        {renderBackContent()}
      </div>
      <div className={classes.mockContainer}>
        <div className={classes.howToUseHeading}>
          <Typography variant="body2">How to use Self Assessment</Typography>
        </div>
        {/* {tutorial.tute4 ? (
          <React.Fragment></React.Fragment>
        ) : ( */}
        <div className={classes.continueBtn}>
          <ActionButton name="Continue" onPress={updateFlow} />
        </div>

        {tutorial.tute1 ? (
          <React.Fragment>
            <div className={classes.rightArrowOne}>
              <ImageContainer
                imgUrl={LocalImages.RIGHT_ARROW_ONE}
                style={classes.rightArrowOneImg}
              />
            </div>
            <div className={classes.reviewYourAnswwer}>
              <Typography variant="body2">Your answer is here</Typography>
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.backBtn} onClick={backFlow}>
            <Typography variant="body2" style={{ marginTop: "5px" }}>
              Back
            </Typography>
          </div>
        )}
        {tutorial.tute2 ? (
          <React.Fragment>
            <div className={classes.rightArrowTwo}>
              <ImageContainer
                imgUrl={LocalImages.RIGHT_ARROW_ONE}
                style={classes.rightArrowOneImg}
              />
            </div>
            <div className={classes.reviewModalAnswwer}>
              <Typography variant="body2">Here is a model answer</Typography>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {tutorial.tute3 ? (
          <React.Fragment>
            <div className={classes.rightArrowThree}>
              <ImageContainer
                imgUrl={LocalImages.LEFT_ARROW_ONE}
                style={classes.rightArrowOneImg}
              />
            </div>
            <div className={classes.selfMarkingTute}>
              <Typography variant="body2">
                Use the highlighters to help you compare and contrast your
                answer with the model answer and give yourself a score.
              </Typography>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    </Dialog>
  );
});

export default SelfAssesmentTutorial;
