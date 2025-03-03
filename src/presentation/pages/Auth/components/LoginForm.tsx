import { ComponentProps, useState } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import banner from "@assets/banner.jpg";
import { cn } from "@lib/utils";
import { useRequest } from "ahooks";
import AuthController from "@infrastructure/controllers/AuthController";
import { setHeader } from "@application/common/Globals";
import { useDispatch } from "react-redux";
import { login } from "@application/slices/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { run: runLogin, loading } = useRequest(
    () => AuthController.login({ username, password }),
    {
      manual: true,
      onSuccess: ({ data }) => {
        sessionStorage.setItem("accessToken", data?.token ?? "");
        sessionStorage.setItem("userInfo", JSON.stringify(data?.user));

        setHeader(`Basic ${data?.token}`);
        dispatch(
          login({
            isAuthenticated: true,
            user: data!.user!,
            token: data?.token,
          })
        );
        navigate("/dashboard", {
          replace: true,
        });
      },
      onError: () => {
        setErrorMessage("Invalid credentials");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runLogin();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="px-6 py-12 pmd:p-8" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="col-span-3 mb-3">
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Clinic Arequipa account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              {loading ? (
                <div className="bg-[#014177] flex items-center justify-center w-full h-full h-[36px] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm px-4 py-2">
                  <ClipLoader color="#fff" loading={true} size={25} />
                </div>
              ) : (
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
              )}

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full" disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Login with Google</span>
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
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
}
