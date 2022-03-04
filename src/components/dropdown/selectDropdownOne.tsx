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
import { useDispatch } from "react-redux";
import Utils from "../../Utils";
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      width: "160px",
      color: "#000 !important",
      "& svg": {
        color: "#000",
      },
      ".MuiList-padding": {
        padding: "0 !important",
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#f5f6fa",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: theme.typography.fontFamily,
      "&:focus": {
        borderRadius: 4,
        backgroundColor: "#f5f6fa",
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
      backgroundColor: "#f5f6fa",
    },
    paper: {
      borderRadius: "0",
      backgroundColor: "#f5f6fa",
      "& ul": {
        paddingTop: "5px !important",
        paddingBottom: "5px !important",
        minWidth: "160px",
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
          backgroundColor: `#d8d8d880`,
          width: "94%",
          marginLeft: "4px",
          color: "#000",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: `#d8d8d8`,
          },
        },
        "& li": {
          borderRadius: "10px",
          color: "#000",
          width: "95%",
          margin: "2px auto",
          "&:hover": {
            backgroundColor: `#d8d8d8`,
          },
        },
      },
    },
  })
);
interface Props {
  initialSelect: string;
  initialData: string;
  selectionValue: string;
  storageValue: string;
  dropDownData: any;
  helperText?: string;
  getData: Function;
}
export default function SelectDropdownOne({
  initialSelect,
  initialData,
  selectionValue,
  storageValue,
  dropDownData,
  helperText,
  getData,
}: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [dropdownValue, setDropdownValue] = React.useState(
    initialSelect === "" ? initialData : initialSelect
  );
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDropdownValue(event.target.value as string);
    dispatch({
      type: Utils.ActionName.CREATE_TEMPLATE_SELECT,
      payload: {
        [storageValue]: event.target.value,
      },
    });
    getData(storageValue, event.target.value);
  };
  React.useEffect(() => {
    if (initialData === "Select Topics" && initialSelect === "") {
      setDropdownValue(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownData]);
  React.useEffect(() => {
    setDropdownValue(initialSelect || initialData);
  }, [initialSelect, initialData]);
  return (
    <div>
      <FormControl className={classes.margin}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={dropdownValue}
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
          <MenuItem disabled value={initialData}>
            {initialData}
          </MenuItem>
          {initialData === "Select Week"
            ? dropDownData.data &&
              dropDownData.data.map((value: any) => {
                if (helperText !== "") {
                  return (
                    <MenuItem
                      value={`${value[selectionValue]}`}
                      key={value._id}
                    >
                      {helperText} {value[selectionValue]}
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      value={`${value[selectionValue]}`}
                      key={value._id}
                    >
                      {value[selectionValue]}
                    </MenuItem>
                  );
                }
              })
            : dropDownData &&
              dropDownData.map((value: any) => {
                if (helperText !== "") {
                  return (
                    <MenuItem
                      value={`${value[selectionValue]}`}
                      key={value._id}
                    >
                      {helperText} {value[selectionValue]}
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      value={`${value[selectionValue]}`}
                      key={value._id}
                    >
                      {value[selectionValue]}
                    </MenuItem>
                  );
                }
              })}
        </Select>
      </FormControl>
    </div>
  );
}
