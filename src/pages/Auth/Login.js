import { useState } from 'react';
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
import Swal from 'sweetalert2';

const getFormProps = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return {
    initialValues,
    validationSchema,
  };
};

const Login = props => {
  const [act, setAccount] = useState('');
  const { dispatch } = useAuthState();
  const { mutateAsync: loginUser, isLoading } = useAuthService.useLoginService();
  async function handleSubmit(values) {
    const { email, password } = values;
    const payload = {
      email,
      password,
    };

    try {
      const response = await loginUser(payload);
      if (response.user.isVerified == true) {
        dispatch(
          AuthActionSuccess({
            token: response.token,

            currentUser: {
              name: response.user.firstname + ' ' + response.user.lastname,
              id: response.user.id,
              email: response.user.email,
            },
            permission: [],
          }),
        );

        props.history.push('/');
        // window.location.href = 'https://onemedy.com';
      } else {
        console.log(response);
        props.history.push({
          pathname: '/verify-otp',
          // state: { email: response.email },
          state: { email: response.user.email, id: response.user.id },
        });
      }

      // }
    } catch (error) {
      return Swal.fire({
        title: 'Login Failed',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
      console.log(error.message);
    }
  }

  return (
    <>
      <AuthJumbotron>
        <AuthJumbotron.LeftSideFrame>
          {act != '' && (
            <div class="alert alert-danger" role="alert">
              {act}
            </div>
          )}

          <Formik
            onSubmit={handleSubmit}
            validateOnMount={true}
            initialValues={getFormProps().initialValues}
            validationSchema={getFormProps().validationSchema}
          >
            {({ isSubmitting, isValid }) => (
              <Form style={{ width: '80%' }}>
                <div className="text-center">
                  <div style={{ width: '80%', margin: '20px auto' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <img src={logo} width="200px" />
                    </Link>
                    <div>
                      <span>Please Login into Your Account</span>
                    </div>
                  </div>
                </div>
                <Input>
                  <Input.FormGroup className="input-group input-group--prepend" login={true}>
                    <Input.InputField
                      type="email"
                      name="email"
                      className="input"
                      placeholder="email@email.com"
                    ></Input.InputField>
                  </Input.FormGroup>
                  <ErrorMessage
                    className=" text-danger text-center "
                    component="div"
                    name="email"
                  />
                  <Input.FormGroup className="input-group input-group--prepend" login={true}>
                    <Input.InputField
                      type="password"
                      name="password"
                      className="input"
                      placeholder="*******"
                    ></Input.InputField>
                  </Input.FormGroup>
                  <ErrorMessage
                    className=" text-danger text-center"
                    component="div"
                    name="password"
                  />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                      <Input.CheckBox type="checkbox" name="remember-me"></Input.CheckBox>
                      <span className="mb-0">Remeber Me</span>
                    </div>
                    <div>
                      <span style={{ color: '#2c91f7' }}>Forgot Password</span>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      login={true}
                      disabled={isSubmitting || !isValid}
                      isLoading={isSubmitting}
                      style={{ width: '100%' }}
                    >
                      Login
                    </Button>
                  </div>
                </Input>
                <div style={{ height: '0.5px' }}></div>
              </Form>
            )}
          </Formik>
          <div>
            <p>
              Dont have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </AuthJumbotron.LeftSideFrame>
        <AuthJumbotron.RightSideFrame bgRightImage={bgRightImage}>
          <AuthJumbotron.WelcomeTextWrapper>
            <AuthJumbotron.Title>ALL ABOUT YOUR HEALTH</AuthJumbotron.Title>
          </AuthJumbotron.WelcomeTextWrapper>
        </AuthJumbotron.RightSideFrame>
      </AuthJumbotron>
    </>
  );
};

export default Login;
