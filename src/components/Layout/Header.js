import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Button } from "@mui/material";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <div className="container-fluid shadow bg-primary rounded">
        <div className="header d-flex justify-content-between align-items-center py-2">
          <div className="Logo ">
            <h3 className="fw-bold text-white">Money Manager</h3>
          </div>
          <div className="User d-flex justify-content-between align-items-center">
            <div className="user_name">
              <h5 className="fw-bold text-light mx-2 mt-2">
                Hello, {loginUser && loginUser.name} 😎
              </h5>
            </div>
            <div className="logout_btn">
              <Button
                variant="contained"
                color="warning"
                className="mx-2"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
