import api from '../../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function RegisterUser(payload) {
  const response = await api.post(ApiEndpoints.REGISTER, payload);
  return response;
}

async function LoginUser(payload) {
  console.log(payload);
  const response = await api.post(ApiEndpoints.LOGIN, payload);

  return response;
}
async function VerifyOTP(payload) {
  const response = await api.post(ApiEndpoints.VERIFY_OTP, payload);
  return response;
}

async function ResendOTP(payload) {
  const response = await api.post(ApiEndpoints.RESEND_OTP, payload);
  return response;
}

export default {
  useLoginService: (...args) => useMutation(LoginUser, ...args),
  useRegisterService: (...args) => useMutation(RegisterUser, ...args),
  useVerifyOTP: (...args) => useMutation(VerifyOTP, ...args),
  useResendOTP: (...args) => useMutation(ResendOTP, ...args),
};
