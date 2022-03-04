import React, { Suspense } from "react";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./store";
import RouterContainer from "./router/routerContainer";

toast.configure({
  autoClose: 3000,
  draggable: false,
  newestOnTop: true,
  position: "top-right",
  closeOnClick: true,
});

// TagManager.initialize(tagManagerArgs);

const App: React.FC = () => {
  return (
    <div className="root-container">
      <Provider store={Store}>
        <Suspense fallback={""}>
          <RouterContainer />
          {/* Under Development */}
        </Suspense>
      </Provider>
      {/* {process.env.NODE_ENV !== "development" && <SessionTimer />} */}
    </div>
  );
};

export default App;
