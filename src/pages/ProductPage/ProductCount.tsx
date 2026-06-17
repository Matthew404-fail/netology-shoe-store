import { useCallback } from 'react';

type ProductCountProps = {
  count: number;
  setCount: (newCount: number) => void;
};

const ProductCount = ({ count, setCount }: ProductCountProps) => {
  const handleMinusButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (count > 1) {
        setCount(count - 1);
      }
    },
    [count, setCount]
  );

  const handlePlusButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (count < 10) {
        setCount(count + 1);
      }
    },
    [count, setCount]
  );

  return (
    <p>
      Количество:{' '}
      <span className="btn-group btn-group-sm pl-2">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleMinusButtonClick}
          disabled={count <= 1}
        >
          -
        </button>
        <span className="btn btn-outline-primary">{count}</span>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handlePlusButtonClick}
          disabled={count >= 10}
        >
          +
        </button>
      </span>
    </p>
  );
};

export default ProductCount;
