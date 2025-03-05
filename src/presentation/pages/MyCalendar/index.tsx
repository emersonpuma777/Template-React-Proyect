import { Button } from "@components/ui/button";
import AppointmentController from "@infrastructure/controllers/AppointmentController";
import { useRequest } from "ahooks";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css"; // Importar los estilos

const MyCalendar = () => {
  const calendarRef = useRef<Calendar | null>(null);
  const [date, setDate] = useState(new Date());
  useRequest(
    async () => {
      const res = await AppointmentController.search();
      return (res?.data ?? [])?.map((appointment) => {
        const appointmentDate = new Date(appointment!.appointment_date!);
        const formattedDate = appointmentDate.toISOString().split("T")[0];

        return {
          id: appointment!.id!,
          calendarId: "1",
          title: `Cita con ${appointment!.doctor_fullname!}`,
          category: "time",
          start: `${formattedDate}T${appointment!.start_time!}`,
          end: `${formattedDate}T${appointment!.end_time!}`,
        };
      });
    },
    {
      onSuccess: (data) => {
        calendarRef?.current?.createSchedules(data ?? []);
      },
    }
  );

  const goPrev = () => {
    setDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
    calendarRef.current?.prev();
  };

  const goNext = () => {
    setDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
    calendarRef.current?.next();
  };

  useEffect(() => {
    const calendar = new Calendar("#calendar", {
      defaultView: "month",
      isReadOnly: true,
      useCreationPopup: false,
      useDetailPopup: true,
    });

    calendarRef.current = calendar;
    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
      <div className="flex gap-4">
        <div className="font-bold text-[30px]">
          {format(date, "MMMM")} {format(date, "yyyy")}
        </div>
        <div className="grow" />
        <Button className="cursor-pointer" onClick={goPrev}>
          Anterior
        </Button>
        <Button className="cursor-pointer" onClick={goNext}>
          Siguiente
        </Button>
      </div>
      <div id="calendar" className="flex flex-col w-full h-full" />
    </div>
  );
};

export default MyCalendar;
