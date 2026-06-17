import CategoryItem from './CategoryItem';
import Preloader from '../../components/Preloader/Preloader';
import type { Category } from '../../types';

type CatalogCategoriesProps = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  activeCategoryId: number | null;
};

const CatalogCategories = ({
  categories,
  error,
  isLoading,
  activeCategoryId,
}: CatalogCategoriesProps) => {
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
