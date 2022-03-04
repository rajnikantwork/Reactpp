import Utils from "../../Utils/index"
import {ProfileModal} from "../../modal/index"
export const profileReducer = (
    state: ProfileModal = new ProfileModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.PROFILE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };