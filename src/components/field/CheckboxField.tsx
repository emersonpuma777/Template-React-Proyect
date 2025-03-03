import { Checkbox } from "@components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";
import { Control, FieldValues } from "react-hook-form";

interface CheckboxFieldProps {
  name: string;
  label?: string;
  classNameInput?: string;
  className?: string;
  control: Control<FieldValues>;
}

const CheckboxField = ({
  name,
  label,
  control,
  classNameInput = "",
  className = "",
}: CheckboxFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex items-center space-x-2 py-5 ${className}`}>
          <FormControl>
            <Checkbox
              id="tyc"
              className={`cursor-pointer ${classNameInput}`}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          {label && (
            <FormLabel
              htmlFor="tyc"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {label}
            </FormLabel>
          )}
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
