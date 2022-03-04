import React from "react";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import LocalImages from "../../Utils/images";
import { ReducersModal } from "../../modal/index";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import SwitchIOS from "../../components/IosSwitch/index";
import ImageContainer from "../../components/imageContainer/index";
import Utils from "../../Utils";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    info: {
      marginTop: -2,
      marginRight: 6,
      "& figure": {
        margin: 0,
        width: 15,
        height: 15,
      },
    },
  })
);
const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 12,
  },
}));
function BootstrapTooltip(props: TooltipProps) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
function TimeLimit() {
  const classes = styles();
  const dispatch = useDispatch();
  const { enable } = useSelector(
    (state: ReducersModal) => state.practiceQuestionTimeLimitReducer
  );
  const toggleTimeLimit = () => {
    dispatch({
      type: Utils.ActionName.TIME_LIMIT,
      payload: { enable: !enable },
    });
  };
  return (
    <React.Fragment>
      <BootstrapTooltip title="Switch on for time bound tests">
        <span>
          <ImageContainer imgUrl={LocalImages.INFO} style={classes.info} />
        </span>
      </BootstrapTooltip>
      <SwitchIOS
        title={"Time Limit"}
        checked={enable}
        toggleSwitch={toggleTimeLimit}
      />
    </React.Fragment>
  );
}

export default TimeLimit;
