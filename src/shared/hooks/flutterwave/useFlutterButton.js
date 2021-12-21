import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Button from '../../components/button';
import { useAuthState } from '../../../context/useAuthContext';

export function FlutterButton({ setPaid, type, disabled }) {
  const { user, dispatch } = useAuthState();
  const config = {
    public_key: 'FLWPUBK_TEST-4a304d86b3aae61653ed2b282b386a11-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'gnqnpn@gmail.com', //user?.email,
      phonenumber: '+23408746463', //user?.phonenumber,
      name: 'godson nwankwo', //`${user?.firstname} ${user?.lastname}`,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <Button
      onClick={() => {
        handleFlutterPayment({
          callback: response => {
            console.log(response);
            closePaymentModal(); // hjgkjhkijhuihliuhlihjliuhuiyghukhgkuhgty
          },
          onClose: () => {},
        });
      }}
      style={{ width: '100%', backgroundColor: 'blue' }}
      disabled={disabled}
      type={type}
    >
      Pay With FlutterWave
    </Button>
  );
}
