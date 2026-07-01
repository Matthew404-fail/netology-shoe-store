import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProducts } from '../../redux/slices/productsSlice';
import type { UpdateUrlParams } from '../../types';
import { fetchCategories } from '../../redux/slices/categoriesSlice';

const OFFSET_MODIFIER = 6;

const useCatalogPageData = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    isLoading: isProductsLoading,
    currentOffset,
    hasMore,
    error: productsError,
  } = useAppSelector((state) => state.products);

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useAppSelector((state) => state.categories);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const categoryId = searchParams.get('categoryId');

  const [searchFieldValue, setSearchFieldValue] = useState<string>(
    searchParams.get('q') || ''
  );

  const updateUrlParams = useCallback(
    (params: UpdateUrlParams) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        if ('categoryId' in params) {
          if (params.categoryId !== null && params.categoryId !== undefined) {
            next.set('categoryId', String(params.categoryId));
          } else {
            next.delete('categoryId');
          }
        }

        if ('q' in params) {
          if (params.q) {
            next.set('q', params.q);
          } else {
            next.delete('q');
          }
        }

        if ('offset' in params) {
          if (params.offset && params.offset > 0) {
            next.set('offset', String(params.offset));
          } else {
            next.delete('offset');
          }
        }

        return next;
      });
    },
    [setSearchParams]
  );

  const handleLoadMoreButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      updateUrlParams({ offset: currentOffset + OFFSET_MODIFIER });
    },
    [updateUrlParams, currentOffset]
  );

  const handleSearchFieldSubmit = useCallback(
    (value: string) => {
      updateUrlParams({ q: value.trim(), offset: 0 });
    },
    [updateUrlParams]
  );

  useEffect(() => {
    const urlQ = q;
    // Эффект служит для синхронизации значения инпута со строкой поиска
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchFieldValue(urlQ || '');
  }, [q, categoryId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const urlCategoryId = searchParams.get('categoryId');
    const urlOffset = searchParams.get('offset');
    const urlQ = searchParams.get('q');

    dispatch(
      fetchProducts({
        categoryId: urlCategoryId ? Number(urlCategoryId) : null,
        offset: urlOffset ? Number(urlOffset) : 0,
        q: urlQ ?? '',
      })
    );
  }, [dispatch, searchParams]);

  return {
    productsState: {
      products,
      isProductsLoading,
      hasMore,
      searchFieldValue,
      productsError,
    },
    categoriesState: {
      categories,
      isCategoriesLoading,
      categoriesError,
    },
    handlers: {
      updateUrlParams,
      setSearchFieldValue,
      handleLoadMoreButtonClick,
      handleSearchFieldSubmit,
    },
  };
};

export default useCatalogPageData;
