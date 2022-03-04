import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ImageContainer from "../../components/imageContainer/index";
import LocalImages from "../../Utils/images";
import Typography from "@material-ui/core/Typography";
import Utils from "../../Utils";
import { useDispatch } from "react-redux";
import AttachFileIcon from "@material-ui/icons/AttachFile";
//@ts-ignore
import S3 from "react-aws-s3";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#f5f6fa",
      borderRadius: 10,
      padding: 10,
      width: "40%",
      marginBottom: 30,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    imgContainer: {
      marginTop: "-30px",
    },
    img: {
      "& figure": {
        width: 30,
        height: 30,
        margin: 0,
      },
    },
    examNo: {
      color: theme.palette.text.primary,
    },
    examResultInput: {
      width: "52%",
      "& input": {
        textAlign: "center",
        borderRadius: 3,
        border: `0.5px solid ${theme.palette.text.primary}`,
        outline: "none",
        width: "90%",
        padding: "7px 0",
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: 18,
      },
    },
    attachPdf: {
      maxWidth: "85%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      "& span": {
        margin: 0,
      },
      "& input": {
        background: "transparent",
        outline: "none",
      },
      "& label": {
        color: theme.palette.primary.main,
        fontSize: 13,
        textDecoration: "underline",
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamily,
        maxWidth: 50,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      "& svg": {
        top: "9px",
        left: "-10px",
        fontSize: 11,
        transform: "rotate(45deg)",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    activeFile: {
      color: `${theme.palette.secondary.main} !important`,
      textDecoration: "none !important",
    },
  })
);
interface Props {
  examNo: string;
  updatePercent: Function;
  fileUrl: string;
  percentage: string;
}
function ExamResult({ examNo, updatePercent, fileUrl, percentage }: Props) {
  const classes = styles();
  const fileRef = React.useRef<any>(null);
  const showRef = React.useRef<any>(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (fileRef && fileRef.current) {
      fileRef.current.addEventListener("change", (e: any) => {
        let file = e.target.files[0];
        let newFileName = e.target.files[0].name;
        let show = newFileName;
        let output = showRef.current;
        output.innerHTML = show;
        output.classList.add(classes.activeFile);
        output.style.fontWeight = "500";
        fileRef.current.disabled = true;
        const config = {
          bucketName: `bar-exam`,
          region: `ap-southeast-2`,
          accessKeyId: `AKIA6DQMUBGGZSBCXSFA`,
          secretAccessKey: `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`,
        };
        const ReactS3Client = new S3(config);
        dispatch({
          type: Utils.ActionName.BACKDROP,
          payload: { backdrop: true },
        });
        ReactS3Client.uploadFile(file, `${newFileName}${new Date().getTime()}`)
          .then((data: any) => {
            updatePercent(examNo, data.location, "file");
            dispatch({
              type: Utils.ActionName.BACKDROP,
              payload: { backdrop: false },
            });
          })
          .catch((err: any) => {
            Utils.showAlert(2, err);
            dispatch({
              type: Utils.ActionName.BACKDROP,
              payload: { backdrop: false },
            });
          });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const downloadPdf = () => {
    window.open(fileUrl, "_blank", "noopener noreferrer");
  };
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <ImageContainer
          imgUrl={LocalImages.SELF_ASSESSMENT}
          style={classes.img}
        />
      </div>
      <div className={classes.examNo}>
        <Typography variant="body2">Exam {examNo}</Typography>
      </div>
      <div className={classes.examResultInput}>
        <input
          type="text"
          value={percentage}
          onChange={(e) => updatePercent(examNo, e.target.value, "input")}
        />
      </div>
      <div className={classes.attachPdf}>
        {fileUrl !== "" ? (
          <AttachFileIcon onClick={downloadPdf} />
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {fileUrl !== "" ? (
          <span>{new URL(fileUrl).pathname.slice(1)}</span>
        ) : (
          <React.Fragment>
            {" "}
            <input
              ref={fileRef}
              type="file"
              name="Attach PDF"
              hidden
              accept="application/pdf,application/vnd.ms-excel"
              id={`fileNo${examNo}`}
            />
            <label htmlFor={`fileNo${examNo}`} id="selector" ref={showRef}>
              Attach PDF
            </label>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ExamResult;
