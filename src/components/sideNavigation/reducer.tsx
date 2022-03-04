import Utils from "../../Utils/index"
import {ToggleSideNavModal} from "../../modal/index"
export const toggleSideNavReducer = (
    state: ToggleSideNavModal = new ToggleSideNavModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.TOGGLE_SIDENAV:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };