import Navbar from '../Navbar/Navbar';
import type { NavbarLink } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import SearchField from '../SearchField/SearchField';
import { useCallback, useState } from 'react';

const navbarLinks: NavbarLink[] = [
  { label: 'Главная', link: '/' },
  { label: 'Каталог', link: '/catalog' },
  { label: 'О магазине', link: '/about' },
  { label: 'Контакты', link: '/contacts' },
];

const Header = () => {
  const cartItemsCount = useAppSelector((state) => state.order.items.length);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleSearchIconClick = useCallback(() => {
    if (isSearchOpen) {
      const trimmedValue = searchValue.trim();

      if (trimmedValue) {
        navigate(`/catalog?q=${encodeURIComponent(trimmedValue)}`);
        setSearchValue('');
        setIsSearchOpen(false);
      } else {
        setIsSearchOpen(false);
      }
    } else {
      setIsSearchOpen(true);
    }
  }, [isSearchOpen, searchValue, navigate]);

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
                  <button
                    data-id="search-expander"
                    type="button"
                    onClick={handleSearchIconClick}
                    className="btn header-controls-pic header-controls-search"
                  ></button>

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
                <SearchField
                  formClassName={`header-controls-search-form form-inline ${!isSearchOpen ? 'invisible' : ''}`}
                  value={searchValue}
                  onChange={setSearchValue}
                  onSubmit={handleSearchIconClick}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
