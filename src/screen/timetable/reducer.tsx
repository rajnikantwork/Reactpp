import Utils from "../../Utils/index"
import {TimeManagementModal} from "../../modal/index"
export const timemanagementReducer = (
    state: TimeManagementModal = new TimeManagementModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.TIME_MANAGEMENT_DATA:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };