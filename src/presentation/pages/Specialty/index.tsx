/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequest } from "ahooks";
import { Plus } from "lucide-react";
import { Button } from "@components/ui/button";
import { useRef, useState } from "react";
import ModalAddEdit from "./components/ModalAddEdit";
import { SpecialtyParser } from "@infrastructure/models/specialty";
import SpecialtyController from "@infrastructure/controllers/SpecialtyController";

const Specialty = () => {
  const gridRef = useRef<any>(null);
  const specialtyCurrent = useRef<SpecialtyParser | null>(null);

  const [showModal, setShowModal] = useState(false);

  const {
    data: appointment,
    loading,
    refresh,
  } = useRequest(() => SpecialtyController.search(), {});

  const columns: GridColDef<any>[] = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      cellClassName: "!text-center",
    },
    {
      field: "label",
      headerName: "Label",
      width: 250,
      cellClassName: "!text-center",
    },
    {
      field: "hourly_rate",
      headerName: "Hourly Rate",
      width: 150,
      valueFormatter: (value) => `S/. ${value}`,
      cellClassName: "!text-center",
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
            rows={appointment?.data || []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooterPagination
            className="overflow-auto"
            filterMode="client"
            onRowClick={(e) => {
              specialtyCurrent.current = e.row as SpecialtyParser;
              setShowModal(true);
            }}
          />
        </div>
      </div>
      {showModal && (
        <ModalAddEdit
          onClose={(e) => {
            setShowModal(e);
            specialtyCurrent.current = null;
          }}
          onRefresh={() => {
            refresh();
          }}
          current={specialtyCurrent.current}
        />
      )}
    </div>
  );
};

export default Specialty;
