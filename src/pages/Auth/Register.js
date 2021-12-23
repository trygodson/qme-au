import React, { useState } from 'react';
import { Form, Formik, ErrorMessage, useFormik } from 'formik';
import Select from 'react-select';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthJumbotron } from '../../shared/components/authJumbotron/RegisterIndex';
import { logo, bgLeftImage } from '../../EntryFile/images.jsx';
import { Input } from '../../shared/components/formInputs';
import Button from '../../shared/components/button';
import './Auth.scss';
import { useAuthState } from '../../context/useAuthContext';
import useAuthService from '../../shared/hooks/api/useAuthService';
import { setFormikErrors } from '../../utils/errorfield';
import Swal from 'sweetalert2';

const cityOptions = [
  { value: 'abuja', label: 'Abuja' },
  { value: 'lagos', label: 'Lagos' },
  { value: 'enugu', label: 'Enugu' },
];
const stateOptions = [
  { value: 1, label: 'Abuja' },
  { value: 1, label: 'Lagos' },
  { value: 1, label: 'Enugu' },
];
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'others', label: 'Others' },
];
const customStyles = {
  menu: (provided, state) => ({
    ...provided,
  }),

  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    border: '2px solid #888888',
    margin: '10px 0',
    padding: '10px 5px 10px 10px',
    borderColor: state.isFocused ? 'pink' : null,
  }),
};
//const formik = useFormik({});
const getFormProps = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    password: '',
    password_confirmation: '',
    roles_id: '',
    city: '',
    address: '',
    state_id: '',
    gender: '',
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required('First Name Required')
      .matches(/^\S*$/, 'No Spaces')
      .min(3, 'must be three characters long'),
    lastname: Yup.string()
      .required('Surname Name Required')
      .matches(/^\S*$/, 'No Spaces')
      .min(3, 'must be three characters long'),
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    phonenumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone number is short. Should be 11 characters')
      .max(11, 'Phone number is long. Should be 11 characters')
      .required('Phone number is required'),

    password: Yup.string().required('Password is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    state_id: Yup.string().required('State is required'),
    gender: Yup.string().required('Gender is required'),
    password_confirmation: Yup.string()
      .required('required')
      .oneOf([Yup.ref('password'), null], 'password must match'),
  });

  return {
    initialValues,
    validationSchema,
  };
};

const Register = ({ ...props }) => {
  const [act, setAccount] = useState('');
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [role, setRole] = useState(3);
  const { mutateAsync: registerUser, isLoading } = useAuthService.useRegisterService();

  function handleChange(param) {
    setChecked(param);
  }
  async function handleSubmit(values, { setErrors }) {
    const payload = {
      ...values,
      roles_id: role,
    };

    try {
      const response = await registerUser(payload);
      console.log('resgister' + response);
      Swal.fire({
        title: 'Please Login To Complete Registeration',
        text: 'Login Successful',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
      props.history.push({
        pathname: '/login',
        // state: { email: response.email },
        state: { email: response.email, id: response.id },
      });
      // if (response.isConfirmed != true) {
      // } else {
      //   return;
      //   //props.history.push("/app/dashboard");
      // }
    } catch (error) {
      // setAccount(error.response.data.errors);
      console.log(error.errors.message + 'me');
      setFormikErrors(error.errors, setErrors);
    }
  }

  return (
    <AuthJumbotron>
      <AuthJumbotron.LeftSideFrame bgLeftImage={bgLeftImage} right={true}>
        {act != '' && (
          <div class="alert alert-danger" role="alert">
            {act}
          </div>
        )}
        <AuthJumbotron.WelcomeTextWrapper>
          <AuthJumbotron.Title>AN APPLE A DAY KEEPS THE DOCTOR AWAY</AuthJumbotron.Title>
        </AuthJumbotron.WelcomeTextWrapper>
      </AuthJumbotron.LeftSideFrame>
      <AuthJumbotron.RightSideFrame>
        <Formik
          onSubmit={handleSubmit}
          validateOnMount={true}
          initialValues={getFormProps().initialValues}
          validationSchema={getFormProps().validationSchema}
        >
          {({ isSubmitting, isValid, setFieldValue }) => (
            <Form style={{ width: '80%' }}>
              <div className="row" style={{ alignSelf: 'center' }}>
                <div className="text-center">
                  <div style={{ width: '80%', margin: '20px auto' }}>
                    <Link to="/">
                      <img src={logo} width="200px" className="mb-4" />
                    </Link>
                    <div>
                      <span>Create Your Account</span>
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center m-2 p-0">
                  <a
                    className="selector mb-2 col-6 "
                    onClick={() => {
                      handleChange(false);
                      setRole(3);
                    }}
                    style={checked == false ? { borderColor: 'black' } : null}
                  >
                    <div className="text-select">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="Avatar"
                        className="avatar"
                      />

                      <div>For Individual</div>
                    </div>
                  </a>
                  <a
                    className="col-6 selector col-6 "
                    onClick={() => {
                      handleChange(true);
                      setRole(2);
                    }}
                    style={checked == true ? { borderColor: 'black' } : null}
                  >
                    <div className="text-select">
                      <img
                        src="https://cdnuploads.aa.com.tr/uploads/Contents/2020/12/26/thumbs_b_c_c0030826b29b85e101320cc3e8fec654.jpg?v=003953"
                        alt="Avatar"
                        className="avatar"
                      />

                      <div>For Doctors</div>
                    </div>
                  </a>
                </div>
              </div>

              <Input>
                <div className="row">
                  <div className="col-lg-6">
                    <Input.FormGroup className="input-group input-group--prepend" login={false}>
                      <Input.InputField
                        type="text"
                        name="firstname"
                        className="input"
                        placeholder="First Name"
                      ></Input.InputField>
                    </Input.FormGroup>
                    <ErrorMessage className="text-danger" component="div" name="firstname" />
                  </div>
                  <div className="col-lg-6">
                    <Input.FormGroup className="input-group input-group--prepend" login={false}>
                      <Input.InputField
                        type="text"
                        name="lastname"
                        className="input"
                        placeholder="Your Lastname"
                      ></Input.InputField>
                    </Input.FormGroup>
                    <ErrorMessage className="text-danger" component="div" name="lastname" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Input.FormGroup className="input-group input-group--prepend" login={false}>
                      <Input.InputField
                        type="email"
                        name="email"
                        className="input"
                        placeholder="johndoe@email.com"
                      ></Input.InputField>
                    </Input.FormGroup>
                    <ErrorMessage className=" text-danger" component="div" name="email" />
                  </div>
                  <div className="col-lg-6">
                    <Input.FormGroup className="input-group input-group--prepend" login={false}>
                      <Input.InputField
                        type="phone"
                        name="phonenumber"
                        className="input"
                        placeholder="+23480000000"
                      ></Input.InputField>
                    </Input.FormGroup>
                    <ErrorMessage className=" text-danger" component="div" name="phonenumber" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Input.FormGroup className="input-group input-group--prepend" login={false}>
                      <Input.InputField
                        type="password"
                        name="password"
                        className="input"
                        placeholder="*******"
                      ></Input.InputField>
                    </Input.FormGroup>
                    <ErrorMessage className=" text-danger" component="div" name="password" />
                  </div>
                  <div className="col-lg-6">
                    <Input.FormGroup className="input-group input-group--prepend" login={false}>
                      <Input.InputField
                        type="password"
                        name="password_confirmation"
                        className="input"
                        placeholder="Password (confirm)"
                      ></Input.InputField>
                    </Input.FormGroup>
                    <ErrorMessage
                      className="text-danger"
                      component="div"
                      name="password_confirmation"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Select
                      name="city"
                      styles={customStyles}
                      options={cityOptions}
                      placeholder="City"
                      onChange={({ value }) => setFieldValue('city', value)}
                    />
                    <ErrorMessage className="text-danger" component="div" name="city" />
                  </div>
                  <div className="col-lg-6">
                    <Input.FormGroup className="input-group input-group--prepend" login={false}>
                      <Input.InputField
                        type="text"
                        name="address"
                        component="textarea"
                        rows="3"
                        className="input"
                        placeholder="Address"
                      ></Input.InputField>
                    </Input.FormGroup>
                    <ErrorMessage className="text-danger" component="div" name="address" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Select
                      name="state_id"
                      options={stateOptions}
                      styles={customStyles}
                      placeholder="State"
                      onChange={({ value }) => setFieldValue('state_id', value)}
                    />
                    <ErrorMessage className="text-danger" component="div" name="state_id" />
                  </div>
                  <div className="col-lg-6">
                    <Select
                      name="gender"
                      options={genderOptions}
                      styles={customStyles}
                      placeholder="Gender"
                      onChange={({ value }) => setFieldValue('gender', value)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center justify-content-center">
                    <Input.CheckBox type="checkbox" name="terms-and-conditions"></Input.CheckBox>
                    <p className="mb-0">
                      Accept the{' '}
                      <Link style={{ color: '#2c91f7' }} to="/">
                        terms and conditions
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    login={false}
                    disabled={isSubmitting || !isValid}
                    isLoading={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    Signup
                  </Button>
                </div>
              </Input>

              <div style={{ height: '0.5px' }}></div>
            </Form>
          )}
        </Formik>
        <div>
          <p>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2c91f7' }}>
              Login
            </Link>
          </p>
        </div>
      </AuthJumbotron.RightSideFrame>
    </AuthJumbotron>
  );
};

export default Register;
