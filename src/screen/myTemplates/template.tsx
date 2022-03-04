import React from "react";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import {
  withStyles,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { templateDetails } from "./action";
import { useDispatch } from "react-redux";
import { getCategories } from "../studyPlanner/action";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      left: "-50px !important",
      top: "0px !important",
      '&:focus':{
        outline: "none",
      }
    },
    dropdownContent: {
      padding: 5,
      borderRadius: 7,
      width: 150,
    },
    content: {
      padding: 5,
      display: "flex",
      alignItems: "center",
      '&:focus':{
        outline: "none",
      },
      "&:hover": {
        cursor: "pointer",
        "& p": {
          color: theme.palette.primary.main,
        },
        "& svg": {
          color: theme.palette.primary.main,
        },
      },
      "& p": {
        marginLeft: 5,
      },
    },
  })
);
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
interface Props {
  _id: string;
  handleChange: Function;
  week: string;
  subject: string;
  topics: string;
  title: string;
  desc: string;
  created: string;
  selectedTemplate: any;
  styledProps: any;
  setOpen: Function;
  setOpen4: Function;
  deleteTemplatee: Function;
}
function Template({
  _id,
  handleChange,
  week,
  subject,
  topics,
  title,
  desc,
  created,
  selectedTemplate,
  styledProps,
  setOpen,
  setOpen4,
  deleteTemplatee
}: Props) {
  const {
    selectAll,
    weeks,
    subjects,
    titles,
    topicss,
    descs,
    createds,
    bodyContent,
    createdInner,
  } = styledProps;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = styles();
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const deleteTemplatee = () => {
  //   dispatch(deleteTemplate(_id));
  // };
  const del = () => {
    setAnchorEl(null);
    setOpen4(true)
    deleteTemplatee(_id);
  }
  const editTemplate = () => {
     setAnchorEl(null);
    dispatch(templateDetails(_id, setOpen, getCategories));
  };
  const menuDropdownContent = () => {
    return (
      <div className={classes.dropdownContent}>
        <div className={classes.content} onClick={editTemplate}>
          <EditIcon />
          <Typography variant="body2">Edit Template</Typography>
        </div>
        <div className={classes.content} onClick={del}>
          <DeleteIcon />
          <Typography variant="body2">Delete Template</Typography>
        </div>
      </div>
    );
  };
  return (
    <div className={bodyContent}>
      <div className={selectAll}>
        <Checkbox
          checked={selectedTemplate.some((value: any) => value._id === _id)}
          onChange={() => handleChange(_id)}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <div className={weeks}>
        <Typography variant="body2">{week}</Typography>
      </div>
      <div className={subjects}>
        <Typography variant="body2">{subject}</Typography>
      </div>
      <div className={topicss}>
        <Typography variant="body2">{topics}</Typography>
      </div>
      <div className={titles}>
        <Typography variant="body2">{title}</Typography>
      </div>
      <div className={descs}>
        <Typography variant="body2">{desc}</Typography>
      </div>
      <div className={`${createds} ${createdInner}`}>
        <Typography variant="body2">{created}</Typography>
        <div onClick={handleClick}>
          <MoreVertIcon />
        </div>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          className={classes.menu}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuDropdownContent()}
        </StyledMenu>
      </div>
    </div>
  );
}

export default Template;
