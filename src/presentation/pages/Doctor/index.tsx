/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequest } from "ahooks";
import { Plus } from "lucide-react";
import { Button } from "@components/ui/button";
import { useRef, useState } from "react";
import DoctorController from "@infrastructure/controllers/DoctorController";
import ModalAddEdit from "./components/ModalAddEdit";
import { DoctorParser } from "@infrastructure/models/doctor";

const Doctor = () => {
  const gridRef = useRef<any>(null);
  const doctorCurrent = useRef<DoctorParser | null>(null);

  const [showModal, setShowModal] = useState(false);

  const {
    data: doctor,
    loading,
    refresh,
  } = useRequest(() => DoctorController.search(), {});

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
        </div>
        <div className="flex flex-col h-full w-full">
          <DataGrid
            ref={gridRef}
            loading={loading}
            rows={doctor?.data || []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooterPagination
            className="overflow-auto"
            filterMode="client"
            onRowClick={(e) => {
              doctorCurrent.current = e.row as DoctorParser;
              setShowModal(true);
            }}
          />
        </div>
      </div>
      {showModal && (
        <ModalAddEdit
          onClose={(e) => {
            setShowModal(e);
            doctorCurrent.current = null;
          }}
          onRefresh={() => {
            refresh();
          }}
          doctorCurrent={doctorCurrent.current}
        />
      )}
    </div>
  );
};

export default Doctor;
