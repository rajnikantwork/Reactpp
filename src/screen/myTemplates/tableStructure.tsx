import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch } from "react-redux";
import Utils from "../../Utils";
import Template from "./template";
import { ConstFunction } from "../../Utils/constFunctions";
import NoDataFound from "../../components/noDataFound/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      marginTop: 50,
      backgroundColor: "#fff",
      borderRadius: "10px",
    },
    tableHead: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #ccc",
      padding: "10px",
      //   justifyContent: "space-between",
    },
    selectAll: {
      minWidth: "11%",
      maxWidth: "11%",
      display: "flex",
      justifyContent: "center",
      "& button": {
        backgroundColor: "#b5b7ca",
        padding: "8px 10px",
        fontSize: 15,
        border: "none",
        opacity: 0.7,
        borderRadius: 5,
        fontFamily: "Roboto, sans-serif",
        "&:hover": {
          cursor: "pointer",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        },
      },
    },
    tableHeadContent: {
      display: "flex",
      alignItems: "center",
      "& p": {
        fontSize: 18,
        [theme.breakpoints.between(1100, 1300)]: {
          fontSize: "15px !important",
        },
        color: "#8a9099",
      },
    },
    tableBody: {},
    icon: {
      "&:hover": {
        cursor: "pointer",
        color: "#000",
      },
    },
    sort: {
      marginLeft: 10,
      display: "flex",
      flexDirection: "column",
      "& svg": {
        fontSize: 15,
        color: "#8a9099",
      },
    },
    week: {
      minWidth: "7%",
      maxWidth: "7%",
      marginLeft: "20px",
      color:'#3f434a'
    },
    subject: {
      minWidth: "12%",
      maxWidth: "12%",
      marginRight: 10,
    },
    title: {
      minWidth: "12%",
      maxWidth: "12%",
      marginRight: 10,
    },
    topics: {
      minWidth: "12%",
      maxWidth: "12%",
      marginRight: 10,
    },
    desc: {
      minWidth: "24%",
      maxWidth: "24%",
      marginRight: 10,
    },
    created: {
      minWidth: "16%",
      maxWidth: "16%",
    },
    createdInner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& svg": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    bodyContent: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #ccc",
      padding: 10,
      "& p": {
        fontSize: "15px !important",
        [theme.breakpoints.between(1100, 1300)]: {
          fontSize: "13px !important",
        },
        maxWidth: "250px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color:'#3f434a',
      },
    },
    checkbox: {},
  })
);
interface Props {
  templatesData: any;
  setOpen: Function;
  setOpen4: Function;
  selectedTemplate: Array<string>;
  selectSingleTemplate: Function;
  selectAllTemplate: Function;
  deleteTemplatee: Function;
}
function TableStructure1({
  templatesData,
  setOpen,
  setOpen4,
  selectedTemplate,
  selectSingleTemplate,
  selectAllTemplate,
  deleteTemplatee,
}: Props) {
  const classes = styles();
  const dispatch = useDispatch();
  const sortData = (sortBy: string, sortOrder: string) => {
    if (sortOrder === "dsc") {
      if (sortBy === "created") {
        dispatch({
          type: Utils.ActionName.GET_TEMPLATES,
          payload: {
            templatesData: {
              data: templatesData.sort((a: any, b: any) =>
                a[sortBy] <= b[sortBy] ? 1 : -1
              ),
            },
          },
        });
      } else {
        dispatch({
          type: Utils.ActionName.GET_TEMPLATES,
          payload: {
            templatesData: {
              data: templatesData.sort((a: any, b: any) =>
                a[sortBy][sortBy] <= b[sortBy][sortBy] ? 1 : -1
              ),
            },
          },
        });
      }
    } else {
      if (sortBy === "created") {
        dispatch({
          type: Utils.ActionName.GET_TEMPLATES,
          payload: {
            templatesData: {
              data: templatesData.sort((a: any, b: any) =>
                a[sortBy] < b[sortBy] ? -1 : 1
              ),
            },
          },
        });
      } else {
        dispatch({
          type: Utils.ActionName.GET_TEMPLATES,
          payload: {
            templatesData: {
              data: templatesData.sort((a: any, b: any) =>
                a[sortBy][sortBy] < b[sortBy][sortBy] ? -1 : 1
              ),
            },
          },
        });
      }
    }
  };
  const getCreationDate = (timestamp: number) => {
    let fullDate = new Date(timestamp);
    let day = fullDate.getDate();
    let mon = fullDate.getMonth() + 1;
    let mont = "";
    mont = mon < 10 ? `0${mon}` : `${mon}`;
    let month = ConstFunction.getMonth(mont);
    let year = fullDate.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const styledProps = {
    selectAll: classes.selectAll,
    weeks: classes.week,
    subjects: classes.subject,
    titles: classes.title,
    topicss: classes.topics,
    descs: classes.desc,
    createds: classes.created,
    bodyContent: classes.bodyContent,
    createdInner: classes.createdInner,
  };
  return (
    <React.Fragment>
      {templatesData && templatesData.length > 0 ? (
        <div className={classes.tableContainer}>
          <div className={classes.tableHead}>
            <div className={classes.selectAll}>
              <button onClick={() => selectAllTemplate()}>
                {selectedTemplate.length >= templatesData.length &&
                templatesData.length > 0
                  ? "Unselect All"
                  : "Select All"}
              </button>
            </div>
            <div className={`${classes.tableHeadContent} ${classes.week}`}>
              <Typography variant="body2">Week</Typography>
            </div>
            <div className={`${classes.tableHeadContent} ${classes.subject}`}>
              <Typography variant="body2">Subject</Typography>
              <div className={classes.sort}>
                <ExpandLessIcon
                  onClick={() => sortData("subject", "dsc")}
                  className={classes.icon}
                />
                <ExpandMoreIcon
                  onClick={() => sortData("subject", "asc")}
                  className={classes.icon}
                />
              </div>
            </div>
            <div className={`${classes.tableHeadContent} ${classes.topics}`}>
              <Typography variant="body2">Topics</Typography>
              <div className={classes.sort}>
                <ExpandLessIcon
                  onClick={() => sortData("category", "dsc")}
                  className={classes.icon}
                />
                <ExpandMoreIcon
                  onClick={() => sortData("category", "asc")}
                  className={classes.icon}
                />
              </div>
            </div>
            <div className={`${classes.tableHeadContent} ${classes.title}`}>
              <Typography variant="body2">Title</Typography>
            </div>
            <div className={`${classes.tableHeadContent} ${classes.desc}`}>
              <Typography variant="body2">Description</Typography>
            </div>
            <div className={`${classes.tableHeadContent} ${classes.created}`}>
              <Typography variant="body2">Created</Typography>
              <div className={classes.sort}>
                <ExpandLessIcon
                  onClick={() => sortData("created", "dsc")}
                  className={classes.icon}
                />
                <ExpandMoreIcon
                  onClick={() => sortData("created", "asc")}
                  className={classes.icon}
                />
              </div>
            </div>
          </div>
          <div className={classes.tableBody}>
            {templatesData.map((value: any) => {
              if (
                value.subject &&
                value.category &&
                value.weekDetails &&
                value.title &&
                value.description
              ) {
                return (
                  <Template
                    key={value._id}
                    _id={value._id}
                    handleChange={selectSingleTemplate}
                    week={value.weekDetails.week}
                    subject={value.subject.subject}
                    topics={value.category.category}
                    title={value.title}
                    desc={value.description}
                    created={getCreationDate(value.created)}
                    selectedTemplate={selectedTemplate}
                    styledProps={styledProps}
                    setOpen={setOpen}
                    setOpen4={setOpen4}
                    deleteTemplatee={deleteTemplatee}
                  />
                );
              } else return <React.Fragment></React.Fragment>;
            })}
          </div>
        </div>
      ) : (
        <NoDataFound title="No Templates Found" />
      )}
    </React.Fragment>
  );
}

export default TableStructure1;
