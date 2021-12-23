import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import moment from 'moment';
import './index.scss';
// import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label } from 'reactstrap';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import PickDate from 'react-datepicker';
import { Input, DatePicker, TimePicker } from '../formInputs';
import * as Yup from 'yup';
import Button from '../button';
import { fadeInRight } from 'react-animations';
import { XSquare } from 'react-bootstrap-icons';
import { _config } from '../../config/flutterConfig';
import { paystackConfig } from '../../config/paystackConfig';
import { usePaystackPayment } from 'react-paystack';
import usePaymentService from '../../hooks/api/usePaymentService';
import Swal from 'sweetalert2';

const bounceAnimation = keyframes`${fadeInRight}`;
const _div = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const getFormProps = () => {
  const initialValues = {
    appointmentDate: '',
    appointmentStartTime: '',
    appointmentEndTime: '',
    notes: '',
  };

  const validationSchema = Yup.object().shape({
    appointmentDate: Yup.string().required('Appointment Date Required'),
    appointmentStartTime: Yup.string().required('Appointment Time Required'),
    appointmentEndTime: Yup.string().required('Appointment Time Required'),
    notes: Yup.string().required('Please Write A Notes'),
  });

  return {
    initialValues,
    validationSchema,
  };
};
function BookAppointmentForm(props) {
  const newFlutterConfig = { ..._config, amount: parseInt(props.consultation_fee) + 10 };
  const newPaystackConfig = { ...paystackConfig, amount: parseInt(props.consultation_fee) + 10 };
  const [payMentButton, setPayMentButton] = useState(null);

  const { mutateAsync: payNow } = usePaymentService.usePayNow();
  const { mutateAsync: scheduleAppointment } = usePaymentService.scheduleAppointment();

  const handleFlutterPayment = useFlutterwave(newFlutterConfig);
  const handlePaystackPayment = usePaystackPayment(newPaystackConfig);
  let note = {};
  async function handlePayment(values) {
    // console.log(moment(values.appointmentDate).format());
    const data = {
      starts_at: `${moment(values.appointmentDate).format('yyyy-MM-DD')} ${moment(
        values.appointmentStartTime,
      ).format('HH:mm:ss')}`,
      ends_at: `${moment(values.appointmentDate).format('yyyy-MM-DD')} ${moment(
        values.appointmentEndTime,
      ).format('HH:mm:ss')}`,
      id: props.doctorId,
    };
    note = {
      starts_at: `${moment(values.appointmentDate).format('yyyy-MM-DD')} ${moment(
        values.appointmentStartTime,
      ).format('HH:mm:ss')}`,
      ends_at: `${moment(values.appointmentDate).format('yyyy-MM-DD')} ${moment(
        values.appointmentEndTime,
      ).format('HH:mm:ss')}`,
      doctor_id: props.doctorId,
      specialization_id: props.spec_id,
      amount: parseInt(props.consultation_fee),
      user_id: props.user_id,
      note: values.notes,
    };

    try {
      await payNow(data);

      if (payMentButton == 1) {
        return handlePaystackPayment(onSuccess, onClose);
      } else if (payMentButton == 2) {
        return handleFlutterPayment({
          callback: res => {
            const _dt = {
              ...note,
              ref_id: `${res.tx_ref}`,
              payment_methods_id: payMentButton,
            };
            try {
              scheduleAppointment(_dt);
              Swal.fire({
                title: 'Success',
                text: 'Appointment Created Successfully. Please login to  you dashboard to view appointment and attend to them. Also know that you can chat with your doctor while the appointment is going on',
                icon: 'error',
                confirmButtonText: 'Cool',
              });
            } catch (error) {
              console.log(error);
            }
            closePaymentModal();
          },
        });
      } else {
        Swal.fire({
          title: 'Payment Channel not valid',
          text: 'We dont use this channel at the moment',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Schedule Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
    // handleFlutterPayment({
    //   callback: response => {
    //     console.log(response);
    //     closePaymentModal(); // hjgkjhkijhuihliuhlihjliuhuiyghukhgkuhgty
    //   },
    //   onClose: () => {},
    // });
  }

  const onSuccess = reference => {
    props.setIsloadingOverlay(true);
    const _dt = {
      ...note,
      ref_id: `${reference.reference}`,
      payment_methods_id: payMentButton,
    };
    try {
      const res = scheduleAppointment(_dt);
      console.log(res.message);
      props.setIsloadingOverlay(false);
      Swal.fire({
        title: 'Appointment Message',
        text: res.message,
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    } catch (error) {
      Swal.fire({
        title: 'Appointment Not Complete',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const flutterCallback = res => {
    console.log(res);
    // try {
    //   scheduleAppointment({
    //     ...note,
    //     ref_id: res.reference,
    //     payment_method_id: payMentButton,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    closePaymentModal();
  };

  return (
    <_div className="modal-form-73u543">
      <div className="container">
        <div className="modal-header">
          <h2>Book Online Form</h2>
          <XSquare size={20} onClick={() => props.setShowModal(false)} />
        </div>
        {/* <div className="container">
              <div className="modal-header">
                <h2>Tenant Form</h2>
                <i className="bx bx-x close" onClick={() => props.setShowModal(false)}></i>
              </div> */}
        <div className="modal-body">
          {' '}
          <Formik
            onSubmit={handlePayment}
            validateOnMount={true}
            initialValues={getFormProps().initialValues}
            validationSchema={getFormProps().validationSchema}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                {/* <Input.FormGroup>
      <Input.InputField name="time" placeholder="Field 1" type="email" />
    </Input.FormGroup> */}
                <Field name={'notes'}>
                  {({ form, field }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (
                      <textarea
                        name="notes"
                        id="notes"
                        value={value}
                        onChange={({ target }) => setFieldValue('notes', target.value)}
                        placeholder="Write a Short Note"
                      />
                    );
                  }}
                </Field>
                <ErrorMessage className="text-danger" name={'appointmentDate'} />

                <Field name={'appointmentDate'}>
                  {({ form, field }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (
                      <PickDate
                        name="appointmentDate"
                        id="appointmentDate"
                        selected={value}
                        startDate={moment()}
                        minDate={new Date()}
                        time={false}
                        autoComplete="off"
                        onChange={val => setFieldValue('appointmentDate', val)}
                        placeholderText="Pick a Date"
                      />
                    );
                  }}
                </Field>
                <ErrorMessage className="text-danger" name={'appointmentDate'} />

                <div className="row">
                  <div className="col-lg-6">
                    <Field name={'appointmentStartTime'}>
                      {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                          <PickDate
                            id="appointmentStartTime"
                            selected={value}
                            showTimeSelect
                            showTimeSelectOnly
                            time={true}
                            autoComplete="off"
                            onChange={val => setFieldValue('appointmentStartTime', val)}
                            placeholderText="Select a Start Time"
                            timeIntervals={30}
                            timeCaption={`Time`}
                            dateFormat={`h:mm aa`}
                          />
                        );
                      }}
                    </Field>
                    <ErrorMessage className="text-danger" name={'appointmentStartTime'} />
                  </div>
                  <div className="col-lg-6">
                    <Field name={'appointmentEndTime'}>
                      {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                          <PickDate
                            id="appointmentEndTime"
                            selected={value}
                            showTimeSelect
                            showTimeSelectOnly
                            time={true}
                            autoComplete="off"
                            onChange={val => setFieldValue('appointmentEndTime', val)}
                            placeholderText="Select a Start Time"
                            timeIntervals={30}
                            timeCaption={`Time`}
                            dateFormat={`h:mm aa`}
                          />
                        );
                      }}
                    </Field>
                    <ErrorMessage className="text-danger" name={'appointmentEndTime'} />
                  </div>
                </div>
                {/* <Input.FormGroup>
      <Input.InputField id="Field 4" name="text" placeholder="Field 4" type="email" />
    </Input.FormGroup> */}
                <div>
                  <Button
                    // onClick={() => {
                    //   handlePaystackPayment(onSuccess, onClose);
                    // }}
                    onClick={() => setPayMentButton(1)}
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    isLoading={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    Pay With PayStack
                  </Button>
                  <Button
                    // onClick={() => {
                    //   handleFlutterPayment({
                    //     callback: response => {
                    //       console.log(response);
                    //       closePaymentModal(); // hjgkjhkijhuihliuhlihjliuhuiyghukhgkuhgty
                    //     },
                    //     onClose: () => {},
                    //   });
                    // }}
                    onClick={() => setPayMentButton(2)}
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    isLoading={isSubmitting}
                    style={{ width: '100%', backgroundColor: 'blue' }}
                  >
                    Pay With FlutterWave
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* <div className = "modal-footer">
              <hr />
                <button className = "btn btn-success">Submit</button>
                <button className = "btn btn-secondary" onClick = {()=>props.setShowModal(false)}>Cancel</button>
            </div> */}
      </div>
    </_div>
  );
}

export default BookAppointmentForm;
