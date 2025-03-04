/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import PatientController from "@infrastructure/controllers/PatientController";
import { useRequest } from "ahooks";
import { format } from "date-fns";
import { Plus, Trash } from "lucide-react";
import { Button } from "@components/ui/button";
import { useRef, useState } from "react";
import { Modal } from "@components/misc/Modal";
import { PatientParser } from "@infrastructure/models/patient";
import ModalAddEdit from "./components/ModalAddEdit";

const Patient = () => {
  const gridRef = useRef<any>(null);
  const patientCurrent = useRef<PatientParser | null>(null);

  const [patientSelected, setPatientSelected] = useState<GridRowSelectionModel>(
    []
  );
  const [showModal, setShowModal] = useState(false);

  const {
    data: patient,
    loading,
    refresh,
  } = useRequest(() => PatientController.search(), {});

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
      field: "dob",
      headerName: "Birth date",
      valueFormatter: (value) => format(new Date(value), "dd-MM-yyyy"),
      cellClassName: "!text-center",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 160,
      valueFormatter: (value) => (value === "M" ? "Male" : "Female"),
      cellClassName: "!text-center",
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
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
            disabled={patientSelected.length === 0}
          >
            <Trash />
          </Button>
        </div>
        <div className="flex flex-col h-full w-full">
          <DataGrid
            ref={gridRef}
            loading={loading}
            rows={patient?.data || []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooterPagination
            className="overflow-auto"
            filterMode="client"
            onRowSelectionModelChange={(row) => {
              setPatientSelected(row);
            }}
            onRowClick={(e) => {
              patientCurrent.current = e.row as PatientParser;
              setShowModal(true);
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

export default Patient;
