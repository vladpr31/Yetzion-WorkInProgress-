import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Reactlogo from "../../Assets/Svg-Background.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import "./Register.css";
import { motion } from "framer-motion";
const TRANSITION_TIME_OPACITY_S = 1;
const TRANSITION_TIME_ROTATE_S = 2;
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [PasswordError, setPasswordError] = useState(false);
  const [validEmailError, setValidEmailError] = useState(false);
  const navigate = useNavigate();
  const forgotUserHandler = () => {
    navigate("/reset");
  };
  const registration = () => {
    if (!PasswordError || !validEmailError) {
      registerWithEmailAndPassword(name, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/mainscreen");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMsg = error.message;
          console.log(errorCode);
        });
    }
  };
  const ValidateEmail = (mail) => {
    if (mail.target.value.length !== 0) {
      if (!/\S+@\S+\.\S+/.test(mail.target.value)) {
        setValidEmailError(true);
      } else {
        setValidEmailError(false);
      }
    }
  };
  const validatePassword = () => {
    if (password !== confirmedPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/mainscreen");
  }, [user, loading]);
  return (
    <div className="pageContainer">
      <div className="formContainer">
        <div className="form">
          <label>Email</label>
          <input
            type="email"
            name="mail"
            placeholder="Example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={ValidateEmail}
          ></input>
          <span className="err">
            {validEmailError ? "Not a Valid Email Address" : ""}
          </span>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <label>Your Password:</label>
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confimredUserPassword"
            placeholder="Confirm Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            onBlur={validatePassword}
          ></input>
          {
            <span className="err">
              {PasswordError ? "Password Not Matching!" : ""}
            </span>
          }
          <button className="register__btn" onClick={registration}>
            Register
          </button>
          <span>Or</span>
          <button className="register__btn" onClick={signInWithGoogle}>
            Register with Google
          </button>
          <button className="register__btn" onClick={forgotUserHandler}>
            Forgot Email/Password
          </button>
        </div>
        <div className="hasAccount">
          Already have an account? <br></br>
          <Link className="loginButton" to="/">
            Login
          </Link>
          now.
        </div>

        <div className="hangingImageAnimation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: [-5, 0, 2] }}
            className="us"
            transition={{
              duration: TRANSITION_TIME_OPACITY_S,
              rotate: { yoyo: Infinity, duration: TRANSITION_TIME_ROTATE_S },
            }}
          >
            <img className="image" src={Reactlogo} alt="first" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Register;

/**
 * Need to Do here:
 * 1. Email already exists.
 * 2.Redirect pages on register\login.
 * 3.Keep Session for logged in users.
 */
