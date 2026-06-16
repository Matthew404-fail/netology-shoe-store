import { NavLink } from 'react-router-dom';
import type { NavbarLink } from '../../types';

type NavbarProps = {
  navbarLinks: NavbarLink[];
  className: string;
};

const Navbar = ({ navbarLinks, className }: NavbarProps) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    ['nav-link', isActive ? 'active' : ''].join(' ');
  return (
    <ul className={className}>
      {navbarLinks.map((navLink) => (
        <NavLink key={navLink.label} to={navLink.link} className={linkClass}>
          {navLink.label}
        </NavLink>
      ))}
    </ul>
  );
};

export default Navbar;
