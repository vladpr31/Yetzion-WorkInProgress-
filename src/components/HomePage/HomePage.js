import React from "react";
import "./HomePage.css";
import bg from "../HomePage/background.jpg";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { signInWithGoogle } from "../firebase";
const MainScreen = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in with</h1>
          <div className="social-container">
            <a href="#" className="social" onClick={signInWithGoogle}>
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello There!</h1>
            <p>
              This is a Web Application for Hangouts managment with your
              friends!<br></br>Start
              <span className="typeAnimation">
                <Typewriter
                  words={[" Hanging", " Aranging", " Scheduling"]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              With Your Friends!
            </p>
            <button className="ghost" id="signUp" onClick={handleSignUp}>
              Sign Up
            </button>
            <img className="bgImage" src={bg} alt="bgImage"></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainScreen;
