import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { resourcesDetails } from "./action";
import { ReducersModal } from "../../modal/index";
import Typography from "@material-ui/core/Typography";
import Utils from "../../Utils";
import ActionButton from "../../components/button/index";
import ResourceDetailsSkl from "./resourceDetailsSkl";
import { markAsRead } from "./action";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CloseModalButton from "../../components/button/closeModalButton";
import { useHistory } from "react-router";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      minHeight: 500,
    },
    innerContainer: {},
    titleAndSubTitle: {
      paddingTop: 50,
      marginBottom: 10,
      minHeight: 80,
      "& h5": {
        fontSize: 24,
        fontWeight: theme.typography.fontWeightMedium,
      },
      "& h6": {
        fontSize: 22,
        fontWeight: theme.typography.fontWeightLight,
      },
    },
    content: {
      minHeight: 300,
    },
    pdf: {
      overflowY: "scroll",
      overflowX: "hidden",
      maxHeight: 300,
      margin: "0px 0 20px 0 !important",
      "& canvas": {
        width: "100% !important",
        height: "750px !important",
      },
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
      '& .react-pdf__message--no-data':{
        textAlign: "center",
      }
    },
    pgActionBtn: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: 10,
      "& button": {
        width: "70px",
        padding: "5px",
        color: "#fff",
        fontSize: 10,
        marginLeft: 10,
      },
    },
    extraDetails: {
      display: "flex",
      alignItems: "center",
      "& div": {
        marginRight: 5,
        "& p": {
          textTransform: "capitalize !important",
          fontSize: 16,
        },
      },
    },
    divider: {
      maxHeight: 18,
      overflow: "hidden",
      marginTop: -5,
    },
    actionBtn: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& div": {
        width: 150,
        "&:nth-child(1)": {
          "& button": {
            backgroundColor: "#ebeff2",
            color: "#000",
          },
        },
      },
    },
  })
);
interface Props {
  setOpen: Function;
  detailId?: string;
  type?: any;
}
function ResourceDetails({ setOpen, detailId = "" }: Props) {
  const classes = styles();
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numPage, setNumPages] = React.useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageNumber, setPageNumber] = React.useState(1);
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  const [read, setRead] = React.useState(true)
  function removeTextLayerOffset() {
    const textLayer = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayer.forEach((layer) => {
      const { style }: any = layer;
      style.top = 0;
      style.left = 0;
      style.transform = "";
    });
  }
  React.useEffect(() => {
    dispatch(resourcesDetails(detailId));
  }, [detailId, dispatch]);
  const { data } = useSelector(
    (state: ReducersModal) => state.resourcesDetailsReducer
  );
  let path = history.location.pathname.split("/");
  const markDocumentead = () => {
    setRead(false)
    dispatch(markAsRead(detailId, data.type, path[path.length - 1]));
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch({
        type: Utils.ActionName.RESOURCES_DETAILS,
        payload: {
          data: {},
        },
      });
    }, 200);
  };
  return (
    <div className={classes.container}>
      {data._id ? (
        <React.Fragment>
          <CloseModalButton onClick={handleClose} />

          <div className={classes.innerContainer}>
            <div className={classes.titleAndSubTitle}>
              <Typography variant="h5">{data.title}</Typography>
              <Typography variant="h6">{data.subTitle}</Typography>
              <div className={classes.extraDetails}>
                {data.category ? (
                  <React.Fragment>
                    <div>
                      <Typography variant="body2">
                        Category: {data.category}
                      </Typography>
                    </div>
                    <div className={classes.divider}>|</div>{" "}
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                {data.subject ? (
                  <React.Fragment>
                    <div>
                      <Typography variant="body2">
                        Subject: {data.subject}
                      </Typography>
                    </div>
                    <div className={classes.divider}>|</div>{" "}
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                {data.week? (
                  <div>
                    <Typography variant="body2">
                      Week: {data.week[0]}
                    </Typography>
                  </div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
            </div>
            <div className={classes.content}>
              {data.urlType === "pdf" ? (
                <React.Fragment>
                  <div className={classes.pdf}>
                    <Document
                      file={data.url}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      {Array.apply(null, Array(numPage))
                        .map((x, i) => i + 1)
                        .map((page) => (
                          <Page
                            pageNumber={page}
                            onLoadSuccess={removeTextLayerOffset}
                          />
                        ))}
                    </Document>
                  </div>
                </React.Fragment>
              ) : (
                <div>content</div>
              )}
            </div>
            <div className={classes.actionBtn}>
              <div>
                {read && data && data.readStatus !== "read" ? (
                  <ActionButton
                    name="Mark as Read"
                    type={"button"}
                    onPress={markDocumentead}
                  />
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
              <div>
                <ActionButton
                  name="Download PDF"
                  type={"button"}
                  onPress={() => window.open(data.url)}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <ResourceDetailsSkl />
      )}
    </div>
  );
}

export default ResourceDetails;
