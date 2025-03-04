/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@lib/utils";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@components/ui/calendar";
import { es } from "date-fns/locale";

interface DatePickerFieldProps {
  name: string;
  label?: string;
  classNameInput?: string;
  className?: string;
  control: Control<any>;
  disabled?: boolean;
}

const DatePickerField = ({
  name,
  label,
  control,
  classNameInput = "",
  className = "",
  disabled = false,
}: DatePickerFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col ${className}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <div>
            <Popover>
              <PopoverTrigger
                asChild
                className={classNameInput}
                disabled={disabled}
              >
                <div>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value && format(field.value, "yyyy-MM-dd")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  locale={es}
                  mode="single"
                  fromYear={1990}
                  toYear={3000}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage className="text-[12px]" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default DatePickerField;
