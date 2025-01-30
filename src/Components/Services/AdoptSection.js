import React from "react";
import adoptPet from "./images/adoptPet.png";
import { Link } from "react-router-dom";

const AdoptSection = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="adopt-section">
      <h2>Adopt a Pet</h2>
      <img src={adoptPet} alt="Happy Pet" />

      <p>
        Welcome to our pet adoption program! Adopting a pet is a wonderful way
        to bring joy and companionship into your life.
      </p>

      
      <Link to="/pets">
        <button className="cta-button" onClick={scrollToTop}>Find Your Perfect Pet</button>
      </Link>
    </section>
  );
};

export default AdoptSection;
