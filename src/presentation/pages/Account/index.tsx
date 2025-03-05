import PasswordField from "@components/fields/PasswordField";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Form } from "@components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import UserController from "@infrastructure/controllers/UserController";
import {
  AccountSchema,
  accountSchema,
} from "@infrastructure/schema/accountSchema";
import { useRequest } from "ahooks";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";

const Account = () => {
  const form = useForm({
    resolver: zodResolver(accountSchema),
    mode: "onBlur",
    defaultValues: {
      current_password: "",
      new_password: "",
      password_confirmation: "",
    },
  });

  const { run: runUpdatePassword, loading: loadingUpdate } = useRequest(
    (data) => UserController.change(data),
    {
      onSuccess: () => {
        form.reset();
        toast("Password updated", {
          description: "Successfully updated the password",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
      onError: () => {
        toast("Password updated", {
          description: "An error occurred while trying to update the password",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
      manual: true,
    }
  );

  const onSubmit = (data: AccountSchema) => {
    runUpdatePassword({
      current_password: data.current_password,
      new_password: data.new_password,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 h-full w-full">
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex gap-2 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <PasswordField
                      name="current_password"
                      label="Current password"
                      control={form.control}
                    />
                    <PasswordField
                      name="new_password"
                      label="New password"
                      control={form.control}
                    />
                    <PasswordField
                      name="password_confirmation"
                      label="Password confirmation"
                      control={form.control}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    {loadingUpdate ? (
                      <ClipLoader color="#fff" size={15} />
                    ) : (
                      <>
                        <Lock /> Change password
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Account;
