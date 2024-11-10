import React from "react";
import "../css/LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="LandingMainBackground">
      <div className="LandingMainContent">
        <header>
          <h1 className="LandingHeaderText">CultureLink</h1>
        </header>
        <section className="LandingCallToAction">
          <button>
            <Link to="/signup-login">SignUp/Login</Link>
          </button>
          <button>
            <Link to="/dashboard">Dashboard</Link>
          </button>
          <button>
            <Link to="/explore">Explore</Link>
          </button>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
