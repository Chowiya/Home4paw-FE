import React from "react";
import footPrint from "./images/footPrint.png";
import { Link } from "react-router-dom";

const HomeLandingContainer = (props) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="home-container">
      <div className="homeContainer-left">
        <h2>Discover your perfect furry companion and give them a loving forever home. Our mission is to connect adopters with pets in need, while making the adoption process simple, transparent, and joyful.</h2>
      
        <div className="adopt-btn">
          <Link to='./pets'>
            <button className="Home-button" onClick={scrollToTop}>
              <p>Adopt a Pet</p><img src={footPrint} alt="footprint" />
            </button>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default HomeLandingContainer;

