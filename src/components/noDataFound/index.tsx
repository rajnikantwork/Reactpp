import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        justifyContent:'center',
        display: 'flex',
      "& p": {
        marginTop: 50,
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.primary.main,
        fontSize: 20,
        marginBottom: 50,
      },
    },
  })
);
interface Props {
  title: string;
}
function NoDataFound({ title }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography variant="body1">{title}</Typography>
    </div>
  );
}

export default NoDataFound;
