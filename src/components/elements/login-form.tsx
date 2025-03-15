import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite";

const formSchema = z.object({
  email: z.string().min(2, "Enter a valid email"),
  password: z.string().min(1, "Enter your passsword"),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const user = localStorage.getItem("session");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(value: FormData) {
    try {
      const session = await account.createEmailPasswordSession(
        value.email,
        value.password
      );

      if (!account) {
        toast.error("Wrong Email or Password!");
        return;
      }

      localStorage.setItem("session", JSON.stringify(session.current));
      const data = await account.get();
      localStorage.setItem("role", JSON.stringify(data.labels[0]));
      toast.success("Logged in Successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit the form, Try Again.");
    }
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-slate-100 dark:bg-zinc-800 p-4 rounded-md w-96 ring-1 dark:ring dark:ring-white"
    >
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <span className="text-red-500 h-4">
              {form.formState.errors.email.message}
            </span>
          ) : (
            <span className="text-red-500 h-4"></span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password ? (
            <span className="text-red-500 h-4">
              {form.formState.errors.password.message}
            </span>
          ) : (
            <span className="text-red-500 h-4"></span>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className=" dark:bg-blue-600 text-white cursor-pointer hover:dark:bg-blue-700"
      >
        Submit
      </Button>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
