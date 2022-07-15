import { HebrewCalendar, Location } from "@hebcal/core";
const GetHolidays = () => {
  const options = {
    year: new Date().getFullYear(),
    isHebrewYear: false,
    candlelighting: false,
    location: Location.lookup("Israel"),
    sedrot: false,
    omer: false,
    locale: "he-x-NoNikud",
    noMinorFast: true,
    noSpecialShabbat: true,
    noRoshChodesh: true,
  };
  const events = HebrewCalendar.calendar(options);
  const holidayList = [];
  for (const ev of events) {
    const hd = ev.getDate();
    const date = hd.greg();
    holidayList.push({
      title: ev.render(),
      start: new Date(date.toLocaleDateString().toString()),
      end: new Date(date.toLocaleDateString().toString()),
    });
  }
  return holidayList;
};

export default GetHolidays;
