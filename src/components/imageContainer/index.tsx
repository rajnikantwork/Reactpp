import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
const styles = makeStyles((theme) =>
  createStyles({
    imgContainer: {
      "& img": {
        width: "100%",
        height: "100%",
      },
    },
  })
);
interface Props {
  style: any;
  imgUrl:string;
}
function ImageContainer({ style, imgUrl }: Props) {
  const classes = styles();
  return (
    <div className={`${classes.imgContainer} ${style}`}>
      <figure>
        <img src={imgUrl} alt="brand_logo" />
      </figure>
    </div>
  );
}

export default ImageContainer;
