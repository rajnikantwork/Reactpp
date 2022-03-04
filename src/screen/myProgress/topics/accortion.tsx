import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import CircularProgress from "../../../components/circularProgress/index";
import NoDataFound from "../../../components/noDataFound/index";
import {useHistory} from "react-router-dom"
const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "#ebeff2",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },

  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);
const styles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    question: {
      display: "flex",
      alignItems: "center",
      color: "#243847",
      "& span": {
        margin: "0 12px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "1px",
        height: "10px",
      },
    },
    subjectTitle: {
      "& h6": {
        textTransform: "capitalize",
        color: "#243847",
      },
    },
    leftContent: {
      width: "50%",
    },
    rightContent: {
      width: "10%",
    },
    accordianDetails: {
      padding: 15,
      width: "100%",
    },
    titleBar: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f5f6fa",
      padding: 8,
      "& p": {
        color: "#030c29",
        fontSize: 15,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    details: {
      width: "100%",
      border: "1px solid #f3f3f3",
      padding: 8,
      margin: "5px 0",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& p": {
        color: "#030c29",
        fontSize: 15,
      },
      "& button": {
        width: "100%",
        padding: 8,
        backgroundColor: theme.palette.primary.main,
        outline: "none",
        border: "none",
        color: "#fff",
        borderRadius: 4,
        '&:hover':{
          cursor: "pointer",
        }
      },
    },
  })
);
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);
interface Props {
  title: string;
  totalQuestions: number;
  retries: number;
  percentage: number;
  category: any;
}
export default function CustomizedAccordions({
  title,
  totalQuestions,
  retries,
  percentage,
  category,
}: Props) {
  const classes = styles();
  const history = useHistory();
  return (
    <div style={{ marginBottom: 20 }}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <div className={classes.main}>
            <div className={classes.leftContent}>
              <div className={classes.subjectTitle}>
                <Typography variant="h6">{title}</Typography>
              </div>
              <div className={classes.question}>
                <Typography variant="body1">
                  {totalQuestions} Questions{" "}
                </Typography>
                <span></span>
                <Typography variant="body1"> {retries} Retries</Typography>
              </div>
            </div>
            <div className={classes.rightContent}>
              <CircularProgress value={percentage} />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.accordianDetails}>
            {category.length > 0 ? (
              <React.Fragment>
                <div className={classes.titleBar}>
                  <div style={{ width: "40%" }}>
                    <Typography variant="body2">Topics</Typography>
                  </div>
                  <div style={{ width: "40%" }}>
                    <Typography variant="body2">Avg. Score</Typography>
                  </div>
                </div>
                {category &&
                  category.map((value: any) => {
                    return (
                      <div className={classes.details} key={value._id}>
                        <div style={{ width: "40%" }}>
                          <Typography variant="body2">
                            {value.category}
                          </Typography>
                        </div>
                        <div style={{ width: "40%" }}>
                          <Typography variant="body2">
                            {value.avgScore === 0 ? value.avgScore : value.avgScore.toFixed(2)}
                          </Typography>
                        </div>
                        <div style={{ width: "18%" }}>
                          <button onClick={() => history.push('/practice')}>Practice Questions</button>
                        </div>
                      </div>
                    );
                  })}
              </React.Fragment>
            ) : (
              <NoDataFound title="No data found" />
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
