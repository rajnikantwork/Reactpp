import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScreenTitle from "../../components/screenTitle/index";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../modal/index";
import { notificationDataApi } from "./action";
import Typography from "@material-ui/core/Typography";
import NotificationCard from "./notification";
import NotificationSkl from "./notificationSkl";
import PaginationControlled from "../../components/pagination/index";
import NoDataFound from "../../components/noDataFound/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {},
    title: {},
    notificationData: {
      marginTop: "40px",
    },
    oldNotification: {},
  })
);

function Notification() {
  const classes = styles();
  const dispatch = useDispatch();
  const { notificationData } = useSelector(
    (state: ReducersModal) => state.notificationDataReducer
  );
  const { totalCount } = useSelector(
    (state: ReducersModal) => state.totalDataCountReducer
  );
  React.useEffect(() => {
    dispatch(notificationDataApi());
  }, [dispatch]);
  const [page, setPage] = React.useState(1);
  const updatePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(notificationDataApi(value));
  };
  return (
    <HelmetProvider>
      <div className={classes.mainContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Notifications</title>
        </Helmet>
        {notificationData.data ? (
          <React.Fragment>
            <div className={classes.title}>
              <ScreenTitle title="Notifications" />
            </div>
            <div className={classes.notificationData}>
              {notificationData &&
                notificationData.newNotification.map((value: any) => {
                  return (
                    <NotificationCard
                      title={value.title}
                      message={value.message}
                      isRead={value.isRead}
                      created={value.created}
                    />
                  );
                })}
            </div>
            <div className={classes.oldNotification}>
              {notificationData && notificationData.data.length >= 1 ? (
                <Typography variant="body2">Old Notification</Typography>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {notificationData &&
                notificationData.data.map((value: any) => {
                  return (
                    <NotificationCard
                      title={value.title}
                      message={value.message}
                      isRead={value.isRead}
                      created={value.created}
                    />
                  );
                })}
            </div>
          </React.Fragment>
        ) : (
          <NotificationSkl />
        )}
        {notificationData.newNotification && notificationData.data &&
        notificationData.newNotification.length === 0 &&
        notificationData.data.length === 0 ? (
          <NoDataFound title="No Notifications Yet" />
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <PaginationControlled
          limit={Math.ceil(totalCount / 20)}
          page={page}
          updatePage={updatePage}
        />
      </div>
    </HelmetProvider>
  );
}

export default Notification;
