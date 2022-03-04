import Utils from "../../Utils/index"
import {LoginModal, ForgotPasswordModal, ResetPasswordModal} from "../../modal/index"
export const logInReducer = (
    state: LoginModal = new LoginModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.LOGIN:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  export const forgotPasswordReduce = (
    state: ForgotPasswordModal = new ForgotPasswordModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.FORGOT_PASSWORD:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  export const resetPasswordReduce = (
    state: ResetPasswordModal = new ResetPasswordModal(),
    action: any
  ) => {
    switch (action.type) {
      case Utils.ActionName.RESET_PASSWORD:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };