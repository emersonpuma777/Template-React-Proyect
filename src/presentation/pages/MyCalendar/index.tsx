import { useEffect, useRef } from "react";
import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css"; // Importar los estilos

const MyCalendar = () => {
  const calendarRef = useRef<Calendar | null>(null);

  useEffect(() => {
    const calendar = new Calendar("#calendar", {
      defaultView: "month",
      taskView: true,
      scheduleView: true,
      useDetailPopup: true,
      useCreationPopup: true,
    });

    calendarRef.current = calendar;

    calendar.createSchedules([]);

    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div id="calendar" className="flex flex-col w-full h-full" />
    </div>
  );
};

export default MyCalendar;
