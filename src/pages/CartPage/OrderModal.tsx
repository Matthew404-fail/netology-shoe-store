import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import { resetSubmitState } from '../../redux/slices/orderSlice';

type OrderModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  submitError: string | null;
  onClose: () => void;
};

const OrderModal = ({
  isOpen,
  onClose,
  isSubmitting,
  isSuccess,
  submitError,
}: OrderModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, isSubmitting]);

  const handleSuccessClick = useCallback(() => {
    onClose();
    navigate('/');
  }, [navigate, onClose]);

  const handleErrorClick = useCallback(() => {
    dispatch(resetSubmitState());
    onClose();
  }, [dispatch, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) =>
        e.target === e.currentTarget && !isSubmitting && onClose()
      }
    >
      <div className="modal-container">
        {isSubmitting && (
          <div className="modal-body text-center">
            <Preloader />
            <p>Оформляем заказ...</p>
          </div>
        )}

        {isSuccess && (
          <div className="modal-body text-center">
            <div className="modal-icon modal-icon-success">✓</div>
            <h4 className="modal-title">Заказ успешно оформлен!</h4>
            <p>Спасибо за покупку.</p>
            <button
              className="btn btn-outline-primary"
              onClick={handleSuccessClick}
            >
              На главную
            </button>
          </div>
        )}

        {submitError && (
          <div className="modal-body text-center">
            <div className="modal-icon modal-icon-error">✕</div>
            <h4 className="modal-title">Ошибка оформления</h4>
            <p>{submitError}</p>
            <button
              className="btn btn-outline-primary"
              onClick={handleErrorClick}
            >
              Ок
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default OrderModal;
