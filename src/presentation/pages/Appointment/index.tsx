/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequest } from "ahooks";
import { Check, Plus, X } from "lucide-react";
import { Button } from "@components/ui/button";
import { useRef, useState } from "react";
import AppointmentController from "@infrastructure/controllers/AppointmentController";
import ModalAddEdit from "./components/ModalAddEdit";
import { format } from "date-fns";
import { AppointmentParser } from "@infrastructure/models/appointement";
import { useSelector } from "react-redux";
import { RootState } from "@application/store/store";

const Appointment = () => {
  const gridRef = useRef<any>(null);
  const patientCurrent = useRef<AppointmentParser | null>(null);

  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const {
    data: appointment,
    loading,
    refresh,
  } = useRequest(() => AppointmentController.search(), {});

  const columns: GridColDef<any>[] = [
    {
      field: "patient_fullname",
      headerName: "Patient",
      width: 250,
      cellClassName: "!text-center",
    },
    {
      field: "doctor_fullname",
      headerName: "Doctor",
      width: 250,
      cellClassName: "!text-center",
    },
    {
      field: "appointment_date",
      headerName: "Fecha",
      valueFormatter: (value) => format(new Date(value), "dd-MM-yyyy"),
      width: 150,
      cellClassName: "!text-center",
    },
    {
      field: "start_time",
      headerName: "Start time",
      width: 150,
      cellClassName: "!text-center",
    },
    {
      field: "end_time",
      headerName: "End time",
      width: 150,
      cellClassName: "!text-center",
    },
    {
      field: "appointment_price",
      headerName: "Appointment Price",
      width: 150,
      valueFormatter: (value) => `S/. ${value}`,
      cellClassName: "!text-center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      cellClassName: "!text-center",
    },
    {
      field: "is_paid",
      headerName: "Is paid",
      renderCell: (data) => {
        return (
          <div className="flex justify-center items-center w-full h-full">
            {data?.value ? <Check /> : <X />}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 h-full w-full">
      <div className="flex flex-col gap-4 w-full h-full">
        {user?.role !== "doctor" && (
          <div className="flex gap-2">
            <Button
              className="w-10 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <Plus />
            </Button>
          </div>
        )}
        <div className="flex flex-col h-full w-full">
          <DataGrid
            ref={gridRef}
            loading={loading}
            rows={appointment?.data || []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooterPagination
            className="overflow-auto"
            filterMode="client"
            onRowClick={(e) => {
              patientCurrent.current = e.row as AppointmentParser;
              if (user?.role !== "doctor") {
                setShowModal(true);
              }
            }}
          />
        </div>
      </div>
      {showModal && (
        <ModalAddEdit
          onClose={(e) => {
            setShowModal(e);
            patientCurrent.current = null;
          }}
          onRefresh={() => {
            refresh();
          }}
          current={patientCurrent.current}
        />
      )}
    </div>
  );
};

export default Appointment;
