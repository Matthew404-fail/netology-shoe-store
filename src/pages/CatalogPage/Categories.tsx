const Categories = () => {
  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a className="nav-link active" href="#">
          Все
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Женская обувь
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Мужская обувь
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Обувь унисекс
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Детская обувь
        </a>
      </li>
    </ul>
  );
};

export default Categories;
