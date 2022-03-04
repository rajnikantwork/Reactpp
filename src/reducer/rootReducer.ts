import { LoadingModal, BackdropModal, HeaderDataModal, TotalDataCountModal } from "../modal";
import Utils from "../Utils";

/**
 * Global Loading reducer
 */
export const globalLoaderReducer = (
  state: LoadingModal = new LoadingModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.LOADING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const backdropReducer = (
  state: BackdropModal = new BackdropModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.BACKDROP:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const headerDataReducer = (
  state: HeaderDataModal = new HeaderDataModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.HEADER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const totalDataCountReducer = (
  state: TotalDataCountModal = new TotalDataCountModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.TOTAL_COUNT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
