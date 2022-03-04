import { Suspense} from "react";
import LoginContainer from "../../hoc/loginContainer/index";
import { Route } from "react-router-dom";
import Utils from "../../Utils";
import { Redirect } from "react-router-dom";
interface Props {
  path: string;
  component: any;
}

const PublicRoute = ({ component: Component, ...rest }: Props) => {
  console.log(localStorage.getItem('access_token'))
  console.log(sessionStorage.getItem('access_token'))
  return (
    <Route
      {...rest}
      render={(props) => (
        <Suspense fallback={""}>
          {(localStorage.getItem("access_token") === null && sessionStorage.getItem("access_token") === null) ? (
            <LoginContainer {...props}>
              <Component {...props} />
            </LoginContainer>
          ) : (
            <Redirect to={Utils.Pathname.MY_PROGRESS} />
          )}
        </Suspense>
      )}
    />
  );
};
export default PublicRoute;
