import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.confirmPassword.length === 0, {
    message: "Please confirm your password",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password.length >= 6, {
    message: "Password must be at least 6 characters",
    path: ["password"],
  });

type FormData = z.infer<typeof formSchema>;

export function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: FormData) {
    toast.success("Submitted");
    console.log(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-slate-100 dark:bg-zinc-800 p-4 rounded-md w-96 ring-1 dark:ring dark:ring-white"
    >
      <h1 className="text-3xl font-bold text-center">Register</h1>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <span className="text-red-500">
              {form.formState.errors.email.message}
            </span>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password ? (
            <span className="text-red-500">
              {form.formState.errors.password.message}
            </span>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword ? (
            <p className="text-red-500">
              {form.formState.errors.confirmPassword.message}
            </p>
          ) : null}
        </div>
      </div>
      <Button
        type="submit"
        className=" dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 cursor-pointer"
      >
        Submit
      </Button>
      <p className="text-center">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </form>
  );
}
