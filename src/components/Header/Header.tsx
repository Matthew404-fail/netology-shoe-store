import Navbar from '../Navbar/Navbar';
import type { NavbarLink } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { Link } from 'react-router-dom';

const navbarLinks: NavbarLink[] = [
  { label: 'Главная', link: '/' },
  { label: 'Каталог', link: '/catalog' },
  { label: 'О магазине', link: '/about' },
  { label: 'Контакты', link: '/contacts' },
];

const Header = () => {
  const cartItemsCount = useAppSelector((state) => state.order.items.length);

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </a>
            <div className="collapase navbar-collapse" id="navbarMain">
              <Navbar
                navbarLinks={navbarLinks}
                className="navbar-nav mr-auto"
              />
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  ></div>

                  <Link
                    to={'/cart'}
                    className="header-controls-pic header-controls-cart"
                  >
                    {cartItemsCount > 0 && (
                      <div className="header-controls-cart-full">
                        {cartItemsCount}
                      </div>
                    )}

                    <div className="header-controls-cart-menu"></div>
                  </Link>
                </div>
                <form
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
