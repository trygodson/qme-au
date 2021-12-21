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
          onClick={() => {
            handlePaystackPayment(onSuccess, onClose);
          }}
          // onClick={() => setPayMentButton('paystack')}
          type="button"
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
          onClick={() => setPayMentButton('flutterwave')}
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
</Formik>;
