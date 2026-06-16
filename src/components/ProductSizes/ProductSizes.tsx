type ProductSizesProps = {
  availableSizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
};

const ProductSizes = ({
  availableSizes,
  selectedSize,
  setSelectedSize,
}: ProductSizesProps) => {
  return (
    <p>
      Размеры в наличии:{' '}
      {availableSizes.map((size) => (
        <button
          key={size}
          type="button"
          className={`catalog-item-size ${selectedSize === size ? 'selected' : null}`}
          onClick={(e) => {
            e.preventDefault();

            setSelectedSize(size);
          }}
        >
          {size}
        </button>
      ))}
    </p>
  );
};

export default ProductSizes;
