import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      "& h4": {
        fontSize: 30,
        fontWeight: theme.typography.fontWeightBold,
        color:'#030c29'
      },
    },
  })
);
interface Props {
  title: string;
}
function ScreenTitle({ title }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography variant="h4">{title}</Typography>
    </div>
  );
}

export default ScreenTitle;
