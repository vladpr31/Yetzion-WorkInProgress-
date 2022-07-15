import React from "react";
import "./MainScreen.css";
import Navigation from "../NavBar/Navigation";
import Calendare from "../Calendar/Calendar";
const MainScreen = () => {
  return (
    <div className="container row">
      <div className="col-2 userPanel">
        <Navigation />
      </div>
      <div className="col calendarContainer">
        <Calendare />
      </div>
    </div>
  );
};
export default MainScreen;
