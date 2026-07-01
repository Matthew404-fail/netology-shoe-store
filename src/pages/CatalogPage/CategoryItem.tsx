import { Link, useSearchParams } from 'react-router-dom';
import type { Category } from '../../types';

type CategoryItemProps = Category & {
  isActive: boolean;
};

const CategoryItem = ({ id, title, isActive }: CategoryItemProps) => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  const createLinkParams = () => {
    const params = new URLSearchParams();
    if (q) {
      params.set('q', q);
    }
    if (id !== null) {
      params.set('categoryId', String(id));
    }

    return params.toString();
  };

  const linkTo = `?${createLinkParams()}`;
  const linkClassName = ['nav-link', isActive ? 'active' : ''].join(' ');

  return (
    <li className="nav-item">
      <Link to={linkTo} className={linkClassName}>
        {title}
      </Link>
    </li>
  );
};

export default CategoryItem;
