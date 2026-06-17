import CategoryItem from './CategoryItem';
import Preloader from '../../components/Preloader/Preloader';
import type { Category } from '../../types';
import { useSearchParams } from 'react-router-dom';

type CatalogCategoriesProps = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

const CatalogCategories = ({
  categories,
  error,
  isLoading,
}: CatalogCategoriesProps) => {
  const [searchParams] = useSearchParams();
  const urlCategoryId = searchParams.get('categoryId');
  const activeCategoryId = urlCategoryId ? Number(urlCategoryId) : null;

  if (error) {
    return <span>{error}</span>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map((category) => (
        <CategoryItem
          {...category}
          key={category.id}
          isActive={activeCategoryId === category.id}
        />
      ))}
    </ul>
  );
};

export default CatalogCategories;
