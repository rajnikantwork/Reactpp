import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { withRouter } from "react-router";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ScreenTitle from "../../../components/screenTitle/index";
import CustomizedAccordions from "./accortion";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../../modal/index";
import { useDispatch } from "react-redux";
import { topicsDetails } from "../action";
import TopicsSkl from './topicsSkl'
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "10px",
    },
    backTo: {
      marginLeft: "-10px",
      "& p": {
        display: "flex",
        alignItems: "center",
        "& a": {
          color: "#000",
          fontSize: 16,
          textDecoration: "none",
        },
      },
    },
    title: {
      marginTop: 10,
    },
    subjectDetail: {
      marginTop: 20,
    },
  })
);
function Topic() {
  const { topicDetails } = useSelector(
    (state: ReducersModal) => state.dashboardSubjectDetailReducer
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(topicsDetails());
  }, [dispatch]);
  const classes = styles();
  return (
    <div className={classes.container}>
      {topicDetails.data ? (
        <React.Fragment>
          <div className={classes.backTo}>
            <Typography variant="body2">
              <ChevronLeftIcon />
              <Link to="/myprogress">Back to My Progress</Link>
            </Typography>
          </div>
          <div className={classes.title}>
            <ScreenTitle title={"Topics"} />
          </div>
          <div className={classes.subjectDetail}>
            {topicDetails && topicDetails.data.map((value: any) => {
              return (
                <CustomizedAccordions
                  key={value._id}
                  title={value.subject}
                  totalQuestions={value.totalAnsweredQuestions}
                  retries={value.retries}
                  percentage={
                    (value.totalAnsweredQuestions / value.questions) * 100
                  }
                  category={value.category}
                />
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        <TopicsSkl />
      )}
    </div>
  );
}

export default withRouter(Topic);
