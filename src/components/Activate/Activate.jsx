import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Deepstash from "../Deepstash/Deepstash";

const Activate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { activate } = useContext(authContext);
  useEffect(() => {
    activate(params.code, navigate);
  }, []);
  return (
    <div>
      <Deepstash />
    </div>
  );
};

export default Activate;
