import { Link } from 'react-router-dom';
import type { Product } from '../../types';

const CatalogCard = ({ id, images, title, price }: Product) => {
  const imgSrc = images && images.length > 0 ? images[0] : undefined;

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={imgSrc} className="card-img-top img-fluid" alt={title} />
        <div className="card-body ">
          <p className="card-text">{title}</p>
          <p className="card-text">{price.toLocaleString('ru-RU')} руб.</p>
          <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
