import { ComponentProps, useState } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { cn } from "@lib/utils";
import { Link, useNavigate } from "react-router-dom";
import banner from "@assets/banner.jpg";
import { useForm } from "react-hook-form";
import { Form } from "@components/ui/form";
import SelectField from "@components/fields/SelectField";
import InputField from "@components/fields/InputField";
import EmailField from "@components/fields/EmailField";
import PasswordField from "@components/fields/PasswordField";
import CheckboxField from "@components/fields/CheckboxField";
import PhoneField from "@components/fields/PhoneField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpSchema,
  signUpSchema,
} from "@infrastructure/schema/signUpSchema";
import { useRequest } from "ahooks";
import AuthController from "@infrastructure/controllers/AuthController";
import { format } from "date-fns";
import DatePickerField from "@components/fields/DatePickerField";
import ClipLoader from "react-spinners/ClipLoader";

const SignUpForm = ({ className, ...props }: ComponentProps<"div">) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
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
      tyc: false,
      dob: new Date(2000, 7, 2),
    },
  });

  const { run: runSignUp, loading } = useRequest(
    (data) => AuthController.signup(data),
    {
      manual: true,
      onSuccess: () => {
        setSuccessMessage("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      },
      onError: () => {
        setErrorMessage("An error occurred while trying to sign up");
      },
    }
  );

  const onSubmit = (data: SignUpSchema) => {
    runSignUp({ ...data, dob: format(data!.dob!, "yyyy-MM-dd") });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-6 py-12 pmd:p-8 col-span-3"
            >
              {errorMessage && (
                <div className="col-span-3 mb-3">
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{errorMessage}</span>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="col-span-3 mb-3">
                  <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">{successMessage}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center text-center mb-4">
                  <h1 className="text-2xl font-bold">Register</h1>
                </div>
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
                <DatePickerField
                  control={form.control}
                  name="dob"
                  label="Birthday"
                />
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
                <CheckboxField
                  control={form.control}
                  name="tyc"
                  label="Aceptar terminos y condiciones"
                />

                {loading ? (
                  <div className="bg-[#014177] flex items-center justify-center w-full h-full h-[36px] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm px-4 py-2">
                    <ClipLoader color="#fff" loading={true} size={25} />
                  </div>
                ) : (
                  <Button type="submit" className="w-full" disabled={loading}>
                    Sign up
                  </Button>
                )}
                <div className="text-center text-sm mt-4">
                  Do you have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block col-span-2 bg-[#014177]">
            <img
              src={banner}
              alt="Image"
              className="bg-[#014177] absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
