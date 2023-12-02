import React, { useState } from 'react';
import '../Auth.scss';
import { Button, InputField } from '../../../Components';
import { findError } from '../../../Utils';

export default function Login({ submitHandler, controls, errors, showErr, onChange, loading }) {
  const { phone_number, password } = controls;
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  return (
    <div className="signup-content login-content">
      <InputField
        type='number'
        placeholder='Mobile Number'
        value={phone_number}
        onChange={(e) => onChange(e, 'PHONE')}
        error={findError('phone_number', errors, showErr)}
      />
      <Button loading={loading} text={'Login via OTP'} width='80%' margin='0.5rem auto' type={'button'} clicker={submitHandler} />
    </div>
  );
}
