import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import TermsAndConditions from "./termsAndConditions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ScreenTitle from "../../components/screenTitle/index";
import AccountSettings from "./accountSettings/index";
import { Helmet, HelmetProvider } from "react-helmet-async";
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
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    title: {},
    screenSwipper: {
      margin: "20px 0",
      "& span": {
        height: "2.3px",
      },
      "& >div": {
        borderBottom: "1px solid #ccc",
        "& button": {
          marginRight: "35px",
        },
      },
    },
    label: {
      textTransform: "capitalize",
      color: theme.palette.text.primary,
      fontSize: 15,
    },
  })
);
function Settings() {
  const classes = styles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <HelmetProvider>
    <div className={classes.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings</title>
      </Helmet>
      <div className={classes.title}>
        <ScreenTitle title="Settings" />
      </div>
      <Tabs
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        aria-label="simple tabs example"
        className={classes.screenSwipper}
      >
        <Tab
          label="Account Settings"
          {...a11yProps(0)}
          className={classes.label}
        />
        <Tab
          label="Terms & Conditions"
          {...a11yProps(1)}
          className={classes.label}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TermsAndConditions />
      </TabPanel>
    </div>
      </HelmetProvider>
  );
}

export default Settings;
