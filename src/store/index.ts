import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "../reducer";

// const logger = createLogger({
//   predicate: () => process.env.NODE_ENV === "development",
// });

const enhancer = compose(applyMiddleware(thunk));
/**
 * create new store
 */
const store: any = createStore(RootReducer, enhancer);
export default store;
