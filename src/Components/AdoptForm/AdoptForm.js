import React, { useState } from "react";
import { useAuthContext } from "../../hooks/UseAuthContext";

function AdoptForm(props) {
  const { user } = useAuthContext();
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

    setEmailError(false);
    setFormError(false);

    if (
      !email ||
      !phoneNo ||
      !livingSituation ||
      !previousExperience ||
      !familyComposition
    ) {
      setFormError(true);
      console.log("Form validation failed");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("sending request");

      const response = await fetch(`${process.env.REACT_APP_URL}/form/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          email,
          phoneNo,
          livingSituation,
          previousExperience,
          familyComposition,
          petId: props.pet._id,
        }),
      });

      if (!response.ok) {
        console.log("response not ok", response.status);
        setErrPopup(true);
        return;
      } else {
        setSuccPopup(true);

        setEmailError(false);
        setFormError(false);
        setEmail("");
        setPhoneNo("");
        setLivingSituation("");
        setPreviousExperience("");
        setFamilyComposition("");
      }
    } catch (err) {
      setErrPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-adopt-form-container">
      <h2 className="custom-form-heading">Pet Adoption Application</h2>
      <div className="form-pet-container">
        <div className="pet-details">
          <div className="pet-pic">
            <img
              src={`${process.env.REACT_APP_URL}/images/${props.pet.filename}`}
              alt={props.pet.name}
            />
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
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="custom-input-box">
              <div className="email-not-valid">
                <label htmlFor="email" className="custom-label">
                  Email:
                </label>
                {emailError && <p>Please provide a valid email address.</p>}
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label htmlFor="phoneNo" className="custom-label">
                Phone No.
              </label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label htmlFor="livingSituation" className="custom-label">
                Pet Living Situation:
              </label>
              <input
                type="text"
                id="livingSituation"
                name="livingSituation"
                value={livingSituation}
                onChange={(e) => setLivingSituation(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label htmlFor="previousExperience" className="custom-label">
                Previous Pet Experience:
              </label>
              <input
                type="text"
                id="previousExperience"
                name="previousExperience"
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label htmlFor="familyComposition" className="custom-label">
                Any Other Pets:
              </label>
              <input
                type="text"
                id="familyComposition"
                name="familyComposition"
                value={familyComposition}
                onChange={(e) => setFamilyComposition(e.target.value)}
                className="custom-input"
              />
            </div>
            {formError && (
              <p className="error-message">Please fill out all fields.</p>
            )}
            <button
              disabled={isSubmitting}
              type="submit"
              className="custom-cta-button custom-m-b"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
            {ErrPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>Oops!... Connection Error.</h4>
                </div>
                <button
                  onClick={() => setErrPopup(!ErrPopup)}
                  className="close-btn"
                >
                  Close <i className="fa fa-times"></i>
                </button>
              </div>
            )}
            {SuccPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>
                    Adoption Form of {props.pet.name} is Submitted; we'll get in
                    touch with you soon for further process.
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setSuccPopup(!SuccPopup);
                    props.closeForm();
                  }}
                  className="close-btn"
                >
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

