
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import React from "react";
import ImageContainer from "../imageContainer/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    btnContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: theme.palette.primary.main,
      padding: 10,
      borderRadius: 4,
      fontWeight: theme.typography.fontWeightMedium,
      transition:'all 0.2s ease',
      "&:hover": {
        cursor: "pointer",
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      },
    },
    btn: {
      marginLeft: 5,
      width: "100%",
      color: "#fff",
      fontSize: "15px",
      textTransform: "capitalize",
      "& svg": {
        color: "#fff",
        fontSize: "20px",
      },
      "&:hover": {
        background: theme.palette.primary.main,
      },
    },
    img: {
     
      "& figure": {
        margin: "0 0 1px 0",
        width: 15,
        height: 15,
      },
    },
  })
);

interface Props {
  name: string;
  type: "button";
  onPress: Function;
  imgUrl: string;
}
const ActionButtonWithImg = ({
  name,
  type = "button",
  onPress,
  imgUrl,
}: Props) => {
  const classes = styles();
  return (
    <div className={classes.btnContainer} onClick={() => onPress()}>
      <ImageContainer imgUrl={imgUrl} style={classes.img} />
      <div className={classes.btn} >
        {name}
      </div>
    </div>
  );
};
export default ActionButtonWithImg;
