import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import Add from "./Add/Add";
import AdminPage from "./AdminPage/AdminPage";
import Collections from "./Collections/Collections";
import Deepstash from "./Deepstash/Deepstash";
import Edit from "./Edit/Edit";
import Fav from "./Fav/Fav";
import Following from "./Following/Following";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Kruto from "./Navbar2/Kruto";
import Phone from "./Phone/Phone";
import About from "./About/About";
import SuccessSignup from "./successSignup/successSignup";
import Activate from "./Activate/Activate";
import ResetPassword from "./ResetPassword/ResetPassword";
import ConfrimResetPassword from "./ConfrimResetPassword/ConfrimResetPassword";
import SuccessReset from "./SuccessReset/SuccessReset";
import Comments from "./Comments/Comments";

const Routing = () => {
  const { user } = useContext(authContext);
  //console.log(user);
  return (
    <>
      <BrowserRouter>
        {!user ? (
          <>
            <Routes>
              <Route path="/deep" element={<Deepstash />} />

              <Route path="/signupsuccess" element={<SuccessSignup />} />
              <Route
                path="/api/v1/accounts/activate/:code"
                element={<Activate />}
              />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/successreset" element={<SuccessReset />} />

              <Route
                path="/api/v1/accounts/password_reset/:token"
                element={<ConfrimResetPassword />}
              />
            </Routes>
          </>
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/add" element={<Add />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/phone" element={<Phone />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/following" element={<Following />} />
              <Route path="/about" element={<About />} />
              <Route path="/fav" element={<Fav />} />
              <Route path="/" element={<Kruto />} />
              {/* <Route path="/comments/:id" element={<Comments />} /> */}
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </>
  );
};

export default Routing;
