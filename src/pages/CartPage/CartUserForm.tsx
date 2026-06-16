import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type { OrderUserInfo } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { submitOrder } from '../../redux/slices/orderSlice';
import OrderModal from './OrderModal';
import { useState } from 'react';

type OrderUserInfoExt = OrderUserInfo & {
  isUserAgreement: boolean;
};

const CartUserForm = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    items: cartItems,
    isPending,
    isSuccess,
    submitError,
  } = useAppSelector((state) => state.order);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<OrderUserInfoExt>({
    defaultValues: {
      address: '',
      phone: '',
      isUserAgreement: false,
    },
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<OrderUserInfoExt> = async (
    data: OrderUserInfoExt
  ) => {
    setIsModalOpen(true);
    await dispatch(
      submitOrder({
        owner: {
          address: data.address,
          phone: data.phone,
        },
        items: cartItems,
      })
    );
  };

  return (
    <>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSubmitting={isPending}
        isSuccess={isSuccess}
        submitError={submitError}
      />
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <input
                      className="form-control"
                      id="phone"
                      placeholder="Ваш телефон"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <Controller
                control={control}
                name="address"
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <input
                      className="form-control"
                      id="address"
                      placeholder="Адрес доставки"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>
            <div className="form-group form-check">
              <Controller
                control={control}
                name="isUserAgreement"
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreement"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.currentTarget.checked)}
                    />
                  );
                }}
              />

              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              disabled={!isValid || cartItems.length === 0}
            >
              Оформить
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CartUserForm;
