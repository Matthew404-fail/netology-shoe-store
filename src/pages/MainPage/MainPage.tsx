import TopSales from '../../components/TopSales/TopSales';
import CatalogPage from '../CatalogPage/CatalogPage';

const MainPage = () => {
  return (
    <>
      <TopSales />
      <CatalogPage isSearchFieldNeeded={false} />
    </>
  );
};

export default MainPage;
