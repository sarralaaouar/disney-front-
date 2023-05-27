import React from "react";
import { useEffect } from "react";
// import axios from "axios";
import { useState } from "react";
import { Space, message, Tag } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, Input, Button } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import { Alert } from "antd";

import axiosInstance from "../../utils/axiosInstance";

import "./ChangePassword.css";
function ChangePassword() {
  let userString = localStorage.getItem("disney_user");
  const token = localStorage.getItem("disney_token");
  const validationSchema = Yup.object().shape({
    passwordCurrent: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Please Enter your confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = await axiosInstance.patch(
          `https://disney-backend.vercel.app/api/v1/users/updatePassword`,
          { ...values }
        );
        let newToken = data.data.token;
        let usr = data.data.data.user;
        console.log(data);
        if (data.status === 200) {
          console.log("token", token);
          console.log("user", usr);
          localStorage.setItem("disney_token", JSON.stringify(newToken));
          localStorage.setItem("disney_user", JSON.stringify(usr));
          message.success("password updated successfully");
        }
      } catch (error) {
        console.log(error);
        message.error(
          error.response ? error.response.data.message : "something went wrong"
        );
      }
    },
  });

  return (
    <div className="change_pwd">
      <h3 className="title_s">Change Password</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Current Password</label>
        <Input.Password
          className="input_user"
          name="passwordCurrent"
          size="large"
          placeholder="Current Password"
          onChange={formik.handleChange}
          value={formik.values.passwordCurrent}
          onBlur={formik.handleBlur}
        />
        {formik.errors["passwordCurrent"] &&
          formik.touched["passwordCurrent"] && (
            <Alert
              type="error"
              message={formik.errors["passwordCurrent"]}
              className="error_msg"
              banner
            />
          )}

        <label htmlFor="email">New Password</label>
        <Input.Password
          className="input_user"
          name="password"
          size="large"
          placeholder="New Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.errors["password"] && formik.touched["password"] && (
          <Alert
            type="error"
            message={formik.errors["password"]}
            className="error_msg"
            banner
          />
        )}
        <label htmlFor="email">Confirm New Password</label>
        <Input.Password
          className="input_user"
          name="passwordConfirm"
          size="large"
          placeholder="Confirm New Password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          onBlur={formik.handleBlur}
        />
        {formik.errors["passwordConfirm"] &&
          formik.touched["passwordConfirm"] && (
            <Alert
              type="error"
              message={formik.errors["passwordConfirm"]}
              className="error_msg"
              banner
            />
          )}
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          style={{ background: "#DB7092", color: "#ffff" }}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
