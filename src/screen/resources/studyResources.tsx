import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SwipableDrawer from "../../components/swipableDrawer/index";
import SwipableDrawerOne from "../../components/swipableDrawer/swipableDrawerOne";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "30px 0",
    },
    title: {
      marginBottom: "-20px",
    },
    filterAndData: {},
  })
);
interface Props {
  title: string;
  filterName1: string;
  filterName2: string;
  filterName3?: string | undefined;
  filterName4: string;
  data: any;
  history: any;
  viewAllUrl: string;
}
function StudyResources({
  title,
  filterName1,
  filterName2,
  filterName3,
  filterName4,
  data,
  history,
  viewAllUrl,
}: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h5">{title}</Typography>
      </div>
      <div className={classes.filterAndData}>
        {filterName3 ? (
          <SwipableDrawer
            filterName1={filterName1}
            filterName2={filterName2}
            filterName3={filterName3}
            filterName4={filterName4}
            data={data}
            history={history}
            viewAllUrl={viewAllUrl}
          />
        ) : (
          <SwipableDrawerOne
            filterName1={filterName1}
            filterName2={filterName2}
            filterName4={filterName4}
            data={data}
            history={history}
            viewAllUrl={viewAllUrl}
          />
        )}
      </div>
    </div>
  );
}

export default StudyResources;
