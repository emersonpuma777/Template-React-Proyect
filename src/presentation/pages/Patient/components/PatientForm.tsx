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
import { useRequest } from "ahooks";
import { toast } from "sonner";
import PatientController from "@infrastructure/controllers/PatientController";
import ClipLoader from "react-spinners/ClipLoader";
import { PatientParser } from "@infrastructure/models/patient";
import {
  PatientSchemaCreate,
  patientSchemaCreate,
} from "@infrastructure/schema/patientSchemaCreate";
import {
  PatientSchemaUpdate,
  patientSchemaUpdate,
} from "@infrastructure/schema/patientSchemaUpdate";

interface PatientFormProps {
  current?: PatientParser | null;
  onClose: (e: boolean) => void;
  onRefresh: () => void;
}

const PatientForm = ({ current, onClose, onRefresh }: PatientFormProps) => {
  const form = useForm({
    resolver: zodResolver(current ? patientSchemaUpdate : patientSchemaCreate),
    mode: "onBlur",
    defaultValues: current
      ? {
          name: current.name ?? "",
          lastname: current.lastname ?? "",
          email: current.email ?? "",
          phone: current.phone ?? "",
          address: current.address ?? "",
          dob: current.dob ?? new Date(),
          social_security_number: current.social_security_number ?? "",
          sex: current.gender ?? "",
        }
      : {
          name: "",
          lastname: "",
          dob: new Date(2000, 7, 2),
          sex: "",
          address: "",
          phone: "",
          email: "",
          social_security_number: "",
          identifier: "",
          username: "",
          password: "",
          city: "",
          country: "",
        },
  });

  const { run: runCreatePatient, loading: loadingCreate } = useRequest(
    (data) => PatientController.create(data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${current ? "Updated" : "Created"} patient`, {
          description: "Successfully created the patient",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${current ? "Updated" : "Created"} patient`, {
          description: "An error occurred while trying to create the patient",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runUpdatePatient, loading: loadingUpdate } = useRequest(
    (data) => PatientController.update(current?.id ?? "", data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${current ? "Updated" : "Created"} patient`, {
          description: "Successfully created the patient",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${current ? "Updated" : "Created"} patient`, {
          description: "An error occurred while trying to update the patient",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runRemovePatient, loading: loadingRemove } = useRequest(
    () => PatientController.remove(current?.id ?? ""),
    {
      manual: true,
      onSuccess: () => {
        toast(`Deleted patient`, {
          description: "Successfully deleted the patient",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`Deleted patient`, {
          description: "An error occurred while trying to delete the patient",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const onSubmit = (data: PatientSchemaCreate | PatientSchemaUpdate) => {
    if (current) {
      runUpdatePatient({
        ...data,
        gender: data?.sex,
      });
    } else {
      runCreatePatient({
        ...data,
        tyc: true,
        user_id: null,
        gender: data?.sex,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {current ? (
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
              <DatePickerField
                control={form.control}
                name="dob"
                label="Birthday"
              />
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
            </div>
            <div className="flex gap-3 grid grid-cols-2">
              <InputField
                control={form.control}
                name="address"
                label="Address"
              />
              <EmailField control={form.control} name="email" label="Email" />
            </div>
            <div className="flex gap-3 grid grid-cols-2">
              <PhoneField control={form.control} name="phone" label="Phone" />
              <InputField
                control={form.control}
                name="social_security_number"
                label="Social Security Number"
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
              <EmailField control={form.control} name="email" label="Email" />
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
            <InputField control={form.control} name="address" label="Address" />
            <div className="flex gap-3 grid grid-cols-2">
              <DatePickerField
                control={form.control}
                name="dob"
                label="Birthday"
              />
              <InputField
                control={form.control}
                name="social_security_number"
                label="Social Security Number"
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
              <PhoneField control={form.control} name="phone" label="Phone" />
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
                {current ? <Save /> : <Plus />}
                {current ? "Save Changes" : "Create Patient"}
              </>
            )}
          </Button>
          {current && (
            <Button
              type="button"
              className="cursor-pointer"
              variant="destructive"
              onClick={() => runRemovePatient()}
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
  );
};

export default PatientForm;
