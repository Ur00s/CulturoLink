import React from "react";
import { Link } from "react-router-dom";
import "../css/SignUpLoginPage.css";

function SignUpLoginPage() {
  return (
    <div className="SignUpLoginContent">
      <h1>CultureLink</h1>
      <p>
        Join us in empowering global understanding. Let’s make culture a shared
        journey, not an isolated experience.
      </p>
      <div className="ContentCardContainer">
        <div className="ContentCard">
          <h2>Rejoin the Adventure</h2>
          <p>Unlock your next step in global connection.</p>
          <button>
            <Link to="/log-in">Log In</Link>
          </button>
        </div>
        <div className="ContentCard">
          <h2>Join the Global Tribe</h2>
          <p>Embark on a journey to discover and celebrate cultures.</p>
          <button>
            <Link to="/sign-in">Create Account</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpLoginPage;
