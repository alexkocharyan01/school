import React, { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from '../../Pages/Settings/SettingsPages/ProfileSettings/ProfileData/PasswordModal/userUpdatePasswordSlice';
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordContainer() {

  const [passwordShown, setPasswordShown] = useState({
    "old_password": false,
    "new_password": false,
    "confirm_password": false,
  });
  const [error, setError] = useState(false);

  const {register, handleSubmit, formState: {errors}, resetField} = useForm();
  const token = localStorage.getItem('ACCESS_TOKEN')

  const dispatch = useDispatch()

  const togglePassword = (id) => {
      setPasswordShown({
        ...passwordShown,
        [id]: !passwordShown[id]
      });
  };

  const handleChange = (value) => {

    if (value.newPassword !== value.passwordConfirm) {
      setError(true)
      return
    }

    const pass = {
      pass: {
        password: value.password,
        passwords: {
          newPassword: value.newPassword,
          passwordConfirm: value.passwordConfirm,
        }
      },
      token
  }
  dispatch(changePassword(pass))

    resetField('password')
    resetField('newPassword')
    resetField('passwordConfirm')
  }

  return (
    <form onSubmit={handleSubmit(handleChange)}>
      <div className="confirm_password">
        <label htmlFor="old_password">Old Password<span>*</span></label>
        <input
          type={passwordShown.old_password
            ? "text" : "password"}
          id="old_password"
          {...register("password", {required: true})}
        />
        <div className="show_hide" onClick={() => togglePassword("old_password")}>
          {passwordShown.old_password ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <div className="confirm_password">
        <label htmlFor="new_password">New Password<span>*</span></label>
        <input
          type={passwordShown.new_password ? "text" : "password"}
          id="new_password"
          {...register("newPassword", {required: true})}
        />
        <div className="show_hide" onClick={() => togglePassword("new_password")}>
          {passwordShown.new_password ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <div className="confirm_password">
        <label htmlFor="confirm_password">Confirm Password<span>*</span></label>
        <input
          type={passwordShown.confirm_password ? "text" : "password"}
          id="confirm_password"
          {...register("passwordConfirm", {required: true})}
        />
        <div className="show_hide" onClick={() => togglePassword("confirm_password")}>
          {passwordShown.confirm_password ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <button><p>Update Password</p></button>
    </form>
  )
}
