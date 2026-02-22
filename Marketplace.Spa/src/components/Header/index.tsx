import style from "./style.module.scss";
import { appRoutes } from "../../routes.ts";
import { Link } from "react-router";
const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to={appRoutes.home()}>
          <span className={style.Logo}>Logo</span>
        </Link>
        <input type="search" />
        <nav className={style.headerNavigation}>
          <Link to={appRoutes.cart()}>cart</Link>
          <Link to={appRoutes.contacts()}>contacts</Link>
          <Link to={appRoutes.signIn()}>signIn</Link>
          <Link to={appRoutes.signUp()}>signUp</Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
