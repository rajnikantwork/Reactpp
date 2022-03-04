import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ImageContainer from "../imageContainer/index";
import LocalImages from "../../Utils/images";
import { useDispatch, useSelector } from "react-redux";
import { resourcesList } from "../../screen/resources/action";
import { debounce } from "lodash";
import { ReducersModal } from "../../modal/index";
import Utils from "../../Utils";
import { useHistory } from "react-router";
import { templateData } from "../../screen/myTemplates/action";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      border: "none",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "4px 0 4px 10px",
      width: "88%",
      boxShadow: "-4px 8px 24px 0 rgba(44, 63, 88, 0.02)",
      borderRadius: 4,
    },
    searchIcon: {
      "& figure": {
        width: 17,
        height: 17,
        margin: 0,
      },
    },
    searchInput: {
      width: "80%",
      "& input": {
        color: theme.palette.text.primary,
        marginLeft: 5,
        width: "100%",
        border: "none",
        padding: "5px",
        fontFamily:'Roboto, sans-serif',
        "&:placeholder": {
          color: theme.palette.text.primary,
        },
        "&:focus": {
          outline: "none",
        },
      },
    },
  })
);
interface Props {
  type: string;
}
function SearchComponent({ type }: Props) {
  const { saved, read, unread, reading } = useSelector(
    (state: ReducersModal) => state.resourcesDetailsFilterReducer
  );
  const history = useHistory();
  const searchRef = React.useRef<any>(null);
  const classes = styles();
  const dispatch = useDispatch();
  const debounceSearch = (value: string) => {
    dispatch(resourcesList(type, saved, value, reading, read, unread));
  };
  const search = debounce((value) => {
    dispatch({
      type: Utils.ActionName.RESOURCES_SEARCH,
      payload: { search: value },
    });
    if (history.location.pathname !== "/mytemplates") {
      dispatch({
        type: Utils.ActionName.RESOURCES_VIEW_ALL,
        payload:{
          page:1
        }
      })
      debounceSearch(value);
    } else {
      dispatch(templateData());
    }
  }, 1000);

  return (
    <div className={classes.container}>
      <div className={classes.searchIcon}>
        <ImageContainer
          imgUrl={LocalImages.SEARCH}
          style={classes.searchIcon}
        />
      </div>
      <div className={classes.searchInput}>
        <input
          ref={searchRef}
          type="text"
          placeholder={
            type === "template" ? "Search by description..." : "Search..."
          }
          onChange={(e) => search(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchComponent;
