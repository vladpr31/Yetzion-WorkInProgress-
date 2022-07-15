import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import GetHolidays from "./Holidays";
import { messages } from "../utils";
import Modal from "@mui/material/Modal";
import { EventModal } from "../EventModal/EventModal";
import { eventDB } from "../firebase";
import "../EventModal/EventModal.css";
import { onValue, set, ref } from "firebase/database";
import { getDatabase } from "firebase/database";
export default function Calendare() {
  const [isLoaded, setLoaded] = React.useState(false); //Wait for Page to Load.
  const [eventList, setNewEvent] = React.useState([]); //hook for updating events added to Calendar.
  const localizer = momentLocalizer(moment); //Default Localizer.
  const [open, setOpen] = React.useState(false);
  const [clickedDate, setClickedDate] = React.useState();
  const handleClose = (event) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" && event.code === "Escape")
    ) {
      setOpen(false);
    }
  };
  if (!isLoaded) {
    setNewEvent(GetHolidays()); //Gets the holidays from Holidays.js
    setLoaded(true);
  }
  //Hanlder for adding new Event to the Calendar.
  useEffect(() => {
    onValue(ref(eventDB, "userEvents/"), (snapShot) => {
      const data = snapShot.val();
      if (data) {
        Object.values(data).map((events) => {
          setNewEvent([...eventList, events]);
        });
      }
    });
  }, []);
  const newEvent = ({ start, end }) => {
    setClickedDate({ start, end });
    setOpen(true);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        defaultDate={new Date()}
        messages={messages}
        style={{ height: 700 }}
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            backgroundColor: "#BDF2D5",
            color: "black",
            borderRadius: "25px",
            border: "#76BA99",
            borderStyle: "solid",
          };
          if (event.isMine) {
            newStyle.backgroundColor = "lightblue";
          }
          if (isSelected) {
            newStyle.backgroundColor = "#76BA99";
          }
          return {
            className: "",
            style: newStyle,
          };
        }}
        onSelectSlot={newEvent}
        selectable={true}
      />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <EventModal props={clickedDate} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
