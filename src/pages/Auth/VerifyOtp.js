import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthJumbotron } from '../../shared/components/authJumbotron/LoginIndex';
import { bgLeftImage, bgRightImage, logo } from '../../EntryFile/images.jsx';
import { Input } from '../../shared/components/formInputs';
import Button from '../../shared/components/button';
import { useAuthState } from '../../context/useAuthContext';
import useAuthService from '../../shared/hooks/api/useAuthService';
import { AuthActionSuccess } from '../../context/reducers/authActions';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';
import LoadingOverlay from 'react-loading-overlay';

const VerifyOtp = ({ ...props }) => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(props.location.state.email);
  const [id, setId] = useState(props.location.state.id);
  function handleChange(e) {
    setOtp(e);
  }

  useEffect(() => {
    if (otp.length >= 4) {
      handleSubmit();
    }
  }, [otp]);
  const { mutateAsync: confirmAccount, isLoading } = useAuthService.useVerifyOTP();
  const { mutateAsync: resendOTP, isLoadingResendOTP } = useAuthService.useResendOTP();

  async function handleSubmit(values, actions) {
    const payload = {
      email: email,
      pin: otp,
      id: id,
    };

    try {
      const response = await confirmAccount(payload);

      props.history.push('/login');
      alert(email);
    } catch (error) {
      // setAccount(error.message);
      console.log(error.message);
      Swal.fire({
        title: 'OTP Verification Failed',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  }

  async function handleResendOTP(values, actions) {
    const payload = {
      id: id,
    };

    try {
      const response = await resendOTP(payload);
    } catch (error) {
      alert(id);
      // setAccount(error.message);
      console.log(error.message);
    }
  }

  return (
    <LoadingOverlay active={isLoading} spinner text="Verifying.... OTP">
      <AuthJumbotron>
        <AuthJumbotron.LeftSideFrame>
          <div className="otp-wrap">
            <OtpInput
              shouldAutoFocus={true}
              inputStyle="otp-input-style"
              value={otp}
              onChange={handleChange}
              numInputs={4}
              separator={<span>-</span>}
            />
          </div>

          <div className="account-footer"></div>
          <div>
            <p>
              Not yet received?{' '}
              <a
                onClick={() => {
                  handleResendOTP();
                }}
              >
                Resend OTP
              </a>
            </p>
          </div>
        </AuthJumbotron.LeftSideFrame>
        <AuthJumbotron.RightSideFrame bgRightImage={bgRightImage}>
          <AuthJumbotron.WelcomeTextWrapper>
            <AuthJumbotron.Title>ALL ABOUT YOUR HEALTH</AuthJumbotron.Title>
          </AuthJumbotron.WelcomeTextWrapper>
        </AuthJumbotron.RightSideFrame>
      </AuthJumbotron>
    </LoadingOverlay>
  );
};

export default VerifyOtp;
