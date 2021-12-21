const BASE_URL = 'http://shop.scnip.net/api/v1/';
// const BASE_URL = 'http://localhost:8000/api/v1/';

const ApiEndpoints = {
  // Users
  LOGIN: `login`,
  REGISTER: `register`,
  VERIFY: `verify`,
  RESEND_OTP: `resend_otp`,
  VERIFY_OTP: `verify`,
  DOCTOR_SEARCH: `doctorsearch`,
  DOCTOR_DETAIL: `doctordetail`,
  CHECK_AVAILABLITY: `appointment/customer/checkavailability`,
  CREATE_APPOINTMENT: `appointment/customer/create`,
  SPECIALIZATION: `specialization`,
};

export { BASE_URL, ApiEndpoints };
