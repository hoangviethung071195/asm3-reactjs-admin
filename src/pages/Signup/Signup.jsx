import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../service/products.service";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  // useContext để lưu trạng thái đăng nhập
  const fullNameInputEl = useRef();
  const phoneInputEl = useRef();
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    if (!emailInputEl.current.value) {
      toast.warning("Vui lòng nhập email!");
      return;
    }
    if (!fullNameInputEl.current.value) {
      toast.warning("Vui lòng nhập tên!");
      return;
    }
    if (!phoneInputEl.current.value) {
      toast.warning("Vui lòng nhập số điện thoại!");
      return;
    }
    if (!passwordInputEl.current.value) {
      toast.warning("Vui lòng nhập mật khẩu!");
      return;
    }
    if (passwordInputEl.current.value.length < 8) {
      toast.warning("Mật khẩu chứa ít nhất 8 ký tự!");
      return;
    }
    const { value: email } = emailInputEl.current;
    const { value: fullName } = fullNameInputEl.current;
    const { value: phone } = phoneInputEl.current;
    const { value: password } = passwordInputEl.current;
    // Nếu thông tin hợp lệ thì đăng kí
    console.log("handleSubmit");
    signup({ email, fullName, phone, password }).then((r) => {
      if (r) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="page-breadcrumb">
      <div className="row">
        <div className="login">
          <div className="heading">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  ref={emailInputEl}
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  ref={fullNameInputEl}
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                />
              </div>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  ref={phoneInputEl}
                  type="number"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  ref={passwordInputEl}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="float">
                Sign up
              </button>
              Sign in? <Link to="/login">click</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
