import React from "react";
import Typography from "@material-ui/core/Typography";
interface Props {
  styleProps: any;
  week: number;
  weekTopic: string;
  dateRecord: any;
  displayAllEvents: Function;
}
function WeekData({
  styleProps,
  week,
  weekTopic,
  dateRecord,
  displayAllEvents,
}: Props) {
  const {
    weekRow,
    weekNo,
    weekNoInfo,
    event,
    eventInfo,
    weekDay,
    blueEvent,
    blue,
    blueColor,
    yellowEvent,
    yellow,
    yellowColor,
    greenEvent,
    green,
    greenColor,
    redEvent,
    red,
    redColor,
  } = styleProps;
  const getDate = (timeStamp: number) => {
    let fullDate = new Date(timeStamp);
    let day = fullDate.getDate();
    let month = fullDate.getMonth();
    return `${day}/${month + 1}`;
  };
  let remainingDays = new Array(7 - dateRecord.length).fill(1);
  console.log(remainingDays);
  const [color, setColor] = React.useState(blue);
  const [color1, setColor1] = React.useState(blueColor);
  const [color2, setColor12] = React.useState(blueEvent);
  React.useEffect(() => {
    if (week >= 1 && week <= 3) {
      setColor(blue);
      setColor1(blueColor);
      setColor12(blueEvent);
    } else if (week > 3 && week <= 9) {
      setColor(yellow);
      setColor1(yellowColor);
      setColor12(yellowEvent);
    } else if (week > 9 && week <= 12) {
      setColor(green);
      setColor1(greenColor);
      setColor12(greenEvent);
    } else {
      setColor(red);
      setColor1(redColor);
      setColor12(redEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week]);
  return (
    <div className={`${weekRow} ${color}`}>
      <div className={`${weekNo} ${weekNoInfo}`}>
        <Typography variant="body2">Week {week}</Typography>
        <Typography variant="body2">{weekTopic}</Typography>
      </div>
      {remainingDays.length ? (
        remainingDays.map((value, index) => {
          return (
            <div className={`${weekDay} ${event} ${color2}`} key={index}></div>
          );
        })
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {dateRecord.map((value: any, index: number) => {
        return (
          <div
            className={`${weekDay} ${event} ${color2}`}
            key={value._id}
            onClick={() => displayAllEvents(value.event, week)}
          >
            {index === 0 ? (
              <Typography variant="body2">{getDate(value.date)}</Typography>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {value.event.map((value: any, index: number) => {
              if (index === 0) {
                return (
                  <div className={`${eventInfo} ${color1}`} key={value._id}>
                    <Typography variant="body2">{value.title}</Typography>
                  </div>
                );
              } else return <React.Fragment></React.Fragment>;
            })}
          </div>
        );
      })}

    </div>
  );
}

export default WeekData;
