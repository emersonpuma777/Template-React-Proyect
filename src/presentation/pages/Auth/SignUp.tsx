import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-[1000px]">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
