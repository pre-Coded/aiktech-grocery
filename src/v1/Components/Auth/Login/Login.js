// // import React from 'react';
// // import '../Auth.scss';
// // import { Button, InputField } from '../../../Components';
// // import { findError } from '../../../Utils';

// // export default function Login({ submitHandler, controls, errors, showErr, onChange, loading }) {
// //     const { phone_number, password } = controls;
// //     return (
// //         <div className="signup-content login-content">
// //             <InputField type='number' placeholder='Mobile Number' value={phone_number} onChange={(e) => onChange(e, 'PHONE')} error={findError('phone_number', errors, showErr)} />
// //             {/* <input
// //                             type="password"
// //                             placeholder="Password"
// //                             value={password}
// //                             onChange={(e) => setPassword(e.target.value)}
// //                         /> */}
// //                         {/* <button onClick={() => setlogin_option('otp')}>Login with OTP</button> */}
// //             <InputField type="password" placeholder='Password' value={password} onChange={(e) => onChange(e, 'PASSWORD')} error={findError('password', errors, showErr)} />
// //             <Button loading={loading} text={'Login'} width='80%' margin='0.5rem auto' type={'button'} clicker={submitHandler} />
// //         </div>
// //     )
// // }

// Import necessary components and functions
import React, { useState } from 'react';
import '../Auth.scss';
import { Button, InputField } from '../../../Components';
import { findError } from '../../../Utils';

export default function Login({ submitHandler, controls, errors, showErr, onChange, loading }) {
  const { phone_number, password } = controls;
  const [showPasswordInput, setShowPasswordInput] = useState(false);

//   const handleLogin = () => {
//     if (showPasswordInput && !password) {
//       // If password input is shown but no password is provided, handle accordingly
//       // You can display an error message or take other actions
//       console.log('Password is required.');
//     } else {
//       // Call the submitHandler with appropriate data
//       submitHandler();
//     }
//   };

  return (
    <div className="signup-content login-content">
      <InputField
        type='number'
        placeholder='Mobile Number'
        value={phone_number}
        onChange={(e) => onChange(e, 'PHONE')}
        error={findError('phone_number', errors, showErr)}
      />

      {/* {showPasswordInput && (
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e, 'PASSWORD')}
          error={findError('password', errors, showErr)}
        />
      )}

      <button onClick={() => setShowPasswordInput(!showPasswordInput)}>Login with PASSWORD</button> */}

      

      <Button loading={loading} text={'Login via OTP'} width='80%' margin='0.5rem auto' type={'button'} clicker={submitHandler} />
    </div>
  );
}
