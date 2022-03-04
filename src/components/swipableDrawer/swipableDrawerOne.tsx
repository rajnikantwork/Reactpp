import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ResourceCard from "../../screen/resources/resourceCard";
import { ConstFunction } from "../../Utils/constFunctions";
import NoDataFound from "../../components/noDataFound/index";
import ViewAllRoute from "../../screen/resources/viewAllRoute";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface Props {
  filterName1: string;
  filterName2: string;
  filterName4: string;
  data: any;
  history: any;
  viewAllUrl: any;
}
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    screenSwipper: {
      margin: "20px 0",
      "& span": {
        height: "2.3px",
      },
      "& >div": {
        borderBottom: "1px solid #ccc",
        "& button": {
          padding: "0 !important",
        },
      },
    },
    resources: {
      position: "relative",
      display: "flex",
      justifyContent: "flex-start",
      margin: "0 -10px",
    },
    label: {
      maxWidth: "50px !important",
      textTransform: "capitalize",
      color: theme.palette.text.primary,
      fontSize: 15,
      minHeight: "50px !important",
      minWidth: "100px !important",
      "& span": {
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        "& div": {
          padding: "0px 8px",
          backgroundColor: "#e8e9eb",
          borderRadius: 5,
          color: "#8a9099",
          fontSize: 10,
          margin: "0 0 0 5px !important",
        },
      },
    },

  })
);
function SwipableDrawerOne({
  filterName1,
  filterName2,
  filterName4,
  data,
  viewAllUrl,
}: Props) {
  const classes = styles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
  const { all, new: ne, viewed } = data;
  const dataToRender = (data: any, url: string) => {
    return (
      <div className={classes.resources}>
        {data.map((value: any, index: number) => {
          if (index <= 2) {
            return (
              <ResourceCard
                key={value._id}
                title={value.title}
                subTitle={value.subTitle}
                date={getDate(value.created)}
                id={value._id}
                thumb = {value.thumbUrl}
                speaker = {value.speakerName}
                isSaved={value.isSaved}
                type={value.type}
                url={value.url}
                readStatus={value.readStatus}
                urlType={value.urlType}
              />
            );
          } else return <React.Fragment></React.Fragment>;
        })}
        <ViewAllRoute data={data} url={url}  />
      </div>
    );
  };
  return (
    <div className={classes.container}>
      <Tabs
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        aria-label="simple tabs example"
        className={classes.screenSwipper}
      >
        <Tab
          label={<Typography variant="body2">{filterName1}</Typography>}
          icon={<div>{all.length}</div>}
          {...a11yProps(0)}
          className={classes.label}
        />
        <Tab
          label={<Typography variant="body2">{filterName2}</Typography>}
          icon={<div>{ne.length}</div>}
          {...a11yProps(1)}
          className={classes.label}
        />
        <Tab
          label={<Typography variant="body2">{filterName4}</Typography>}
          icon={<div>{viewed.length}</div>}
          {...a11yProps(2)}
          className={classes.label}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {all.length ? (
          <React.Fragment>{dataToRender(all, viewAllUrl)}</React.Fragment>
        ) : (
          <NoDataFound title={"No Resource Found"} />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {ne.length ? (
          <React.Fragment>{dataToRender(ne, viewAllUrl)}</React.Fragment>
        ) : (
          <NoDataFound title={"No Resource Found"} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {viewed.length ? (
          <React.Fragment>{dataToRender(viewed, viewAllUrl)}</React.Fragment>
        ) : (
          <NoDataFound title={"No Resource Found"} />
        )}
      </TabPanel>
    </div>
  );
}

export default SwipableDrawerOne;
