/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import DatePickerField from "@components/fields/DatePickerField";
import InputField from "@components/fields/InputField";
import SelectField from "@components/fields/SelectField";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { DialogFooter as ModalFooter } from "@components/ui/dialog";
import { DollarSign, Plus, Save, Trash, X } from "lucide-react";
import { useRequest } from "ahooks";
import { toast } from "sonner";
import AppointmentController from "@infrastructure/controllers/AppointmentController";
import ClipLoader from "react-spinners/ClipLoader";
import { AppointmentParser } from "@infrastructure/models/appointement";
import { appointmentSchemaCreate } from "@infrastructure/schema/appointmentSchemaCreate";

import PatientController from "@infrastructure/controllers/PatientController";
import DoctorController from "@infrastructure/controllers/DoctorController";
import WorkingHours from "@infrastructure/controllers/WorkingHours";
import { useEffect } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@application/store/store";

interface AppointmentFormProps {
  current?: AppointmentParser | null;
  onClose: (e: boolean) => void;
  onRefresh: () => void;
}

const AppointmentForm = ({
  current,
  onClose,
  onRefresh,
}: AppointmentFormProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const form = useForm({
    resolver: zodResolver(appointmentSchemaCreate as any),
    mode: "onBlur",
    defaultValues: current
      ? {
          patientId: current?.patient_id ?? "",
          doctorId: current?.doctor_id ?? "",
          appointmentDate: format(
            current?.appointment_date ?? new Date(),
            "yyyy-MM-dd"
          ),
          startTime: current?.start_time?.substring(
            0,
            current?.start_time?.length - 3
          ),
          endTime: current?.start_time?.substring(
            0,
            current?.start_time?.length - 3
          ),
        }
      : {
          patientId: user?.role === "patient" ? `${user?.id}` : "",
          doctorId: "",
          appointmentDate: new Date(),
          startTime: "",
          endTime: "",
        },
  });

  const { data: workingHours, run: runWorkingHours } = useRequest(
    async (params) => {
      const res = await WorkingHours.search(params);
      return (res.data ?? [])?.map((item) => ({
        label: item ?? "",
        value: item ?? "",
      }));
    },
    {
      manual: true,
    }
  );

  const { data: patient, loading: loadingPatient } = useRequest(
    async () => {
      const res = await PatientController.search();
      return (res.data ?? []).map((item) => ({
        label: `${item.name ?? ""} ${item.lastname ?? ""}`,
        value: item.id ?? "",
      }));
    },
    {
      ready: user?.role !== "patient",
    }
  );

  const { data: doctor, loading: loadingDoctor } = useRequest(async () => {
    const res = await DoctorController.search();
    return (res.data ?? []).map((item) => ({
      label: `${item.specialty_name ?? ""} - ${item.name ?? ""} ${
        item.lastname ?? ""
      }`,
      value: item.id ?? "",
    }));
  }, {});

  const { run: runCreateAppointment, loading: loadingCreate } = useRequest(
    (data) => AppointmentController.create(data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${current ? "Updated" : "Created"} appointment`, {
          description: "Successfully created the appointment",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${current ? "Updated" : "Created"} appointment`, {
          description:
            "An error occurred while trying to create the appointment",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runUpdateAppointment, loading: loadingUpdate } = useRequest(
    (data) => AppointmentController.update(current?.id ?? "", data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${current ? "Updated" : "Created"} appointment`, {
          description: "Successfully created the appointment",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${current ? "Updated" : "Created"} appointment`, {
          description:
            "An error occurred while trying to update the appointment",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runRemoveAppointment, loading: loadingRemove } = useRequest(
    () => AppointmentController.cancel(current?.id ?? ""),
    {
      manual: true,
      onSuccess: () => {
        toast(`Deleted appointment`, {
          description: "Successfully deleted the appointment",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`Deleted appointment`, {
          description:
            "An error occurred while trying to delete the appointment",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const onSubmit = (data: any) => {
    if (current) {
      runUpdateAppointment(data);
    } else {
      runCreateAppointment({
        ...data,
        pacientId: user?.role === "patient" ? user?.id : data.patientId,
      });
    }
  };

  useEffect(() => {
    const date = form.watch("appointmentDate");
    const docId = form.watch("doctorId");
    if (date && docId) {
      runWorkingHours({
        doctorId: docId,
        date: format(date, "yyyy-MM-dd"),
      });
    }
  }, [form.watch("appointmentDate"), form.watch("doctorId")]);

  return (
    <>
      {loadingPatient || loadingDoctor ? (
        <div className="flex items-center justify-center h-full w-full">
          <ClipLoader color="#000" loading size={50} />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 pb-5">
              {user?.role !== "patient" && (
                <SelectField
                  control={form.control}
                  name="patientId"
                  label="Patient"
                  data={patient ?? []}
                  disabled={Boolean(current)}
                />
              )}
              <SelectField
                control={form.control}
                name="doctorId"
                label="Doctor"
                data={doctor ?? []}
                disabled={Boolean(current)}
              />
              {current ? (
                <InputField
                  control={form.control}
                  name="appointmentDate"
                  label="Appointment Date"
                  disabled={Boolean(current)}
                />
              ) : (
                <DatePickerField
                  control={form.control}
                  name="appointmentDate"
                  label="Appointment Date"
                  disabled={Boolean(current)}
                />
              )}
              {current ? (
                <div className="flex gap-3 grid grid-cols-2">
                  <InputField
                    control={form.control}
                    name="startTime"
                    label="Start time"
                    disabled={Boolean(current)}
                  />
                  <InputField
                    control={form.control}
                    name="endTime"
                    label="End time"
                    disabled={Boolean(current)}
                  />
                </div>
              ) : (
                <div className="flex gap-3 grid grid-cols-2">
                  <SelectField
                    control={form.control}
                    name="startTime"
                    label="Start time"
                    disabled={Boolean(current)}
                    data={workingHours ?? []}
                  />
                  <SelectField
                    control={form.control}
                    name="endTime"
                    label="End time"
                    data={workingHours ?? []}
                    disabled={Boolean(current)}
                  />
                </div>
              )}
            </div>

            <ModalFooter>
              {!current && (
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loadingCreate || loadingUpdate || loadingRemove}
                >
                  {loadingCreate || loadingUpdate || loadingRemove ? (
                    <ClipLoader size={15} color="#fff" />
                  ) : (
                    <>
                      {current ? <Save /> : <Plus />}
                      {current ? "Save Changes" : "Create Appointment"}
                    </>
                  )}
                </Button>
              )}
              {current && !current.is_paid && (
                <Button
                  type="button"
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => runRemoveAppointment()}
                  disabled={loadingCreate || loadingUpdate || loadingRemove}
                >
                  <Trash />
                  Cancel Appointment
                </Button>
              )}
              {current && !current.is_paid && (
                <Button
                  type="button"
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => runRemoveAppointment()}
                  disabled={loadingCreate || loadingUpdate || loadingRemove}
                >
                  <DollarSign />
                  Paid Appointment
                </Button>
              )}
              <div className="grow" />

              <Button
                type="button"
                className="cursor-pointer"
                variant="secondary"
                onClick={() => onClose(false)}
                disabled={loadingCreate || loadingUpdate || loadingRemove}
              >
                <X />
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Form>
      )}
    </>
  );
};

export default AppointmentForm;
