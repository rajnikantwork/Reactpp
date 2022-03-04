import React from "react";
// import {ConstFunction} from "../../Utils/constFunctions"
// import { endTask } from "../../screen/studyPlanner/action";
// import {useDispatch} from "react-redux";
interface Props {
  initialSecond: number;
  initialMinute: number;
  initialHour: number;
  active: boolean;
  initialApiCall: boolean;
  taskId: string;
  type: string;
}
const Counter = ({
  initialSecond,
  initialMinute,
  initialHour,
  active,
  initialApiCall,
  taskId,
  type,
}: Props) => {
  const [time, setTime] = React.useState({
    second: initialSecond,
    minute: initialMinute,
    hour: initialHour,
  });
  // const dispatch = useDispatch();
  React.useEffect(() => {
    let interval: any = null;
    if (active) {
      interval = setInterval(run, 1000);
    } else {
      if(initialApiCall) {
        // const timeStamp = ConstFunction.getTimeStamp(time.hour, time.minute, time.second)
        // dispatch(endTask(taskId, timeStamp, type, 'completed'))
      }
        clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, active]);
  let updatedS = time.second,
    updatedM = time.minute,
    updatedH = time.hour;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ second: updatedS, minute: updatedM, hour: updatedH });
  };
  return (
    <div>
      <div style={{color:'#000'}}>
        {time.hour < 10 ? `0${time.hour}` : time.hour}:
        {time.minute < 10 ? `0${time.minute}` : time.minute}:
        {time.second < 10 ? `0${time.second}` : time.second}
      </div>
    </div>
  );
};

export default Counter;
