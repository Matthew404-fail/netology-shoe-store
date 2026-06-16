import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CartTableRow from './CartTableRow';
import { removeFromCart } from '../../redux/slices/orderSlice';
import CartUserForm from './CartUserForm';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.order);

  const handleRemoveFromCartButtonClick = useCallback(
    (orderId: number, size: string) => {
      dispatch(removeFromCart({ id: orderId, size: size }));
    },
    [dispatch]
  );

  const totalPrice = useMemo((): number => {
    let price = 0;

    items.forEach((orderIterm) => {
      price = price + orderIterm.price * orderIterm.count;
    });

    return price;
  }, [items]);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product, index) => (
              <CartTableRow
                key={product.id}
                index={index}
                orderItem={product}
                removeFromCart={handleRemoveFromCartButtonClick}
              />
            ))}
            <tr>
              <td colSpan={5} className="text-right">
                Общая стоимость
              </td>
              <td>{totalPrice.toLocaleString('ru-RU')} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <CartUserForm />
    </>
  );
};

export default CartPage;
