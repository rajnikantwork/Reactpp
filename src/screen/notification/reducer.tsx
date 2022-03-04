import Utils from "../../Utils";
import {NotoficationDataModal} from "../../modal/index"
export const notificationDataReducer = (
    state: NotoficationDataModal = new NotoficationDataModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.NOTIFICATION_DATA:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };