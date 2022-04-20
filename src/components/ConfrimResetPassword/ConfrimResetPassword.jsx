import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { authContext } from "../../context/authContext";

const ConfrimResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { confirmResetPassword } = useContext(authContext);
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <div>
          <input
            className="reset"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
          <button
            className="reset_btn"
            onClick={() =>
              confirmResetPassword(password, params.token, navigate)
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfrimResetPassword;
