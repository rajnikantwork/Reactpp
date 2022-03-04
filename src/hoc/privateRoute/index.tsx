import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import MainContainer from "../mainContainer/index";

interface Props {
  path: string;
  component: any;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route exact
      {...rest}
      render={(props) => (
        <React.Fragment>
          {(localStorage.getItem("access_token") !== null || sessionStorage.getItem("access_token") !== null) ? (
            <MainContainer {...props}>
              <Suspense fallback={""}>
                <Component {...props} />
              </Suspense>
            </MainContainer>
          ) : (
            <Redirect to="/" />
          )}
        </React.Fragment>
      )}
    />
  );
};
export default PrivateRoute;
