import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Control, FieldValues } from "react-hook-form";

interface PhoneFieldProps {
  name: string;
  label?: string;
  classNameInput?: string;
  className?: string;
  control: Control<FieldValues>;
}

const PhoneField = ({
  name,
  label,
  control,
  classNameInput = "",
  className = "",
}: PhoneFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type="number" className={classNameInput} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;
