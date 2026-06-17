import { useEffect } from 'react';
import CatalogCard from '../CatalogPage/CatalogCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Preloader from '../../components/Preloader/Preloader';
import { fetchTopSales } from '../../redux/slices/topSalesSlice';

const TopSales = () => {
  const { items, isLoading } = useAppSelector((state) => state.topSales);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  if (!isLoading && items.length === 0) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>

      {isLoading ? (
        <Preloader />
      ) : (
        <div className="row">
          {items.map((product) => (
            <CatalogCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopSales;
