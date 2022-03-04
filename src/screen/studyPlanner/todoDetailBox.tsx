import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#cdd7de",
      minWidth:70,
      padding: "5px 10px",
      borderRadius: 3,
      textAlign: "center",
      "& p": {
          textTransform: "capitalize",
        fontsize: 15,
        color: "#767f85 !important",
        textDecoration: "none !important",
      },
    },
  })
);
interface Props {
  title: any;
}
function TodoDetailBox({ title }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography variant="body2">{title}</Typography>
    </div>
  );
}

export default TodoDetailBox;
