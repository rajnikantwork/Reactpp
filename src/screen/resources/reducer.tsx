import Utils from "../../Utils";
import {
  ReducersModal,
  ResourcesViewMoreModal,
  ResourcesDetailsModal,
  ResourcesDetailsFilterModal,
  ResourcesSearchModal
} from "../../modal/index";
export const resourceReducer = (
  state: ReducersModal = new ReducersModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.RESOURCE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const resourcesViewMoreReducer = (
  state: ResourcesViewMoreModal = new ResourcesViewMoreModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.RESOURCES_VIEW_ALL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const resourcesDetailsReducer = (
  state: ResourcesDetailsModal = new ResourcesDetailsModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.RESOURCES_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const resourcesDetailsFilterReducer = (
  state: ResourcesDetailsFilterModal = new ResourcesDetailsFilterModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.RESOURCES_FILTERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const resourcesSearchReducer = (
  state: ResourcesSearchModal = new ResourcesSearchModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.RESOURCES_SEARCH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
