import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ActionButton from "../../button/index";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../../modal/index";
import { resourcesList } from "../../../screen/resources/action";
import Utils from "../../../Utils";
import ResourceFilterMenu from "./resourceFilterMenu";
import { ConstFunction } from "../../../Utils/constFunctions";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    dropdownContainer: {
      padding: "10px 20px",
      width: 230,
      "& .MuiMenu-paper": {
        left: "1090px !important",
        top: "138px !important",
      },
      "&:focus": {
        outline: "none",
      },
    },
    title: {
      marginBottom: 15,
      "& p": {
        color: "#000",
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: 18,
      },
    },
    filters: {
      display: "flex",
      flexDirection: "column",
    },
    actionButtons: {
      display: "flex",
      marginTop: 10,
      justifyContent: "space-between",
      "& div": {
        "&:first-child": {
          "& button": {
            backgroundColor: "#ebeff2",
            color: "#000",
          },
        },
      },
    },
    button: {
      width: "47%",
      "& button": {
        fontSize: 14,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  })
);

const StyledMenu = withStyles({
  paper: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    // left: "1090px !,
    // top: "138px !important",
    "&:focus": {
      outline: "none",
    },
    borderRadius: 8,
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
  anchorEL: any;
  setAnchorEl: Function;
  type: any;
}

export default function ResourceFilterDropdown({
  anchorEL,
  setAnchorEl,
  type,
}: Props) {
  const { search } = useSelector(
    (state: ReducersModal) => state.resourcesSearchReducer
  );
  let iniFilterData = ConstFunction.setFilterData();
  const { saved, read, unread, reading } = useSelector(
    (state: ReducersModal) => state.resourcesDetailsFilterReducer
  );
  const dispatch = useDispatch();
  const classes = styles();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const storeUpdatedFilter = (data: any) => {
    if (localStorage.getItem("rememberMe") === "yes") {
      localStorage.setItem("filter", JSON.stringify(data));
    } else sessionStorage.setItem("filter", JSON.stringify(data));
    dispatch({
      type: Utils.ActionName.RESOURCES_FILTERS,
      payload: {
        saved: iniFilterData.saved,
        read: iniFilterData.read,
        unread: iniFilterData.unread,
        reading: iniFilterData.reading,
      },
    });
  };
  const clearFilter = () => {
    iniFilterData = {
      ...iniFilterData,
      saved: "false",
      read: "false",
      unread: "false",
      reading: "false",
    };
    storeUpdatedFilter(iniFilterData);
    setAnchorEl(null);
  };
  const updateFilter1 = (key: string) => {
    if (key === "saved") {
      iniFilterData = {
        ...iniFilterData,
        saved: iniFilterData.saved === "true" ? "false" : "true",
      };
      storeUpdatedFilter(iniFilterData);
    } else if (key === "read") {
      iniFilterData = {
        ...iniFilterData,
        read: iniFilterData.read === "true" ? "false" : "true",
        unread: "false",
        reading: "false",
      };
      storeUpdatedFilter(iniFilterData);
    } else if (key === "unread") {
      iniFilterData = {
        ...iniFilterData,
        unread: iniFilterData.unread === "true" ? "false" : "true",
        read: "false",
        reading: "false",
      };
      storeUpdatedFilter(iniFilterData);
    } else if (key === "reading") {
      iniFilterData = {
        ...iniFilterData,
        reading: iniFilterData.reading === "true" ? "false" : "true",
        read: "false",
        unread: "false",
      };
      storeUpdatedFilter(iniFilterData);
    }
  };
  const applyFilter = () => {
    dispatch({
      type: Utils.ActionName.RESOURCES_VIEW_ALL,
      payload: {
        page: 1,
      },
    });
    dispatch(resourcesList(type, saved, search, reading, read, unread));
    setAnchorEl(null);
  };
  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEL}
        keepMounted
        open={Boolean(anchorEL)}
        onClose={() => handleClose()}
      >
        <div className={classes.dropdownContainer}>
          <div className={classes.title}>
            <Typography variant="body1">Filter by</Typography>
          </div>
          <div className={classes.filters}>
            <ResourceFilterMenu
              title="Saved"
              updateFilter1={updateFilter1}
              state={saved}
              command={"saved"}
            />
            <ResourceFilterMenu
              title="Read"
              updateFilter1={updateFilter1}
              state={read}
              command={"read"}
            />
            <ResourceFilterMenu
              title="Unread"
              updateFilter1={updateFilter1}
              state={unread}
              command={"unread"}
            />
            {type !== "seminars" ? (
              <ResourceFilterMenu
                title="Reading"
                updateFilter1={updateFilter1}
                state={reading}
                command={"reading"}
              />
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>
          <div className={classes.actionButtons}>
            <div className={classes.button}>
              <ActionButton
                name="Clear Filter"
                type={"button"}
                onPress={clearFilter}
                custom={true}
              />
            </div>
            <div className={classes.button}>
              <ActionButton
                name="Filter"
                type={"button"}
                onPress={applyFilter}
                custom={true}
              />
            </div>
          </div>
        </div>
      </StyledMenu>
    </div>
  );
}
