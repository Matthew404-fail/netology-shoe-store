import { Link } from 'react-router-dom';
import type { OrderItem } from '../../types';

type CartTableRowProps = {
  index: number;
  orderItem: OrderItem;
  removeFromCart: (orderId: number, size: string) => void;
};

const CartTableRow = ({
  index,
  orderItem,
  removeFromCart,
}: CartTableRowProps) => {
  return (
    <tr>
      <td scope="row">{index + 1}</td>
      <td>
        <Link to={`/products/${orderItem.id}`}>{orderItem.title}</Link>
      </td>
      <td>{orderItem.size}</td>
      <td>{orderItem.count}</td>
      <td>{orderItem.price.toLocaleString('ru-RU')} руб.</td>
      <td>
        {(orderItem.price * orderItem.count).toLocaleString('ru-RU')} руб.
      </td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            removeFromCart(orderItem.id, orderItem.size);
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default CartTableRow;
