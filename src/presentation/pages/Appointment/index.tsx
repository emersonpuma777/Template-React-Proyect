/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useRequest } from "ahooks";
import { Plus, Trash } from "lucide-react";
import { Button } from "@components/ui/button";
import { useRef, useState } from "react";
import { Modal } from "@components/misc/Modal";
import AppointmentController from "@infrastructure/controllers/AppointmentController";

const Appointment = () => {
  const gridRef = useRef<any>(null);
  const [appointmentSelected, setAppointmentSelected] =
    useState<GridRowSelectionModel>([]);
  const [showModal, setShowModal] = useState(false);

  const { data: appointment, loading } = useRequest(
    () => AppointmentController.search(),
    {}
  );
  const columns: GridColDef<any>[] = [
    {
      field: "name",
      headerName: "First name",
      width: 150,
      cellClassName: "!text-center",
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 150,
      cellClassName: "!text-center",
    },
    {
      field: "phone",
      headerName: "Phone",
      valueFormatter: (value) => `+51 ${value}`,
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "specialty_name",
      headerName: "Specialty",
      width: 250,
    },
    {
      field: "hourly_rate",
      headerName: "Price per hour",
      valueFormatter: (value) => `S/. ${value}`,
      width: 250,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 h-full w-full">
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex gap-2">
          <Button
            className="w-10 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Plus />
          </Button>
          <Button
            className="w-10 cursor-pointer"
            variant="destructive"
            disabled={appointmentSelected.length === 0}
          >
            <Trash />
          </Button>
        </div>
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
            onRowSelectionModelChange={(row) => {
              setAppointmentSelected(row);
            }}
          />
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={(e) => {
            setShowModal(e);
          }}
        />
      )}
    </div>
  );
};

export default Appointment;
