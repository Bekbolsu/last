import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
export const authContext = React.createContext();
export const useAuthContext = () => useContext(authContext);

const API = "http://3.82.224.241/api/v1/";
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const signUp = async (email, password, navigate) => {
    console.log(email, password);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password);
    try {
      const res = await axios.post(`${API}accounts/register/`, formData);
      console.log(res);
      navigate("/signupsuccess");
      localStorage.setItem("activation_email", email);
      // setUser(email);
    } catch (e) {
      console.log(e);
      setError("Error!");
    }
  };

  async function signIn(user, navigate) {
    let formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    try {
      let res = await axios.post(`${API}accounts/login/`, formData);
      console.log(res);
      localStorage.setItem("token", JSON.stringify(res.data));
      localStorage.setItem("email", user.email);
      setUser(user.email);
      navigate("/");
    } catch (e) {
      setError("Error!");
    }
  }

  function getUser() {
    setUser(localStorage.getItem("email"));
  }

  async function checkAuth() {
    setLoad(true);
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      const Authorization = `Bearer ${token.access}`;
      let res = await axios.post(
        `${API}accounts/token/refresh/`,
        {
          refresh: token.refresh,
        },
        { headers: { Authorization } }
      );
      console.log("reees", res);
      localStorage.setItem("token", JSON.stringify(res.data));
      let username = localStorage.getItem("email");
      setUser(username);
    } catch (e) {
      //logout();
    } finally {
      setLoad(false);
    }
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setUser("");
  }

  async function activate(code, navigate) {
    let formData = new FormData();
    formData.append("email", localStorage.getItem("activation_email"));
    formData.append("activation_code", code);
    let res = await axios.post(`${API}accounts/activate/`, formData);
    navigate("/deep");
    console.log(res);
  }
  useEffect(() => {
    checkAuth();
  }, []);

  async function resetPassword(email) {
    let res = await axios.post(`${API}accounts/password_reset/`, { email });
    console.log("from reset", res);
  }
  async function confirmResetPassword(password, token, navigate) {
    console.log(token);
    let res = await axios.post(`${API}accounts/password_reset/confirm/`, {
      password,
      token,
    });
    navigate("/deep");
    console.log("from confirm reset", res);
  }
  return (
    <authContext.Provider
      value={{
        signUp,
        signIn,
        checkAuth,
        user,
        error,
        logout,
        load,
        activate,
        resetPassword,
        getUser,
        confirmResetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
