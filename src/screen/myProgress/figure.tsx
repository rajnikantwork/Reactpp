import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ImageContainer from "../../components/imageContainer/index";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "15px 5px",
      backgroundColor: "#fff",
      borderRadius: 10,
      margin: 5,
      width: "14%",
      [theme.breakpoints.down('sm')]:{
        width: "28.5%",
        marginBottom:15
    },
      [theme.breakpoints.down('xs')]:{
          width: "26%"
      },
      alignItems: "center",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
    },
    imgContainer: {
      marginTop: "-30px",
    },
    img: {
      "& figure": {
        width: 40,
        height: 40,
        margin: 0,
      },
    },
    fieldName: {
      color: theme.palette.text.primary,
      margin: "5px 0",
      fontSize: 14,
    },
    value: {
      color: "#3f434a",
    },
  })
);
interface Props {
  img: string;
  fieldName: string;
  value: string|number;
}
function Figure({ img, fieldName, value }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <ImageContainer imgUrl={img} style={classes.img} />
      </div>
      <div className={classes.fieldName}>
        <Typography variant="body2">{fieldName}</Typography>
      </div>
      <div className={classes.value}>
        <Typography variant="h5">{value}</Typography>
      </div>
    </div>
  );
}

export default Figure;
