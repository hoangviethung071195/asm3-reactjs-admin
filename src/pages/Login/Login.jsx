import React, { useState, useEffect, useContext, useRef } from "react";
import { toast } from "react-toastify";

import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useContext để lưu trạng thái đăng nhập
  const ctx = useContext(AuthContext);
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  useEffect(() => {
    if (ctx.isAuthenticated) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailInputEl.current.value) {
      console.log("handleSubmit");
      toast.warning("Vui lòng nhập email!");
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
    const { value: password } = passwordInputEl.current;
    // Nếu thông tin hợp lệ thì đăng nhập
    ctx.onLogin({
      email,
      password,
    });
  };

  return (
    // <div className='page-wrapper'>
    <div className="">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="float">
                  Login
                </button>
                Create an account? <Link to="/signup"> Sign up</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
