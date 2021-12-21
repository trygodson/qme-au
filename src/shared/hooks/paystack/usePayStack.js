import { usePaystackPayment } from 'react-paystack';
import Button from '../../components/button';
import { useAuthState } from '../../../context/useAuthContext';

// you can call this function anything

export const PaystackButton = ({ onSuccess, onClose, type, disabled, isLoading }) => {
  const { user, dispatch } = useAuthState();
  const config = {
    reference: new Date().getTime().toString(),
    email: 'gnqnpn@gmail.com', //user?.email,
    amount: 20000,
    publicKey: 'pk_test_94324651b91cda2198f7701ba3bf44bb477c7b4f',
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <Button
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
      type={type}
      disabled={disabled}
      isLoading={isLoading}
      style={{ width: '100%' }}
    >
      Pay With PayStack
    </Button>
  );
};
