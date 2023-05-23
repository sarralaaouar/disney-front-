import React from "react";
import { Avatar, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMailOutline, MdLocationPin } from "react-icons/md";
import "./Profile.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Space, message, Tag } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
const Profile = () => {
  let userString = localStorage.getItem("disney_user");
  const token = localStorage.getItem("token");
  let user = JSON.parse(userString);
  const [orders, setOrders] = useState([]);
  console.log(user);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await axios.get(
        "https://disney-backend.vercel.app/api/v1/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await orders;
      setOrders(
        data?.data?.data?.data.filter((el) => el.user.email === user.email)
      );
    };
    getOrders();
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: token ? user.email : "",
      phone: token ? user.phone : "",
      name: token ? user.name : "",
      location: token ? user.location : "",
    },
    // validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const data = await axios.put(
          `https://disney-backend.vercel.app/api/v1/users/${user?._id}`,
          { ...values }
        );
        let usr = data.data.data.data;
        if (data.status === 200) {
          localStorage.setItem("disney_user", JSON.stringify(usr));
          message.success("profile updated successfully");
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
    <div className="profile">
      <div className="profile_left section">
        <div className="avatar">
          <Avatar size={55} icon={<UserOutlined />} />
          <div className="text">
            <p className="name_user">{user?.name}</p>
            <p className="email_user">{user?.email}</p>
          </div>
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Name</label>
          <Input
            className="input_user"
            name="name"
            size="large"
            placeholder="name"
            prefix={<UserOutlined />}
            defaultValue={user?.name}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <label htmlFor="email">Email Address</label>
          <Input
            name="email"
            className="input_user"
            size="large"
            placeholder="email"
            prefix={<MdMailOutline />}
            defaultValue={user?.email}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <label htmlFor="email">Phone Number</label>
          <Input
            name="phone"
            className="input_user"
            size="large"
            placeholder="phone"
            prefix={<FaPhoneAlt />}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <label htmlFor="email">Location</label>
          <Input
            name="location"
            className="input_user"
            size="large"
            placeholder="Location"
            prefix={<MdLocationPin />}
            defaultValue={user?.location}
            onChange={formik.handleChange}
            value={formik.values.location}
          />
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            style={{ background: "#DB7092", color: "#ffff" }}
          >
            Submit
          </Button>
        </form>
      </div>

      <div className="profile_right section">
        {orders.length === 0 && <h3>There is no orders</h3>}
        {!orders === 0 && <h3>There is no orders</h3>}

        {orders?.map((el, index) => (
          <div className="cards_c" key={index}>
            <div className="card_c">
              <div className="item">
                <div className="title_c">
                  <p>
                    <span className="key_order">Name : </span>
                    {el?.user?.firstname} {el?.user?.lastname}
                  </p>
                  <p>
                    <span className="key_order"> Email : </span>
                    {el?.user?.email}
                  </p>
                  <p>
                    <span className="key_order">Products : </span>
                    {el?.products?.map((item, index) => (
                      <Tag>{item?.product_name}</Tag>
                    ))}
                  </p>
                  <p>
                    <span className="key_order">Price : </span>
                    {el?.total_with_tax?.formatted_with_code}
                  </p>
                </div>
                {/* <p className="type_c">visa</p> */}
              </div>
              <div className="item">
                {/* <p className="num_c">delete</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
