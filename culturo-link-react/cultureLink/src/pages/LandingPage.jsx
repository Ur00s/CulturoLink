import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <header>
        <h1>CultureLink</h1>
      </header>
      <section>
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
  );
}

export default LandingPage;
