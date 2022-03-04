import React from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Utils from "../../Utils";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
interface Props {
  initialValue: string;
  filterData: string;
  type: string;
  value: string;
  dropDownData: any;
  helperText?: string;
  enabledTo?: any;
  getData: Function;
  custom?: boolean;
}
export default function FilterDropdown({
  initialValue,
  filterData,
  type,
  value,
  dropDownData,
  helperText,
  getData,
  custom = false,
}: Props) {
  const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
      root: {
        "label + &": {
          marginTop: theme.spacing(3),
        },
        color: `${custom ? "#fff !important" : "#000 !important"}`,
        "& svg": {
          color: `${custom ? "#fff" : "#ccc"}`,
        },
        ".MuiList-padding": {
          padding: "0px !important",
        },
      },
      input: {
        borderRadius: 0,
        position: "relative",
        border: "1px solid #ced4da",
        fontSize: 16,
        backgroundColor: `${custom ? theme.palette.secondary.main : ""}`,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: theme.typography.fontFamily,
        "&:focus": {
          borderRadius: 4,
          backgroundColor: `${
            custom ? theme.palette.secondary.main : "transparent"
          }`,
        },
      },
    })
  )(InputBase);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      margin: {
        margin: "0",
        '& >div':{
          width: "164px !important",
        },
        '& svg':{
          marginRight:5,
          '& path':{
            fill:'#B5B7CA'
          }
        }
      },
      color: {
        color: "#000",
        backgroundColor: `${
          custom ? theme.palette.secondary.main : "transparent"
        }`,
      },
      paper: {
        borderRadius: "0",
        backgroundColor: `${custom ? theme.palette.secondary.main : "#fff"}`,
        "& ul": {
          paddingTop: "4px !important",
          paddingBottom: "4px !important",
          maxHeight: "300px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "30px",
            cursor: "grab",
            // [theme.breakpoints.down("sm")]: {
            //   width: "0",
            // },
          },
          "&::-webkit-scrollbar-track": {
            background: " #efefef !important",
            borderRadius: "0px !important",
          },
          "&::-webkit-scrollbar-thumb": {
            width: "10px",
            background: `${theme.palette.primary.main} !important`,
            border: "1.7px solid #e9f5fb",
            borderRadius: "0px !important",
          },
          "& .Mui-selected": {
            backgroundColor: `${
              custom ? "rgba(42,174,188, 0.5)" : "rgba(118,127,133, 0.4)"
            }`,
            margin: "0 auto",
            color: `${custom ? "#fff" : "#000"}`,
            //   borderRadius: "10px",
            "&:hover": {
              backgroundColor: `${
                custom ? "rgba(42,174,188, 0.5)" : "rgba(118,127,133, 0.4)"
              }`,
            },
          },
          "& li": {
            //   borderRadius: "10px",
            color: `${custom ? "#fff" : "#000"}`,
            margin: "2px auto",
            "&:hover": {
              backgroundColor: `${
                custom ? "rgba(42,174,188, 0.5)" : "#ebeff2"
              }`,
              // backgroundColor: `#ebeff2`,
            },
          },
        },
      },
    })
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch({
      type: Utils.ActionName.CUSTOM_RANGE,
      payload: {
        [type]: event.target.value,
      },
    });
    getData(type, event.target.value);
  };
  React.useEffect(() => {
    if (dropDownData) {
      setIsDisabled(false);
    }
  }, [isDisabled, dropDownData]);
  return (
    <FormControl className={classes.margin}>
      <Select
        disabled={isDisabled}
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={value}
        onChange={handleChange}
        IconComponent={ExpandMoreIcon}
        className={classes.color}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          classes: { paper: classes.paper },
          getContentAnchorEl: null,
        }}
        input={<BootstrapInput />}
      >
        {history.location.pathname.split("/")[1] === "myprogress" ? (
          <MenuItem value={initialValue}>Overall progress</MenuItem>
        ) : (
          <MenuItem value={initialValue}>{initialValue}</MenuItem>
        )}
        {dropDownData &&
          dropDownData.map((value: any) => {
            return (
              <MenuItem value={value[filterData]} key={value._id}>
                {helperText !== ""
                  ? `${helperText} ${value[filterData]}`
                  : `${value[filterData]}`}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
