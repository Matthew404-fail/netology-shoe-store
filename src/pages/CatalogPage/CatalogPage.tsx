import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CatalogFilters from './CatalogFilters';
import { fetchProducts } from '../../redux/slices/productsSlice';
import Preloader from '../../components/Preloader/Preloader';
import CatalogCard from './CatalogCard';

type CatalogPageProps = {
  isSearchFieldNeeded: boolean;
};

const CatalogPage = ({ isSearchFieldNeeded }: CatalogPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const { products, isLoading } = useAppSelector((state) => state.products);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isSearchFieldNeeded && (
            <form className="catalog-search-form form-inline">
              <input className="form-control" placeholder="Поиск" />
            </form>
          )}
          <CatalogFilters />
          <div className="row">
            {products.map((product) => (
              <CatalogCard key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CatalogPage;
