import React from "react";
import { Link } from "react-router-dom";

function SignUpLoginPage() {
  return (
    <div>
      <h2>Sign Up / Log In</h2>
      <div>
        <h3>Sign Up</h3>
        <Link to="/dashboard">Create Account</Link>
      </div>
      <div>
        <h3>Log In</h3>
        <Link to="/dashboard">Log In</Link>
      </div>
    </div>
  );
}

export default SignUpLoginPage;
