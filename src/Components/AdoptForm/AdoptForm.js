import React, { useState } from "react";
import { useAuthContext } from "../../hooks/UseAuthContext";

function AdoptForm(props) {
  console.log("Adoption component rendered,isSubmitting:",isSubmitting);
  console.log("props received in adoptForm:",props)
  const {user} = useAuthContext();
  const [email, setEmail] = useState(user.email);
  const [phoneNo, setPhoneNo] = useState("");
  const [livingSituation, setLivingSituation] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [familyComposition, setFamilyComposition] = useState("");
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ErrPopup, setErrPopup] = useState(false);
  const [SuccPopup, setSuccPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission prevented")
    setEmailError(false);
    setFormError(false)

    if (
      !email ||
      !phoneNo ||
      !livingSituation ||
      !previousExperience ||
      !familyComposition
    ) {
      setFormError(true);
      console.log("Form validation failed")
      return;
    }

    try {

      setIsSubmitting(true)
      console.log("sending request")

      const response = await fetch(`${process.env.REACT_APP_URL}/form/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          
          email,
          phoneNo,
          livingSituation,
          previousExperience,
          familyComposition,
          petId: props.pet._id
        })
      })

      if (!response.ok) {
        console.log("response not ok",response.status)
        setErrPopup(true)
        return;
      } else {
        console.log("Form submitted successfully")
        setSuccPopup(true);


        setEmailError(false);
      setFormError(false);
      setEmail("");
      setPhoneNo("");
      setLivingSituation("");
      setPreviousExperience("");
      setFamilyComposition("");
      }
    }
    catch (err) {
      setErrPopup(true)
      console.error("Fetching error:",err);

    } finally{
      setIsSubmitting(false)

    } 
  };

  return (
    <div className="custom-adopt-form-container">
      <h2 className="custom-form-heading">Pet Adoption Application</h2>
      <div className="form-pet-container">
        <div className="pet-details">
          <div className="pet-pic">
            <img src={`${process.env.REACT_APP_URL}/images/${props.pet.filename}`} alt={props.pet.name} />
          </div>
          <div className="pet-info">
            <h2>{props.pet.name}</h2>
            <p>
              <b>Type:</b> {props.pet.type}
            </p>
            <p>
              <b>Age:</b> {props.pet.age}
            </p>
            <p>
              <b>Location:</b> {props.pet.location}
            </p>
          </div>
        </div>
        <div className="form-div">
          <form onSubmit={handleSubmit} action='#' className="custom-form">
            
            <div className="custom-input-box">
              <div className="email-not-valid">
                <label className="custom-label">Email:</label>
                {emailError && (
                  <p>
                    Please provide valid email address.
                  </p>
                )}
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Phone No.</label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Pet Living Situation:</label>
              <input
                type="text"
                value={livingSituation}
                onChange={(e) => setLivingSituation(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Previous Pet Experience:</label>
              <input
                type="text"
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Any Other Pets:</label>
              <input
                type="text"
                value={familyComposition}
                onChange={(e) => setFamilyComposition(e.target.value)}
                className="custom-input"
              />
            </div>
            {formError && (
              <p className="error-message">Please fill out all fields.</p>
            )}
            <button disabled={isSubmitting} type="submit" className="custom-cta-button custom-m-b">
              {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
            {ErrPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>
                    Oops!... Connection Error.
                  </h4>
                </div>
                <button onClick={(e) => (setErrPopup(!ErrPopup))} className="close-btn">
                  Close <i className="fa fa-times"></i>
                </button>
              </div>
            )}
            {SuccPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>
                    Adoption Form of {props.pet.name} is Submitted; we'll get in touch with you soon for further process.
                  </h4>
                </div>
                <button onClick={(e) => {
                  setSuccPopup(!SuccPopup);
                  props.closeForm();
                }} className="close-btn">
                  Close <i className="fa fa-times"></i>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm;
