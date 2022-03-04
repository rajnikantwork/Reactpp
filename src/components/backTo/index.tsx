import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Utils from "../../Utils"
const styles = makeStyles((theme: Theme) =>
  createStyles({
    backTo: {
      textAlign: "center",
      margin: "30px 0 5px 0",

      "& a": {
        color: theme.palette.primary.main,
        textDecoration: "none",
      },
    },
  })
);
interface Props {
  value: string;
}
const BackTo = ({ value }: Props) => {
  const classes = styles();
  return (
    <div className={classes.backTo}>
      <Typography variant="body2">
        <Link to={Utils.Pathname.LOGIN}>{value}</Link>
      </Typography>
    </div>
  );
};
export default BackTo;
