import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { API } from "../global";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${API}/users/register`, values);
      message.success("Registeration Successfull");
      setLoading(false);
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
              src="https://assetscan.in/wp-content/uploads/2020/09/shutterstock_1404259949-scaled.jpg"
              alt="Login"
              className="img-width"
            />
          </div>
          <div className="col login_container my-5 mx-3">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1 className="fw-bold text-center text-warning">Register</h1>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>
              <div className="register_btn text-center mt-3">
                <button type="submit" className="btn btn-warning col-12">
                  Register
                </button>
                <div className="link my-4">
                  <Link to="/login">
                    Already Registered ? <b>Click Here to Login</b>
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

export default Register;
