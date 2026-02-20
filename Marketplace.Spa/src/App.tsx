import { Routes, Route} from "react-router";
import {appRoutes} from "./routes.ts";
import SignUp from "./pages/SignUp";
import RegistrationConfirmation from "./pages/RegistrationConfirmation";
import Acivate from "./pages/Acivate";
import SuccessActivation from "./pages/SuccessActivation";
import FaildActivation from "./pages/FaildActivation";
import SignIn from "./pages/SignIn";
import PageNotFound from "./pages/PageNotFound";
import Loyout from "./layout";

function App() {
  return (
      <Loyout>
      <Routes>
          <Route path={appRoutes.signUp()}>
              <Route index element={<SignUp />} />
              <Route
                  path={appRoutes.authConfirm()}
                  element={<RegistrationConfirmation />}
              />
          </Route>
          <Route
              path={appRoutes.activate(":uid", ":token")}
              element={<Acivate />}
          />
          <Route
              path={appRoutes.activateSuccess()}
              element={<SuccessActivation />}
          />
          <Route path={appRoutes.activateFail()} element={<FaildActivation />} />

          <Route path={appRoutes.signIn()} element={<SignIn />} />
          <Route path="*" element={<PageNotFound/>} />
      </Routes>
      </Loyout>
  );
}

export default App;
