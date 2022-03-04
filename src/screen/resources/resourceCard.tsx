import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LocalImages from "../../Utils/images";
import ImageContainer from "../../components/imageContainer/index";
import ActionButton from "../../components/button/index";
import { saveResources, unSaveResources } from "./action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import {useSelector} from "react-redux";
// import {ReducersModal} from "../../modal/index"
import { markSeminarAsRead } from "./action";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "30%",
      margin: "20px 10px",
      background: "#fff",
      maxHeight: 300,
      position: "relative",
      minHeight: 300,
    },
    dateAndPin: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 22px 10px 10px",
      borderBottom: "2px dashed #ccc",
    },
    titleAndContent: {
      padding: "10px 20px 15px 20px",
      "& p": {
        color: "#3f434a",
      },
    },
    title: {
      "&:hover": {
        cursor: "pointer",
      },
      "& p": {
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    content: {
      minHeight: "180px",
    },
    innerContent: {
      minHeight: "180px",
      "&:hover": {
        cursor: "pointer",
      },
    },
    span: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      borderTop: `30px solid ${theme.palette.primary.main}`,
      borderRight: "30px solid transparent",
    },
    date: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      "& p": {
        marginLeft: 8,
        color: "#595f69",
      },
    },
    pin: {
      width: "10%",
      "&:hover": {
        cursor: "pointer",
      },
    },
    calender: {
      marginLeft: "9px",
      "& figure": {
        width: 20,
        height: 20,
        margin: 0,
      },
    },
    pdf: {
      overflow: "hidden",
      maxHeight: 100,
      margin: "0px !important",
      "& canvas": {
        width: "100% !important",
        height: "auto !important",
      },
      "& div": {
        maxWidth: "280px !important",
      },
    },
    videoLink: {
      maxWidth: 280,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      "& span": {
        fontSize: 17,
        color: `${theme.palette.primary.main} !important`,
        textDecoration: "underline",
        "&:hover": {
          cursor: "pointer",
        },
      },
      marginTop: 30,
    },
    actionBtn: {
      position: "absolute",
      bottom: 20,
      right: 20,
      // display: "flex",
      // justifyContent: "flex-end",
      "& div": {
        width: 133,

        "& button": {
          fontWeight: theme.typography.fontWeightLight,
        },
      },
    },
  })
);
interface Props {
  title: string;
  subTitle: string;
  date: string;
  onClick?: Function | undefined;
  id?: string;
  isSaved?: number;
  type?: string | undefined;
  url?: string | undefined;
  urlType?: string | undefined;
  readStatus?: string | undefined;
  thumb?: string;
  speaker?: string
}
function ResourceCard({
  title,
  subTitle,
  date,
  onClick = () => null,
  id,
  isSaved,
  type,
  url,
  urlType,
  readStatus,
  thumb,
  speaker,
}: Props) {
  const classes = styles();
  const dispatch = useDispatch();
  const history = useHistory();
  const route = history.location.pathname.split("/");
  const saveResource = (resId: string | undefined, cmd: string) => {
    if (cmd === "save")
      dispatch(saveResources(resId, type, readStatus, route[route.length - 1]));
    if (cmd === "unsave")
      dispatch(
        unSaveResources(resId, type, readStatus, route[route.length - 1])
      );
  };
  const openUrlAndUpdateReading = (id: any, url: any) => {
    onClick(id, urlType);
    if (history.location.pathname === "/resources") {
      dispatch(markSeminarAsRead(id, "seminars", "resources"));
    } else {
      dispatch(markSeminarAsRead(id, "seminars", "all"));
    }

    window.open(url, "_blank", "noopener noreferrer");
  };
  const [linkUrl, setLinkUrl] = React.useState<any>(url);
  if (linkUrl.indexOf("http://") === 0 || linkUrl.indexOf("https://") === 0) {
  } else {
    setLinkUrl(`https://${linkUrl}`);
  }
  return (
    <div className={classes.container}>
      <div className={classes.dateAndPin}>
        <span className={classes.span}></span>
        <div className={classes.date}>
          <ImageContainer
            imgUrl={LocalImages.CALENDER}
            style={classes.calender}
          />
          <Typography variant="body2">{date}</Typography>
        </div>
        {isSaved === 0 ? (
          <div className={classes.pin} onClick={() => saveResource(id, "save")}>
            <ImageContainer
              imgUrl={LocalImages.PUSHPIN_SAVED}
              style={classes.calender}
            />
          </div>
        ) : (
          <div
            className={classes.pin}
            onClick={() => saveResource(id, "unsave")}
          >
            <ImageContainer
              imgUrl={LocalImages.PUSHPIN}
              style={classes.calender}
            />
          </div>
        )}
      </div>
      <div className={classes.titleAndContent}>
        <div onClick={() => onClick(id, urlType)} className={classes.content}>
          <div className={classes.title}>
            <Typography variant="body1">{title}</Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: 500, fontSize: 15 }}
            >
              {subTitle}
            </Typography>
          </div>
          {thumb === "" ? (
            <div className={classes.innerContent}></div>
          ) : (
            <div style={{ minHeight: 200, maxHeight: 200 }}>
              <img
                onClick={() => openUrlAndUpdateReading(id, linkUrl)}
                src={thumb}
                alt="thumbnail"
                style={{ width: "100%", borderRadius: "5px", margin:'5px 0'}}
              />
              <Typography variant="body1">Speaker: {speaker}</Typography>
            </div>
          )}
        </div>
        {thumb === "" ? (
          <div className={classes.actionBtn}>
            <div>
              <ActionButton
                name="Download PDF"
                type="button"
                custom={true}
                onPress={() => window.open(url)}
              />
            </div>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ResourceCard;
