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
import { useHistory } from "react-router";
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      width: "160px",
      color: "#fff !important",
      "& svg": {
        color: "#fff",
      },
      ".MuiList-padding": {
        padding: "0 !important",
      },
    },
    input: {
      borderRadius: 0,
      position: "relative",
      backgroundColor: theme.palette.secondary.main,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: theme.typography.fontFamily,
      "&:focus": {
        borderRadius: 4,
        backgroundColor: theme.palette.secondary.main,
      },
    },
  })
)(InputBase);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: "0",
      "& >div": {
        width: "164px !important",
      },
      "& svg": {
        marginRight: 5,
        "& path": {
          fill: "#B5B7CA",
        },
      },
    },
    color: {
      backgroundColor: theme.palette.secondary.main,
    },
    paper: {
      borderRadius: "0",
      backgroundColor: theme.palette.secondary.main,
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
          backgroundColor: `${theme.palette.primary.main}80`,
          width: "94%",
          marginLeft: "4px",
          color: "#fff",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: `${theme.palette.primary.main}80`,
          },
        },
        "& li": {
          borderRadius: "10px",
          color: "#fff",
          width: "95%",
          margin: "2px auto",
          "&:hover": {
            backgroundColor: `${theme.palette.primary.main}80`,
          },
        },
      },
    },
  })
);
interface Props {
  dropDownData: any;
  helperText?: string;
  enabledTo?: any;
  getData: Function;
}
const currentWeek = (currentWeek: number, helperText: string | undefined) => {
  if (currentWeek) return `${helperText} ${currentWeek}`;
  else return "Select Week";
};
export default function CustomizedSelects({
  dropDownData,
  helperText,
  enabledTo,
  getData,
}: Props) {
  const getCurentWeek = currentWeek(enabledTo, helperText);
  const history = useHistory();
  const classes = useStyles();
  const [dropdownValue, setDropdownValue] = React.useState(
    sessionStorage.getItem("week")
      ? sessionStorage.getItem("week")
      : getCurentWeek
  );
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDropdownValue(event.target.value as string);
    if (event.target.value !== "0") {
      if (event.target.value === "Select Week") {
        const weekData = dropDownData.data.find(
          (value: any) => value.week === enabledTo
        );
        getData(weekData);
      } else {
        const getCurrentWeek: any = event.target.value;
        const currentWeek = Number(getCurrentWeek.split(" ")[1]);
        const weekData = dropDownData.data.find(
          (value: any) => value.week === currentWeek
        );
        getData(weekData);
      }
    } else getData(event.target.value);
  };
  React.useEffect(() => {
    if(dropdownValue) {
      sessionStorage.setItem("week", dropdownValue);
    }
  }, [dropdownValue]);
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
          <MenuItem value={"Select Week"}>Current Week</MenuItem>
          {history.location.pathname === "/practice" ? (
            <MenuItem value={"0"}>Select Custom</MenuItem>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {dropDownData.data &&
            dropDownData.data.map((value: any, index: any) => {
              // if (index + 1 <= enabledTo) {
              return (
                <MenuItem value={`${helperText} ${value.week}`} key={value._id}>
                  {helperText} {value.week}
                </MenuItem>
              );
              // } else {
              //   return (
              //     <MenuItem
              //       disabled
              //       value={`${helperText} ${value.week}`}
              //       key={value._id}
              //     >
              //       {helperText} {value.week}
              //     </MenuItem>
              //   );
              // }
            })}
        </Select>
      </FormControl>
    </div>
  );
}
