import style from "./style.module.scss";
import { appRoutes } from "../../routes.ts";
import { Link } from "react-router";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
const Header = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to={appRoutes.products()}>
          <span className={style.Logo}>Logo</span>
        </Link>
        <nav className={style.headerNavigation}>
          <Link to={appRoutes.cart()}>cart</Link>
          <Link to={appRoutes.contacts()}>contacts</Link>

            {isAuth ? (
                // Если есть токен - показываем профиль
                <Link to={appRoutes.profile()}>profile</Link>
            ) : (
                // Если нет токена - показываем signIn/signUp
                <>
                    <Link to={appRoutes.signIn()}>signIn</Link>
                    <Link to={appRoutes.signUp()}>signUp</Link>
                </>
            )}

        </nav>
      </div>
    </header>
  );
};
export default Header;
