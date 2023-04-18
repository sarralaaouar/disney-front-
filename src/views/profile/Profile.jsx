import React from "react";
import { Avatar, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMailOutline, MdLocationPin } from "react-icons/md";
import "./Profile.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Space, Tag } from "antd";

const Profile = () => {
  let userString = localStorage.getItem("disney_user");
  let user = JSON.parse(userString);
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await axios.get(
        "https://disney-backend.vercel.app/api/v1/orders"
      );
      const data = await orders;
      setOrders(data?.data?.data?.data);
    };
    getOrders();
  }, []);

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
        <label htmlFor="email">Name</label>
        <Input
          className="input_user"
          size="large"
          placeholder="name"
          prefix={<UserOutlined />}
          defaultValue={user?.name}
        />
        <label htmlFor="email">Email Address</label>
        <Input
          className="input_user"
          size="large"
          placeholder="email"
          prefix={<MdMailOutline />}
          defaultValue={user?.email}
        />
        <label htmlFor="email">Phone Number</label>
        <Input
          className="input_user"
          size="large"
          placeholder="phone"
          prefix={<FaPhoneAlt />}
          defaultValue={user?.phone}
        />
        <label htmlFor="email">Location</label>
        <Input
          className="input_user"
          size="large"
          placeholder="Location"
          prefix={<MdLocationPin />}
          defaultValue={user?.location}
        />
        <Button style={{ background: "#DB7092", color: "#ffff" }}>
          Submit
        </Button>
      </div>

      <div className="profile_right section">
        {!orders && <h3>There is no orders</h3>}
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
