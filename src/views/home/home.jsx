import React from "react";
import img from "../../assests/Shop.png";
import icon1 from "../../assests/1.svg";
import icon2 from "../../assests/2.svg";
import icon3 from "../../assests/3.svg";

import "./home.css";
function Home() {
  let cards = [
    {
      icon: icon1,
      title: "Fast & Free Shipping",
      subtitle: "Lorem Ipsum is simply dummy text",
    },
    {
      icon: icon2,
      title: "Money Guarantee",
      subtitle: "Lorem Ipsum is simply dummy text",
    },
    {
      icon: icon3,
      title: "Online Support",
      subtitle: "Lorem Ipsum is simply dummy text",
    },
  ];

  return (
    <div className="home">
      <div className="s_img">
        <img src={img} alt="" />
        <div className="disney_text text-animation">
          <h1>Welcome To Disney Store</h1>
        </div>
      </div>
      <div className="cards">
        {cards.map((el, index) => (
          <div className="card_i" key={index}>
            <span className="img">
              <img src={el.icon} alt="" />
            </span>
            <div className="text_i">
              <p className="title_i">{el.title}</p>
              <p className="subtitle_i">{el.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
