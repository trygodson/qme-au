import api from '../../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function payNow(payload) {
  const response = await api.post(ApiEndpoints.CHECK_AVAILABLITY, payload);
  return response;
}

async function scheduleAppointment(payload) {
  const response = await api.post(ApiEndpoints.CREATE_APPOINTMENT, payload);
  return response;
}
// async function ConfirmAccount(payload) {
//   const response = await api.post(ApiEndpoints.CONFIRM_ACCOUNT, payload);
//   return response;
// }

export default {
  usePayNow: (...args) => useMutation(payNow, ...args),
  scheduleAppointment: (...args) => useMutation(scheduleAppointment, ...args),
  //   useConfirmAccount: (...args) => useMutation(ConfirmAccount, ...args),
};
