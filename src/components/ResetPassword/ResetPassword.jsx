import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";
import "./ResetPassword.css";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useContext(authContext);
  return (
    <div className="main_reset">
      <div>
        <input
          placeholder="Write your email"
          className="reset"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <Link to="/successreset">
          <button className="reset_btn" onClick={() => resetPassword(email)}>
            Reset
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
