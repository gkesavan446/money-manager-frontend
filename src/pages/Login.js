import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { API } from "../global";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/users/login`, values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="container">
        {loading && <Spinner />}
        <div className="row my-5 shadow">
          <div className="col img-div">
            <img
              src="https://img.freepik.com/free-vector/cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37328.jpg?auto=format&h=200"
              alt="Login"
              className="img-width"
            />
          </div>
          <div className="col login_container my-5 mx-3">
            <Form layout="vertical" onFinish={submitHandler}>
              <h3 className="text-primary text-center p-2 fw-bold">Welcome to Money Manager App</h3>

              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>
              <div className="Login_btn text-center mt-3">
                <button type="submit" className="btn btn-primary col-12">
                  Login
                </button>
                <div className="link my-4">
                  <Link to="/register">
                    Don't have an account? <b>Click Here</b>
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
