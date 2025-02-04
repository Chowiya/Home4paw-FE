import React, { useState } from 'react';
import AdoptForm from '../AdoptForm/AdoptForm';
import { formatDistanceToNow } from 'date-fns';

const PetsViewer = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };


  console.log("API Base URL:", process.env.REACT_APP_URL);
  console.log("Full Image URL:", `${process.env.REACT_APP_URL}/images/${props.pet.filename}`);
  console.log("Pet Data:", props.pet);

  return (
    <div className='pet-view-card'>
      <div className='pet-card-pic'>

        <img src={`https://home4paw-be-1.onrender.com/images/${props.pet.filename  || 'default-image.jpg'}`} alt={props.pet.name}/>
       
      </div>
      <div className='pet-card-details'>
        <h2>{props.pet.name}</h2>
        <p><b>Type:</b> {props.pet.type}</p>
        <p><b>Age:</b> {props.pet.age}</p>
        <p><b>Size:</b> {props.pet.size}</p>
        <p><b>Location:</b> {props.pet.area}</p>
        <p><b>Medical History:</b> {props.pet.medicalHistory}</p>
        <p><b>Breed:</b>{props.pet.breed}</p>
        <p>{formatTimeAgo(props.pet.updatedAt)}</p>
      </div>
      <div className='show-interest-btn'>
        <button onClick={togglePopup}>Show Interest <i className="fa fa-paw"></i></button>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <AdoptForm closeForm={togglePopup} pet={props.pet}/>
          </div>
          <button onClick={togglePopup} className='close-btn'>
            Close <i className="fa fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PetsViewer;

