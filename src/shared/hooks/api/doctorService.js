// import api from '../../../utils/api';
// import { useMutation } from 'react-query';
// import { ApiEndpoints } from '../../config/Endpoints';

// async function RegisterUser(payload) {
//   const response = await api.post(ApiEndpoints.REGISTER, payload);
//   return response;
// }

// async function LoginUser(payload) {
//   console.log(payload);
//   const response = await api.post(ApiEndpoints.LOGIN, payload);

//   return response;
// }
// async function ConfirmAccount(payload) {
//   const response = await api.post(ApiEndpoints.CONFIRM_ACCOUNT, payload);
//   return response;
// }

// export default {
//   useLoginService: (...args) => useMutation(LoginUser, ...args),
//   useRegisterService: (...args) => useMutation(RegisterUser, ...args),
//   useConfirmAccount: (...args) => useMutation(ConfirmAccount, ...args),
// };
