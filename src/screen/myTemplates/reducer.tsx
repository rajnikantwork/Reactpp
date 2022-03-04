import Utils from "../../Utils/index"
import {TemplateDataModal, CreateTemplateSelectionModal, TemplateDetailModal} from "../../modal/index"
export const templatesDateReducer = (
    state: TemplateDataModal = new TemplateDataModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.GET_TEMPLATES:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  export const createTemplateSelectionReducer = (
    state: CreateTemplateSelectionModal = new CreateTemplateSelectionModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.CREATE_TEMPLATE_SELECT:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  export const templateDetailReducer = (
    state: TemplateDetailModal = new TemplateDetailModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.TEMPLATE_DETAIL:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };