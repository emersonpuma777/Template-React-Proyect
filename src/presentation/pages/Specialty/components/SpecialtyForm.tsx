import InputField from "@components/fields/InputField";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { DialogFooter as ModalFooter } from "@components/ui/dialog";
import { Plus, Save, Trash, X } from "lucide-react";
import { useRequest } from "ahooks";
import { toast } from "sonner";
import SpecialtyController from "@infrastructure/controllers/SpecialtyController";
import ClipLoader from "react-spinners/ClipLoader";

import { SpecialtyParser } from "@infrastructure/models/specialty";
import {
  SpecialtySchemaCreate,
  specialtySchemaCreate,
} from "@infrastructure/schema/specialtySchemaCreate";
import PhoneField from "@components/fields/PhoneField";

interface SpecialtyFormProps {
  current?: SpecialtyParser | null;
  onClose: (e: boolean) => void;
  onRefresh: () => void;
}

const SpecialtyForm = ({ current, onClose, onRefresh }: SpecialtyFormProps) => {
  const form = useForm({
    resolver: zodResolver(specialtySchemaCreate),
    mode: "onBlur",
    defaultValues: current
      ? {
          name: current?.name ?? "",
          label: current?.label ?? "",
          hourly_rate: current?.hourly_rate ?? "",
        }
      : {
          name: "",
          label: "",
          hourly_rate: "",
        },
  });

  const { run: runCreateSpecialty, loading: loadingCreate } = useRequest(
    (data) => SpecialtyController.create(data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${current ? "Updated" : "Created"} specialty`, {
          description: "Successfully created the specialty",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${current ? "Updated" : "Created"} specialty`, {
          description: "An error occurred while trying to create the specialty",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runUpdateSpecialty, loading: loadingUpdate } = useRequest(
    (data) => SpecialtyController.update(current?.id ?? "", data),
    {
      manual: true,
      onSuccess: () => {
        toast(`${current ? "Updated" : "Created"} specialty`, {
          description: "Successfully created the specialty",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`${current ? "Updated" : "Created"} specialty`, {
          description: "An error occurred while trying to update the specialty",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const { run: runRemoveSpecialty, loading: loadingRemove } = useRequest(
    () => SpecialtyController.remove(current?.id ?? ""),
    {
      manual: true,
      onSuccess: () => {
        toast(`Deleted specialty`, {
          description: "Successfully deleted the specialty",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onRefresh();
        onClose(false);
      },
      onError: () => {
        toast(`Deleted specialty`, {
          description: "An error occurred while trying to delete the specialty",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    }
  );

  const onSubmit = (data: SpecialtySchemaCreate) => {
    if (current) {
      runUpdateSpecialty(data);
    } else {
      runCreateSpecialty(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 pb-5">
          <InputField control={form.control} name="name" label="Name" />
          <InputField control={form.control} name="label" label="Label" />
          <PhoneField
            control={form.control}
            name="hourly_rate"
            label="Hourly Rate"
          />
        </div>

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
                {current ? "Save Changes" : "Create Specialty"}
              </>
            )}
          </Button>
          {current && (
            <Button
              type="button"
              className="cursor-pointer"
              variant="destructive"
              onClick={() => runRemoveSpecialty()}
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

export default SpecialtyForm;
