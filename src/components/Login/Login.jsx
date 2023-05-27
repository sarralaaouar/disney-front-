import { Button, Input, message } from "antd";
import React from "react";
import "./Loginform.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const navigate = useHistory();

  let userString = localStorage.getItem("disney_user");
  if (userString) {
    navigate.push("/profile");
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().min(8).required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const data = await axios.post(
          "https://disney-backend.vercel.app/api/v1/users/login",
          { ...values }
        );
        const user = await data.data.data.user;
        const token = await data.data.token;
        if (data.status === 200) {
          localStorage.setItem("disney_user", JSON.stringify(user));
          localStorage.setItem("disney_token", JSON.stringify(token));
          navigate.push("/profile");
        }
      } catch (error) {
        console.log(error);
        message.error(
          error.response
            ? "Incorrect email or password"
            : "something went wrong"
        );
      }
    },
  });
  return (
    <div className="login_s">
      <div className="card_login">
        <p className="title_login">Disney</p>
        <p className="subtitle">Welcome back! Please enter your details.</p>
        <form action="login" onSubmit={formik.handleSubmit} className="form">
          <label htmlFor="email">Email*</label>
          <Input
            size="large"
            className="input_login"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="password">Password*</label>
          <Input.Password
            size="large"
            className="input_login"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <Alert type="error" message={formik.errors.email} banner />
          )}
          {formik.touched.password && formik.errors.password && (
            <Alert type="error" message={formik.errors.password} banner />
          )}

          <div className="action_login">
            <Button onClick={formik.handleSubmit}>Login</Button>
          </div>
        </form>
        <p className="signup_text">
          Don’t have an account?{" "}
          <a className="link_reg" href="/register">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
