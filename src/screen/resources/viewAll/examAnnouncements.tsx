import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import SearchComponent from "../../../components/searchComponent/index";
import ImageContainer from "../../../components/imageContainer/index";
import LocalImages from "../../../Utils/images";
import ResourceFilterDropdown from "../../../components/dropdown/resourceFilter/resourceFilterDropdown";
import ScreenTitle from "../../../components/screenTitle/index";
import { useDispatch, useSelector } from "react-redux";
import { resourcesList } from "../action";
import { ReducersModal } from "../../../modal/index";
import ResourceCard from "../../resources/resourceCard";
import { ConstFunction } from "../../../Utils/constFunctions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ResourceViewAllSkl from "./skleton";
import Utils from "../../../Utils";
import TransitionsModal from "../../../components/popupModal/index";
import ResourceDetails from "../resourceDetails";
import NoDataFound from "../../../components/noDataFound/index";
import PaginationControlled from "../../../components/pagination/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
    },
    titleAndSearchContainer: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-between",
      },
    },
    title: {
      width: "25%",
    },
    searchWithFilter: {
      width: "75%",
      [theme.breakpoints.down("xs")]: {
        width: "70%",
      },
      display: "flex",
      alignItems: "center",
    },
    filterBtn: {
      marginLeft: 35,
      borderRadius: 4,
      padding: "5px",
      backgroundColor: "#fff",
      boxShadow: "-4px 8px 24px 0 rgba(44, 63, 88, 0.02)",
      "& div": {
        margin: 0,
      },
      "& figure": {
        width: 18,
        height: 18,
        margin: 0,
      },
    },
    dataContainer: {
      marginTop: 60,
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
    },
    pagination: {
      position: "absolute",
      bottom:11,
      right: 20,
    },
    backTo: {
      position: "absolute",
      top: 80,
      left: 45,
      display: "flex",
      marginTop: "30px",
      alignItems: "center",
      "& p": {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.primary.main,
        marginLeft: 5,
      },
      "& svg": {
        color: theme.palette.primary.main,
        transition: "all 0.2s ease-in-out",
      },
      "&:hover": {
        cursor: "pointer",
        "& svg": {
          transform: "translateX(-10px)",
        },
      },
    },
  })
);
function Documents() {
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [detailId, setDetaialId] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { saved, read, unread, reading } = useSelector(
    (state: ReducersModal) => state.resourcesDetailsFilterReducer
  );
  const { search } = useSelector(
    (state: ReducersModal) => state.resourcesSearchReducer
  );
  const { totalCount } = useSelector(
    (state: ReducersModal) => state.totalDataCountReducer
  );
  const { data, page } = useSelector(
    (state: ReducersModal) => state.resourcesViewMoreReducer
  );
  const updatePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({
      type: Utils.ActionName.RESOURCES_VIEW_ALL,
      payload:{
        page:value
      }
    })
    dispatch(
      resourcesList("exam%20announcement", saved, search, reading, read, unread)
    );
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const getDate = (timestamp: number) => {
    let fullDate = new Date(timestamp);
    let day = fullDate.getDate();
    let mon = fullDate.getMonth() + 1;
    let mont = "";
    mont = mon < 10 ? `0${mon}` : `${mon}`;
    let month = ConstFunction.getMonth(mont);
    let year = fullDate.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  let iniFilterData = ConstFunction.setFilterData();
  React.useEffect(() => {
    dispatch({
      type: Utils.ActionName.RESOURCES_FILTERS,
      payload: {
        saved: iniFilterData.saved,
        read: iniFilterData.read,
        unread: iniFilterData.unread,
        reading: iniFilterData.reading,
      },
    });
    dispatch(
      resourcesList("exam%20announcement", saved, search, reading, read, unread)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const backTo = () => {
    history.goBack();
    dispatch({
      type: Utils.ActionName.RESOURCES_VIEW_ALL,
      payload: {
        data: {},
      },
    });
  };
  const openModal = (id: string, urlType: string) => {
    if (urlType === "pdf") {
      setDetaialId(id);
      setOpen(true);
    }
  };
  return (
    <div className={classes.container}>
      {data.data ? (
        <React.Fragment>
          <div className={classes.titleAndSearchContainer}>
            <div className={classes.title}>
              <ScreenTitle title="Exam Announcements" />
            </div>
            <div className={classes.searchWithFilter}>
              <SearchComponent type={"exam%20announcement"} />
              <div className={classes.filterBtn} onClick={handleClick}>
                <ImageContainer
                  imgUrl={LocalImages.FILTER}
                  style={classes.filterBtn}
                />
              </div>
            </div>
          </div>
          <div className={classes.backTo} onClick={() => backTo()}>
            <ArrowBackIcon />
            <Typography variant="body2">Back To Resources</Typography>
          </div>
          <div className={classes.dataContainer}>
            {data.data.map((value: any) => {
              return (
                <ResourceCard
                  key={value._id}
                  title={value.title}
                  subTitle={value.subTitle}
                  date={getDate(value.created)}
                  onClick={openModal}
                  id={value._id}
                  thumb = {value.thumbUrl}
                  speaker = {value.speakerName}
                  isSaved={value.isSaved}
                  type={value.type}
                  url={value.url}
                  urlType={value.urlType}
                />
              );
            })}
          </div>
          <ResourceFilterDropdown
            anchorEL={anchorEl}
            setAnchorEl={setAnchorEl}
            type={"exam%20announcement"}
          />
          <TransitionsModal
            open={open}
            setOpen={setOpen}
            children={<ResourceDetails setOpen={setOpen} detailId={detailId} />}
          />
        </React.Fragment>
      ) : (
        <ResourceViewAllSkl />
      )}
      {data.data && data.data.length === 0 ? (
        <NoDataFound title={"No Resource Found"} />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <div className={classes.pagination}>
        <PaginationControlled
          limit={Math.ceil(totalCount / 20)}
          page={page}
          updatePage={updatePage}
        />
      </div>
    </div>
  );
}

export default Documents;
