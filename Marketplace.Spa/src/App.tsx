import { Routes, Route} from "react-router";
import {appRoutes} from "./routes.ts";
import SignUp from "./pages/SignUp";
import RegistrationConfirmation from "./pages/RegistrationConfirmation";
import FaildActivation from "./pages/FaildActivation";
import SignIn from "./pages/SignIn";
import PageNotFound from "./pages/PageNotFound";
import Loyout from "./layout";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage/CartPage.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {AccessTokenStorage} from "./services/AuthStorage.ts";
import {setAuth} from "./app/isAuthSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = AccessTokenStorage.get();

        if (token) {
            dispatch(setAuth(true));
        }
    }, []);

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

          <Route path={appRoutes.activateFail()} element={<FaildActivation />} />

          <Route path={appRoutes.signIn()} element={<SignIn />} />

          <Route path={appRoutes.products()} element={<Products/>}/>
          <Route path={appRoutes.product(":productId")} element={<ProductPage/>}/>

          <Route path={appRoutes.cart()} element={<CartPage/>}/>

          <Route path="*" element={<PageNotFound/>} />


      </Routes>
      </Loyout>
  );
}

export default App;
