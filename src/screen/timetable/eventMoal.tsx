import React from "react";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import CloseModalButton from "../../components/button/closeModalButton";
import LocalImages from "../../Utils/images";
import ImageContainer from "../../components/imageContainer/index";
import { ConstFunction } from "../../Utils/constFunctions";
interface Props {
  setOpen: Function;
  allEvents: any;
  week: number;
}
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
    },
    close: {
      "& div": {
        top: "-40px !important",
        right: "10px !important",
      },
    },
    events: {
      marginTop: 40,
      maxHeight: 300,
      paddingRight: 10,
      overflow: "auto",
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
        borderRadius: "20px !important",
      },
      "&::-webkit-scrollbar-thumb": {
        width: "10px",
        background: `${theme.palette.primary.main} !important`,
        border: "1.7px solid #e9f5fb",
        borderRadius: "15px !important",
      },
    },
    event: {
      margin: "20px 0",
      // borderBottom: "1px dashed #000",
      padding: "15px",
      borderRadius: 8,
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    title: {
      display: "flex",
      alignItems: "center",
      "& h5": {
        fontSize: 20,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    time: {
      margin: "10px 0",
      display: "flex",
      alignItems: "center",
      "& p": {
        marginLeft: 10,
      },
    },
    icon: {
      "& figure": {
        width: 20,
        height: 20,
        margin: "0",
      },
    },
    content: {
      margin: "10px 0",
      display: "flex",
      "& p": {
        marginLeft: 10,
      },
    },
    color: {
      padding: 8,
      borderRadius: 4,
      marginRight: 13,
    },
    noevent: {
      paddingBottom: "20px",
      "& h6": {
        textAlign: "center",
        fontSize: 20,
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
      },
    },
  })
);

function EventModal({ setOpen, allEvents, week }: Props) {
  const classes = styles();
  const closeModal = () => {
    setOpen(false);
  };
  const getDay = (day: number) => {
    switch (day) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 0:
        return "Sunday";
    }
  };
  const getTime = (
    startTime: number,
    eventStartTime: number,
    endTime: number,
    eventEndTime: number,
    isAllDay: boolean
  ) => {
    let startFullTime = new Date(startTime);
    let endFullTime = new Date(endTime);
    let eventStart = new Date(eventStartTime);
    let eventEnd = new Date(eventEndTime);
    let sDay = getDay(startFullTime.getDay());
    let eDay = getDay(endFullTime.getDay());
    let sDate = startFullTime.getDate();
    let mon = startFullTime.getMonth() + 1;
    let mont = "";
    mont = mon < 10 ? `0${mon}` : `${mon}`;
    let smonth = ConstFunction.getMonth(mont);
    let eDate = endFullTime.getDate();
    let mon1 = startFullTime.getMonth() + 1;
    let mont1 = "";
    mont1 = mon1 < 10 ? `0${mon1}` : `${mon1}`;
    let emonth = ConstFunction.getMonth(mont1);
    let stime = eventStart.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let etime = eventEnd.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    let startDay = `${sDay}, ${smonth} ${sDate}`;
    let endDay = `${eDay}, ${emonth} ${eDate}`;
    let time1 = `${stime}`;
    let time2 = `${etime}`;
    if (isAllDay) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>{startDay}</div>
          <span
            style={{
              margin: "4px 4px 3px 4px",
              backgroundColor: "#000",
              borderRadius: "50%",
              width: "4px",
              height: "4px",
              display: "inline-block",
            }}
          ></span>
          <div>{time1}</div>
          <div
            style={{
              backgroundColor: "#000",
              height: "1px",
              width: "5px",
              margin: "0 5px",
            }}
          ></div>
          <div>{endDay}</div>
          <span
            style={{
              margin: "4px 4px 3px 4px",
              backgroundColor: "#000",
              borderRadius: "50%",
              width: "4px",
              height: "4px",
              display: "inline-block",
            }}
          ></span>
          <div>{time2}</div>
        </div>
      );
    } else
      return (
        <React.Fragment>
          <div style={{ display: "flex", alignItems: "center" }}>
            {startDay}
            <span
              style={{
                margin: "4px 4px 3px 4px",
                backgroundColor: "#000",
                borderRadius: "50%",
                width: "4px",
                height: "4px",
                display: "inline-block",
              }}
            ></span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>{time1}</div>
              <div
                style={{
                  backgroundColor: "#000",
                  height: "1px",
                  width: "5px",
                  margin: "0 5px",
                }}
              ></div>
              <div>{time2}</div>
            </div>
          </div>
        </React.Fragment>
      );
  };
  const [color, setColor] = React.useState<string>("");
  React.useEffect(() => {
    if (week <= 3) {
      setColor("rgb(136, 217, 238)");
    } else if (week > 3 && week <= 9) {
      setColor("rgb(255, 226, 178)");
    } else if (week > 9 && week <= 12) {
      setColor("rgb(111, 225, 206)");
    } else setColor('rgb(255, 123, 123)"');
  }, [week]);
  return (
    <div className={classes.container}>
      <div className={classes.close}>
        <CloseModalButton onClick={closeModal} />
      </div>
      <div className={classes.events}>
        {allEvents.length ? (
          allEvents.map((value: any) => {
            return (
              <div className={classes.event}>
                <div className={classes.title}>
                  <div
                    className={classes.color}
                    style={{ background: `${color}` }}
                  ></div>
                  <div>
                    <Typography variant="h5">{value.title}</Typography>
                  </div>
                </div>
                <div className={classes.time}>
                  <ImageContainer
                    style={classes.icon}
                    imgUrl={LocalImages.CLOCK_ICON}
                  />
                  <Typography variant="body2">
                    {getTime(
                      value.startDate,
                      value.eventStartTime,
                      value.endDate,
                      value.eventEndTime,
                      value.isAllDay
                    )}
                  </Typography>
                </div>
                <div className={classes.content}>
                  <ImageContainer
                    style={classes.icon}
                    imgUrl={LocalImages.TEXT_ALIGN}
                  />
                  <Typography variant="body2">{value.description}</Typography>
                </div>
              </div>
            );
          })
        ) : (
          <div className={classes.noevent}>
            {" "}
            <Typography variant="h6">No events found</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventModal;
