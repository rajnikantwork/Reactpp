import React from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    viewAll: {
      position: "absolute",
      bottom: "-20px",
      right: "0px",
      display: "flex",
      alignItems: "center",
      "& p": {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.primary.main,
        marginRight: 5,
      },
      "& svg": {
        color: theme.palette.primary.main,
        transition: "all 0.2s ease-in-out",
      },
      "&:hover": {
        cursor: "pointer",
        "& svg": {
          transform: "translateX(10px)",
        },
      },
    },
  })
);
interface Props {
  data: any;
  url: string;
}
function ViewAllRoute({ data, url}: Props) {
  const classes = styles();
  const history = useHistory();
  const viewAllRoute = (url: string) => {
    history.push(url);
  };

  return (
    <React.Fragment>
      {data.length > 3 ? (
        <div className={classes.viewAll} onClick={() => viewAllRoute(url)}>
          <Typography variant="body2">View All</Typography>
          <ArrowForwardIcon />
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ViewAllRoute;
