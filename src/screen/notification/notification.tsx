import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import LocalImages from "../../Utils/images";
import ImageContainer from "../../components/imageContainer/index";
import Typography from "@material-ui/core/Typography";
const { formatDistance } = require("date-fns");

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "10px 0",
    },
    readDot: {
      backgroundColor: theme.palette.primary.main,
      position: "absolute",
      left: "-20px",
      top: "50%",
      padding: 4,
      borderRadius: "50%",
    },
    leftContent: {
      width: "70%",
      display: "flex",
      alignItems: "center",
      "& p": {
        marginLeft: 20,
        color: "#000",
        fontSize: 18,
      },
      "& span": {
        marginRight: 10,
        color: "#000",
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    img: {
      "& figure": {
        width: "40",
        height: "40",
        margin: 0,
      },
    },
    rightContent: {
      width: "12%",
    },
  })
);
interface Props {
  title: string;
  message: string;
  isRead: boolean;
  created: number;
}
function NotificationCard({ title, message, isRead, created }: Props) {
  const classes = styles();
  const getTimeAge = (timestamp: number) => {
    const notificationCreated = new Date(timestamp);
    const presentDay = new Date();
    let result = formatDistance(presentDay, notificationCreated);
    return `${result} ago`;
  };
  return (
    <div className={classes.container}>
      {!isRead ? (
        <div className={classes.readDot}></div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <div className={classes.leftContent}>
        <ImageContainer
          imgUrl={LocalImages.QUESTION_DONE}
          style={classes.img}
        />
        <Typography variant="body2">
          <span>{title}</span>
          {message}
        </Typography>
      </div>
      <div className={classes.rightContent}>
        <Typography variant="body2">{getTimeAge(created)}</Typography>
      </div>
    </div>
  );
}

export default NotificationCard;
