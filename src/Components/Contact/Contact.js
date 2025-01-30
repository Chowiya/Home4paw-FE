import React from "react";
import developerPng from "./images/profile2.jpg";

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h3>Let's get in touch</h3>
        <i className="fa fa-envelope"></i>
        <a className="mail-links" href="chowiya6@gmail.com">
          chowiya6@gmail.com
        </a>

        <i className="fa fa-linkedin"></i>
        <a className="mail-links">
          User Name: Chowiya
        </a>

        <i className="fa fa-github"></i>
        <a className="mail-links">
          chowiya
        </a>

        

        <i className="fa fa-phone"></i>
        <a className="mail-links">
          +123456789
        </a>
      </div>
      <div className="contactUs-pic">
        <img src={developerPng} alt="Profile"/>
      </div>
    </div>
  );
};

export default Contact;
