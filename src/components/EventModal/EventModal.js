import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./EventModal.css";
import { eventDB } from "../firebase";
import { set, ref, update, push, child } from "firebase/database";
import { uid } from "uid";
import { getDatabase } from "firebase/database";
export const EventModal = (passedDate) => {
  const [newEvent, setNewEvent] = React.useState({
    uuid: uid(),
    userName: "Temp@mail.com",
    title: "",
    start: new Date(passedDate.props.start).toDateString(),
    end: new Date(passedDate.props.end).toDateString(),
  });
  const writeToDatabase = () => {
    try {
      React.useEffect(() => {
        set(ref(eventDB, "userEvents"), { newEvent });
      }, [newEvent]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h5" component="h2">
        אירוע חדש
      </Typography>
      <form>
        <input
          type="text"
          placeholder="שם האירוע"
          onChange={(event) =>
            setNewEvent((prevState) => ({
              ...prevState,
              title: event.target.value,
            }))
          }
        />
        <input type="submit" value="Add Event" onClick={writeToDatabase()} />
      </form>
    </Box>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
