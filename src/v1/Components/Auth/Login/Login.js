import React from 'react';
import '../Auth.scss';
import { Button, InputField } from '../../../Components';
import { findError } from '../../../Utils';

export default function Login({ submitHandler, controls, errors, showErr, onChange, loading }) {
    const { phone_number, password } = controls;
    return (
        <div className="signup-content login-content">
            <InputField type='number' placeholder='Mobile Number' value={phone_number} onChange={(e) => onChange(e, 'PHONE')} error={findError('phone_number', errors, showErr)} />
            {/* <InputField type="password" placeholder='Password' value={password} onChange={(e) => onChange(e, 'PASSWORD')} error={findError('password', errors, showErr)} /> */}
            <Button loading={loading} text={'Login'} width='80%' margin='0.5rem auto' type={'button'} clicker={submitHandler} />
        </div>
    )
}
