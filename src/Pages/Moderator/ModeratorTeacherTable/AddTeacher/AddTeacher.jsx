import React, {useEffect, useState} from 'react'
import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Close, Visibility, VisibilityOff} from '@mui/icons-material';
import "./AddTeacher.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {moderatorRegisterTeacher, clearData} from "../../ModeratorSlice";
import {Alert} from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

const useStyles = makeStyles(() => ({
  dialog: {
      height: '76vh',
  }
}));

export default function AddTeacher({show, setShow}) {

  const [passwordShown, setPasswordShown] = useState({
    "password": false,
    "new_password": false,
    "confirm_password": false,
});
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const token = localStorage.getItem('ACCESS_TOKEN');

  const classes = useStyles()

  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors}, resetField} = useForm();

  const addTeacher = useSelector(((state) => state.moderatorTeacher))

  const handleClick = (data) => {
    // const arr = Object.entries(data)
    // const filtered = arr.filter(([key]) => key !== 'password' && key !== 'passwordConfirm' && key !== 'phone')
    // const newObj = Object.fromEntries(filtered)
    const value = {
      data,
      token
    }
    console.log(value);
    dispatch(moderatorRegisterTeacher(value));
    setOpenSnackbar(false)
    setTimeout(() => {
        setShow(false)
      }, 2000)
  }

  const handleClose = () => {
    setShow(false)
    resetField('firstName')
    resetField('lastName')
    resetField('phone')
    resetField('password')
    resetField('passwordConfirm')
    resetField('email')
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const togglePassword = (id) => {
        setPasswordShown({
            ...passwordShown,
            [id]: !passwordShown[id]
        });
    };

  useEffect(() => {
    if (addTeacher.data.status === 'success') {
      setMessage('Teacher Created')
      setOpenSnackbar(true);
      setTimeout(() => {
        resetField('firstName')
        resetField('lastName')
        resetField('phone')
        resetField('password')
        resetField('passwordConfirm')
        resetField('email')
        setShow(false)
        setOpenSnackbar(false);
        dispatch(clearData())
      }, 2000);
    } if (error) {
    setTimeout(() => {
      setError(false)
    }, 3000)
    setMessage('does not much')
    setShow(true)
    }

  }, [addTeacher.data, error, addTeacher.error, show])

  return (
    <Dialog
      open={show}
      fullWidth
      maxWidth="xs"
      classes={{paper: classes.dialog}}
      bodyStyle={{backgroundColor: 'rgba(228, 241, 250, 0.91)'}}
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div className="header_container">
          <div className="moderator_dialog_header">
            <p>Add Teacher</p>
          </div>
          <div className="admin_dialog_button">
            <button onClick={handleClose}>
                <Close/>
            </button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
          <div className="dialog_content">
          <form onSubmit={handleSubmit(handleClick)}>
            <div className="dialog_content_person_info">
              <div className="dialog_content_first_name">
                <label htmlFor="firstname">First name<span>*</span></label>
                <input
                  className='input'
                  type="text"
                  id="firstname"
                  {...register("firstname", {required: true})}
                />
              </div>
              <div className="dialog_content_last_name">
                <label htmlFor="lastname">Last Name
                  <slabelan>*</slabelan>
                </label>
                <input
                  className='input'
                  type="text"
                  id="lastname"
                  {...register("lastname", {required: true})}
                />
              </div>
              <div className="">
                <label htmlFor="email">Email<span>*</span></label>
                <input
                  className='input'
                  type="email"
                  id="email"
                  {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                />
              </div>
              <div className="">
                <label htmlFor="phone">Phone<span>*</span></label>
                <input
                  className='input'
                  type="number"
                  id="phone"
                  {...register("phone", {required: true, valueAsNumber: true})}
                />
              </div>
              <div className="add_teacher_gender">
                <p>Gender</p>
                <div className="choose_gender">
                    <div>
                        <label htmlFor="male">Male<span>*</span></label>
                        <input
                            type="radio"
                            id='male'
                            name='gender'
                            value="male"
                            {...register("gender", {required: true})} />
                    </div>
                    <div>
                        <label htmlFor="female">Female<span>*</span></label>
                        <input
                            type="radio"
                            id='female'
                            name='gender'
                            value="female"
                            {...register("gender", {required: true})} />
                    </div>
                </div>
              </div>
              <div className="dialog_password">
                <label htmlFor="password">Password<span>*</span></label>
                <div className="add_password">
                  <input
                    className='input'
                    type={passwordShown.password ? "text" : "password"}
                    id="password" {...register("password", {required: true})} />
                  <div onClick={() => togglePassword('password')}>
                      {passwordShown.password ? <VisibilityOff/> : <Visibility/>}
                  </div>
                </div>
              </div>
              <div className="dialog_password">
                <label htmlFor="passwordConfirm">Confirm your password<span>*</span></label>
                <div className="add_password">
                  <input
                    className='input' type={passwordShown.passwordConfirm ? "text" : "password"}
                    id="passwordConfirm" {...register("passwordConfirm", {required: true})} />
                  <div onClick={() => togglePassword('passwordConfirm')}>
                      {passwordShown.passwordConfirm ? <VisibilityOff/> : <Visibility/>}
                  </div>
                </div>
              </div>
              </div>
              <div className="moderator_content_button">
                  <button>Add</button>
              </div>
              </form>
          </div>
        </DialogContent>
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center',}}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}>
            <Alert
                onClose={handleCloseSnackbar}
                severity="info" sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    </Dialog>
    )
}
