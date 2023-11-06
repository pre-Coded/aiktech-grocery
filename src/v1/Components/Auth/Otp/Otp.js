import React from 'react'
import '../Auth.scss';
import { Button, InputField } from '../../../Components';
import { findError } from '../../../Utils';

export default function Otp({ controls, submitHandler, onChange, errors, showErr, sendOtp, loading }) {
    const { phone_number, otp } = controls;
    return (
        <div className="signup-content">
            <InputField type='number' placeholder='Mobile Number' value={phone_number} onChange={(e) => onChange(e, 'PHONE')} disabled={true} error={findError('phone_number', errors, showErr)} />
            <InputField type="number" placeholder='OTP' value={otp} onChange={(e) => onChange(e, 'OTP')} error={findError('otp', errors, showErr)} />
            <div className="resend-otp" onClick={() => sendOtp(true)}>Resend OTP</div>
            <Button loading={loading} text={'Verify Otp'} width='80%' margin='0.5rem auto' type={'button'} clicker={submitHandler} />
        </div>
    )
}
