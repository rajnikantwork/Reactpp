import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      width: "100%",
      background: theme.palette.primary.main,
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
  })
);
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
interface Props {
  name?: string;
  type?: "submit" | "reset" | "button";
  isSubmitting?: boolean;
  onPress: Function;
  custom?: boolean;
}
const ActionButton = ({
  name,
  type = "submit",
  isSubmitting,
  onPress,
  custom = false,
}: Props) => {
  const classes = styles();

  if (custom) {
    return (
      <Button
        className={classes.btn}
        variant="contained"
        type={type}
        onClick={() => onPress()}
      >
      {name}
      </Button>
    );
  } else
    return (
      <Button
        className={classes.btn}
        variant="contained"
        type={type}
        onClick={() => onPress()}
      >
        {isSubmitting ? (
          <PulseLoader
            color={"#fff"}
            loading={isSubmitting}
            css={override}
            size={10}
            margin={2}
          />
        ) : (
          name
        )}
      </Button>
    );
};
export default ActionButton;
