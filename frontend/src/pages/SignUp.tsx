import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSignupMutation } from '../app/services/auth';
import { createCredentials } from '../features/auth/authSlice';

import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import Loader from '../components/Loader';

export default function SignUp() {
  const [signup, { isLoading, isError, isSuccess, error }] =
    useSignupMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be longer than 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      const userData = {
        email: values.email,
        password: values.password,
      };

      try {
        const result = await signup(userData);
        if (result.data) {
          dispatch(createCredentials(result.data));
          resetForm();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error('Epic Fail Dude');
    }

    if (isSuccess) {
      toast.success(`User signed up successfully!`);
      navigate('/login');
    }
  }, [signup, isError, isSuccess, error, dispatch]);

  return (
    <main className='container flex flex-col'>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className='card flex flex-col items-center'
          onSubmit={formik.handleSubmit}
        >
          <h1 className='h1'>Sign Up</h1>

          <label className='flex flex-col relative w-full mt-6'>
            <span className='labelspan'>Email</span>
            <input
              className={`input${
                formik.touched.email && formik.errors.email
                  ? ' border-red-500'
                  : ''
              }`}
              name='email'
              id='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <span className='error'>{formik.errors.email}</span>
          ) : null}
          <label className='flex flex-col relative w-full mt-6'>
            <span className='labelspan'>Password</span>
            <input
              type='password'
              className={`input${
                formik.touched.password && formik.errors.password
                  ? ' border-red-500'
                  : ''
              }`}
              name='password'
              id='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <span className='error'>{formik.errors.password}</span>
          ) : null}
          <label className='flex flex-col relative w-full mt-6'>
            <span className='labelspan'>Confirm Password</span>
            <input
              type='password'
              className={`input${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? ' border-red-500'
                  : ''
              }`}
              name='confirmPassword'
              id='confirmPassword'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
          </label>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className='error'>{formik.errors.confirmPassword}</span>
          ) : null}
          <button
            className='btn bg-cta-200 hover:bg-cta-100 w-full mt-6'
            type='submit'
          >
            Sign Up
          </button>
        </form>
      )}
    </main>
  );
}
