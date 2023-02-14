import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

import { login } from "../app/features/authSlice";
import Loader from "../components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isLoginSuccess, message } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be longer than 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isLoginSuccess) {
      toast.success(`User ${user.email} logged in!`);
      navigate("/dashboard");
    }
  }, [user, isError, isLoginSuccess, message, dispatch]);

  if (isLoading) {
    <Loader />;
  }

  return (
    <main className="container flex flex-col">
      <form
        className="card flex flex-col items-center"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="h1">Login</h1>
        <label className="flex flex-col relative w-full mt-6">
          <span className="labelspan">Email</span>
          <input
            className={`input${
              formik.touched.email && formik.errors.email
                ? " border-red-500"
                : ""
            }`}
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
          <span className="error">{formik.errors.email}</span>
        ) : null}
        <label className="flex flex-col relative w-full mt-6">
          <span className="labelspan">Password</span>
          <input
            type="password"
            className={`input${
              formik.touched.password && formik.errors.password
                ? " border-red-500"
                : ""
            }`}
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <span className="error">{formik.errors.password}</span>
        ) : null}
        <button
          className="btn bg-cta-200 hover:bg-cta-100 w-full mt-6"
          type="submit"
        >
          Log In
        </button>
      </form>
    </main>
  );
}
