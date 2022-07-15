import React from "react";
import "../NavBar/Navigation.css";
import avatar from "../NavBar/avatar.png";

const Navigation = () => {
  return (
    <div>
      <div className="userInfo">
        <img className="userAvatar" src={avatar} alt="avatar"></img>
        <h3>John Doe</h3>
      </div>
      <div className="userNavigations">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Calendar</a>
          </li>
          <li>
            <a href="">Meetings</a>
          </li>
          <li>
            <a href="">Settings</a>
          </li>
          <li>
            <a href="">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
