import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { InputField, Button } from '../../../Components';
import { findError } from '../../../Utils';

export default function PasswordLogin({ controls, submitHandler, onChange, errors, showErr, loading }) {
  const { phone_number, password } = controls;
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const clickHandler=()=>{
    setShowPasswordInput(true)
    if (password) {
      submitHandler();
    }else{
      toast.error("Please type password");
    }
   }
  return (
    <div>
      {showPasswordInput && (
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e, 'PASSWORD')}
          error={findError('password', errors, showErr)}
        />
      )}

     <Button loading={loading} text={'Login via Password'} width='80%' margin='0.5rem auto' type={'button'} clicker={clickHandler} />
    </div>
  );
}
