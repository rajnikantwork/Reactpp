import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ScreenTitle from "../../components/screenTitle/index";
import StudyResources from "./studyResources";
import { useDispatch, useSelector } from "react-redux";
import { resources } from "./action";
import { ReducersModal } from "../../modal/index";
import ResourceSkl from "./skleton";
import Utils from "../../Utils";
import { Helmet, HelmetProvider } from "react-helmet-async";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleAndSearchContainer: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-between",
      },
    },

    title: {
      width: "25%",
    },
    studyResources: {
      marginTop: 60,
    },
  })
);
function Resources(history: any) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(resources());
  }, [dispatch]);
  const { seminars, documents, examAnnouncements } = useSelector(
    (state: ReducersModal) => state.resourceReducer
  );
  const classes = styles();
  return (
    <HelmetProvider>
      <div className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Resources</title>
        </Helmet>
        {seminars && documents && examAnnouncements ? (
          <div>
            <div className={classes.titleAndSearchContainer}>
              <div className={classes.title}>
                <ScreenTitle title="Resources" />
              </div>
            </div>
            <div className={classes.studyResources}>
              <StudyResources
                title={"Documents"}
                filterName1={"All"}
                filterName2={"New"}
                filterName3={"Reading"}
                filterName4={"Read"}
                data={documents}
                history={history}
                viewAllUrl={Utils.Pathname.RESOURCES_DOCUMENTS}
              />
              <StudyResources
                title={"Seminars"}
                filterName1={"All"}
                filterName2={"New"}
                filterName4={"Viewed"}
                data={seminars}
                history={history}
                viewAllUrl={Utils.Pathname.RESOURCES_SEMINARS}
              />
              <StudyResources
                title={"Exam announcements"}
                filterName1={"All"}
                filterName2={"New"}
                filterName3={"Viewing"}
                filterName4={"Viewed"}
                data={examAnnouncements}
                history={history}
                viewAllUrl={Utils.Pathname.RESOURCES_EXAMANNOUNCEMENTS}
              />
            </div>
          </div>
        ) : (
          <ResourceSkl />
        )}
      </div>
    </HelmetProvider>
  );
}

export default Resources;
