import React from "react";
import "./success.css";
const SuccessSignup = () => {
  return (
    <div className="container">
      <div className="success">
        <h1 style={{ textAlign: "center" }}>
          Регистрация прошла успешно! Теперь необходимо подтвердить введенный
          адрес электронной почты. Для этого, перейдите по ссылке в письме,
          которую получили на почту
        </h1>
      </div>
    </div>
  );
};

export default SuccessSignup;
