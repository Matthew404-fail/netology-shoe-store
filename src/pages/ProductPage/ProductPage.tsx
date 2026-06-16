import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProductById } from '../../redux/slices/productSlice';
import Preloader from '../../components/Preloader/Preloader';
import ProductSizes from '../../components/ProductSizes/ProductSizes';
import ProductCount from '../../components/ProductCount/ProductCount';
import { addToCart } from '../../redux/slices/orderSlice';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product, error, isLoading } = useAppSelector(
    (state) => state.product
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);

  const availableSizes = useMemo((): string[] => {
    if (product?.sizes) {
      return product.sizes
        .filter((size) => size.available)
        .map((filteredSize) => filteredSize.size);
    }

    return [];
  }, [product]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCartButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (
        product?.id !== undefined &&
        product.price !== undefined &&
        selectedSize !== null
      ) {
        dispatch(
          addToCart({
            id: product.id,
            count: count,
            price: product.price,
            size: selectedSize,
            title: product.title,
          })
        );

        navigate('/cart');
      }
    },
    [product, count, selectedSize, dispatch, navigate]
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{product?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={
              product?.images && product.images.length > 0
                ? product.images[0]
                : undefined
            }
            className="img-fluid"
            alt={product?.title}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product?.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product?.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product?.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product?.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product?.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product?.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <ProductSizes
              availableSizes={availableSizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
            {availableSizes.length > 0 && (
              <ProductCount count={count} setCount={setCount} />
            )}
          </div>
          {availableSizes.length > 0 && (
            <button
              className="btn btn-danger btn-block btn-lg"
              onClick={handleAddToCartButtonClick}
              disabled={selectedSize === null}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
