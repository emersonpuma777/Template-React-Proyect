import DatePickerField from "@components/fields/DatePickerField";
import EmailField from "@components/fields/EmailField";
import InputField from "@components/fields/InputField";
import PasswordField from "@components/fields/PasswordField";
import PhoneField from "@components/fields/PhoneField";
import SelectField from "@components/fields/SelectField";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { DialogFooter as ModalFooter } from "@components/ui/dialog";
import { Plus, Save, Trash, X } from "lucide-react";
import { DoctorParser } from "@infrastructure/models/doctor";
import { useRequest } from "ahooks";
import SpecialtyController from "@infrastructure/controllers/SpecialtyController";
import {
  doctorSchemaCreate,
  DoctorSchemaCreate,
} from "@infrastructure/schema/doctorSchemaCreate";
import { toast } from "sonner";
import DoctorController from "@infrastructure/controllers/DoctorController";
import ClipLoader from "react-spinners/ClipLoader";
import {
  DoctorSchemaUpdate,
  doctorSchemaUpdate,
} from "@infrastructure/schema/doctorSchemaUpdate";

interface DoctorFormProps {
  doctorCurrent?: DoctorParser | null;
  onClose: (e: boolean) => void;
  onRefresh: () => void;
}

const DoctorForm = ({ doctorCurrent, onClose, onRefresh }: DoctorFormProps) => {
  const form = useForm({
    resolver: zodResolver(
      doctorCurrent ? doctorSchemaUpdate : doctorSchemaCreate
    ),
    mode: "onBlur",
    defaultValues: doctorCurrent
      ? {
          name: doctorCurrent.name ?? "",
          lastname: doctorCurrent.lastname ?? "",
          email: doctorCurrent.email ?? "",
          phone: doctorCurrent.phone ?? "",
          specialty_id: doctorCurrent.specialty_id ?? "",
        }
      : {
          name: "",
          lastname: "",
          identifier: "",
          email: "",
          username: "",
          password: "",
          sex: "",
          phone: "",
          city: "",
          country: "",
          dob: new Date(2000, 7, 2),
          specialty_id: "",
        },
  });

  const { data: specialties, loading: loadingSpecialties } = useRequest(
    async () => {
      const res = await SpecialtyController.search();
      return (res.data ?? []).map((item) => ({
        label: item.name ?? "",
        value: item.id ?? "",
      }));
    },
    {}
  );

  const { run: runCreateDoctor, loading: loadingCreate } = useRequest(
    (data) => DoctorController.create(data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${doctorCurrent ? "Updated" : "Created"} doctor`, {
          description: "Successfully created the doctor",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${doctorCurrent ? "Updated" : "Created"} doctor`, {
          description: "An error occurred while trying to create the doctor",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runUpdateDoctor, loading: loadingUpdate } = useRequest(
    (data) => DoctorController.update(doctorCurrent?.id ?? "", data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${doctorCurrent ? "Updated" : "Created"} doctor`, {
          description: "Successfully created the doctor",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${doctorCurrent ? "Updated" : "Created"} doctor`, {
          description: "An error occurred while trying to update the doctor",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runRemoveDoctor, loading: loadingRemove } = useRequest(
    () => DoctorController.remove(doctorCurrent?.id ?? ""),
    {
      manual: true,
      onSuccess: () => {
        toast(`Deleted doctor`, {
          description: "Successfully deleted the doctor",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`Deleted doctor`, {
          description: "An error occurred while trying to delete the doctor",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const onSubmit = (data: DoctorSchemaCreate | DoctorSchemaUpdate) => {
    if (doctorCurrent) {
      runUpdateDoctor({
        ...data,
        specialty_id: Number(data.specialty_id),
      });
    } else {
      runCreateDoctor({
        ...data,
        tyc: true,
        specialty_id: Number(data.specialty_id),
      });
    }
  };

  return (
    <>
      {loadingSpecialties ? (
        <div className="flex items-center justify-center h-full w-full">
          <ClipLoader color="#000" loading={loadingSpecialties} size={50} />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {doctorCurrent ? (
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex gap-3 grid grid-cols-2">
                  <InputField
                    control={form.control}
                    name="name"
                    label="First Name"
                  />
                  <InputField
                    control={form.control}
                    name="lastname"
                    label="Last Name"
                  />
                </div>
                <EmailField control={form.control} name="email" label="Email" />
                <div className="flex gap-3 grid grid-cols-2">
                  <SelectField
                    control={form.control}
                    name="specialty_id"
                    label="Specialty"
                    data={specialties ?? []}
                  />
                  <PhoneField
                    control={form.control}
                    name="phone"
                    label="Phone"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex gap-3 grid grid-cols-2">
                  <InputField
                    control={form.control}
                    name="name"
                    label="First Name"
                  />
                  <InputField
                    control={form.control}
                    name="lastname"
                    label="Last Name"
                  />
                </div>
                <div className="flex gap-3 grid grid-cols-2">
                  <InputField
                    control={form.control}
                    name="identifier"
                    label="DNI"
                  />
                  <EmailField
                    control={form.control}
                    name="email"
                    label="Email"
                  />
                </div>
                <div className="flex gap-3 grid grid-cols-2">
                  <InputField
                    control={form.control}
                    name="username"
                    label="Username"
                  />
                  <PasswordField
                    control={form.control}
                    name="password"
                    label="Password"
                  />
                </div>
                <div className="flex gap-3 grid grid-cols-2">
                  <SelectField
                    control={form.control}
                    name="specialty_id"
                    label="Specialty"
                    data={specialties ?? []}
                  />
                  <DatePickerField
                    control={form.control}
                    name="dob"
                    label="Birthday"
                  />
                </div>
                <div className="flex gap-3 grid grid-cols-2">
                  <SelectField
                    control={form.control}
                    name="sex"
                    label="Gender"
                    data={[
                      {
                        label: "Male",
                        value: "M",
                      },
                      {
                        label: "Female",
                        value: "F",
                      },
                    ]}
                  />
                  <PhoneField
                    control={form.control}
                    name="phone"
                    label="Phone"
                  />
                </div>
                <div className="flex gap-3 grid grid-cols-2">
                  <InputField control={form.control} name="city" label="City" />
                  <InputField
                    control={form.control}
                    name="country"
                    label="Country"
                  />
                </div>
              </div>
            )}
            <ModalFooter>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loadingCreate || loadingUpdate || loadingRemove}
              >
                {loadingCreate || loadingUpdate || loadingRemove ? (
                  <ClipLoader size={15} color="#fff" />
                ) : (
                  <>
                    {doctorCurrent ? <Save /> : <Plus />}
                    {doctorCurrent ? "Save Changes" : "Create Doctor"}
                  </>
                )}
              </Button>
              {doctorCurrent && (
                <Button
                  type="button"
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => runRemoveDoctor()}
                  disabled={loadingCreate || loadingUpdate || loadingRemove}
                >
                  <Trash />
                  Delete
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

export default DoctorForm;
