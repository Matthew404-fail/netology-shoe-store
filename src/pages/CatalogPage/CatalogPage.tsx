import CatalogCategories from './CatalogCategories';
import Preloader from '../../components/Preloader/Preloader';
import CatalogCard from './CatalogCard';
import SearchField from '../../components/SearchField/SearchField';
import useCatalogPageData from './useCatalogPageData';
import CatalogNotFoundMessage from './CatalogNotFoundMessage';

type CatalogPageProps = {
  isSearchFieldNeeded: boolean;
};

const CatalogPage = ({ isSearchFieldNeeded }: CatalogPageProps) => {
  const { productsState, categoriesState, handlers } = useCatalogPageData();

  const { products, isProductsLoading, hasMore, searchFieldValue } =
    productsState;

  const { categories, activeCategoryId, categoriesError, isCategoriesLoading } =
    categoriesState;

  const {
    handleLoadMoreButtonClick,
    handleSearchFieldSubmit,
    setSearchFieldValue,
  } = handlers;

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {products.length === 0 && isProductsLoading ? (
        <Preloader />
      ) : (
        <>
          {isSearchFieldNeeded && (
            <SearchField
              formClassName="catalog-search-form form-inline"
              value={searchFieldValue}
              onChange={setSearchFieldValue}
              onSubmit={handleSearchFieldSubmit}
            />
          )}
          <CatalogCategories
            categories={categories}
            activeCategoryId={activeCategoryId}
            error={categoriesError}
            isLoading={isCategoriesLoading}
          />
          <div className="row">
            {products.length === 0 && <CatalogNotFoundMessage />}
            {products.length > 0 &&
              products.map((product) => (
                <CatalogCard key={product.id} {...product} />
              ))}
          </div>
          {hasMore && (
            <>
              {isProductsLoading && <Preloader />}
              <div className="text-center load-more-wrapper">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleLoadMoreButtonClick}
                  disabled={isProductsLoading}
                >
                  Загрузить ещё
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default CatalogPage;
