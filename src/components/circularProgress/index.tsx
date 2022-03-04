import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    containerOne: {
      padding: 0,
      minWidth: "100%",
      margin:'10px 0'
    },
    container: {
      padding: 0,
      width: "80px",
    },
  })
);
interface Props {
  value: number;
  type?: string;
  color?: string;
}
const CircularProgress = ({ value, type,color }: Props) => {
  const classes = styles();
  return (
    <div className={type === 'graph'? classes.containerOne: classes.container}>
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={value}
        duration={1.4}
        easingFunction={easeQuadInOut}
      >
        {(val: any) => {
          const roundedValue = Math.round(type === "graph" ? val / 10 : val);
          return (
            <CircularProgressbar
              value={val}
              strokeWidth={9}
              text={type === "graph" ? `${roundedValue}` : `${roundedValue}%`}
              styles={{
                path: {
                  transition: "none",
                  stroke: color ? `${color}`:"#2aaebc",
                },
                trail:{
                  stroke:color ? `${color}33`: ""
                },
                text: {
                  fill: "#000",
                  fontWeight: "bold",
                },
              }}
            />
          );
        }}
      </AnimatedProgressProvider>
    </div>
  );
};
export default CircularProgress;
