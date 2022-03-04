import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocalImages from "../../Utils/images";
import ImageContainer from "../../components/imageContainer/index";
import { ConstFunction } from "../../Utils/constFunctions";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    questionContainer: {
      padding: 15,
      margin: "10px 0",
      border: "1px solid rgba(205,215,222)",
      borderRadius: 8,
      backgroundColor: "#ebeff2",
      transition: "all 0.2s ease",
      "&:hover": {
        cursor: "pointer",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        "& img": {
          transform: "translateX(10px)",
        },
      },
    },
    heading: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
    index: {
      minHeight: 20,
      maxHeight: 20,
      minWidth: 20,
      borderRadius: "50%",
      border: "2px solid red",
      padding: "6px 8px 8px 8px",
      display: "flex",
      justifyContent: "center",
      verticalAlign: "middle",
      "& p": {
        fontSize: 17,
        fontWeight: theme.typography.fontWeightMedium,
        color: "#000",
      },
    },
    title: {
      [theme.breakpoints.between(1100,1290)]:{
        width:'58%'
      },
      width: "64%",
      marginLeft: 10,
      display: "flex",
      flexDirection: "column",
      "& p": {
        "&:nth-child(1)": {
          color: "#243847",
          fontWeight: theme.typography.fontWeightMedium,
        },
        "&:nth-child(2)": {
          maxWidth: "450px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
    },
    avgScoreContainer: {
      width: "13%",
    },

    avgScore: {
      width: "70px",
      borderRadius: 5,
      backgroundColor: "rgba(205,215,222,0.5)",
      padding: 10,
      textAlign: "center",
      "& p": {
        color: "#767f85",
      },
    },
    lastAttempt: {
      width: "18%",
      "& p": {
        color: "#000",
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    arrowStyle: {
      "& figure": {
        margin: 0,
        width: 20,
        height: 20,
        "& img": {
          transition: "all 0.4s ease",
          transform: "translateX(0)",
        },
      },
    },
  })
);

interface Props {
  onItemClick: Function;
  avgScore: number;
  subject: string;
  week: number;
  question: string;
  lastAttempt: number;
  qNo: number;
  isFlag: number;
  questionStatus: string;
}

export default function Subject({
  onItemClick,
  avgScore,
  subject,
  week,
  question,
  lastAttempt,
  qNo,
  isFlag,
  questionStatus,
}: Props) {
  const classes = useStyles();
  const getLastAttepmtTime = (timeStamp: number) => {
    let fullTime: any = new Date(timeStamp);
    let date = fullTime.getDate();
    let mon = fullTime.getMonth() + 1;
    let mont = "";
    mont = mon < 10 ? `0${mon}` : `${mon}`;
    let month = ConstFunction.getMonth(mont);
    let time = fullTime.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${month} ${time}`;
  };
  let color = "transparent";
  if (isFlag === 1) {
    color = "#fdb338";
  } else if (questionStatus === "attempt") {
    color = "#31c39f";
  } else if (questionStatus === "skiped") {
    color = "#ff7b7b";
  }
  return (
    <div className={classes.questionContainer} onClick={() => onItemClick()}>
      <div className={classes.heading}>
        <div className={classes.index} style={{ borderColor: `${color}` }}>
          <Typography variant="body2">{qNo}</Typography>
        </div>
        <div className={classes.title}>
          <Typography variant="body1">
            Week {week} {subject}
          </Typography>
          <Typography variant="body2">
            {question.replace(/<[^>]*>/g, "")}
          </Typography>
        </div>
        <div className={classes.avgScoreContainer}>
          <div className={classes.avgScore}>
            <Typography variant="body2">{Math.round(avgScore)}%</Typography>
          </div>
        </div>

        <div className={classes.lastAttempt}>
          {lastAttempt !== 0 ? (
            <Typography variant="body2">
              {getLastAttepmtTime(lastAttempt)}
            </Typography>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
        <div>
          <ImageContainer
            imgUrl={LocalImages.RIGHT_ARROW}
            style={classes.arrowStyle}
          />
        </div>
      </div>
    </div>
  );
}
