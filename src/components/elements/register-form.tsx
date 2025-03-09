import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { account, ID } from "@/lib/appwrite";
import { createUser } from "@/actions/users";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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
      firstName: "",
      middleName: "",
      lastName: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const fullname = `${data.firstName} ${
        data.middleName ? data.middleName + " " : ""
      }${data.lastName}`;

      const response = await account.create(
        ID.unique(),
        data.email,
        data.password,
        fullname
      );

      await createUser({
        ...data,
        id: response.$id,
      });

      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-slate-100 dark:bg-zinc-800 p-4 rounded-md w-xl max-h-screen ring-1 dark:ring dark:ring-white"
    >
      <h1 className="text-3xl font-bold text-center">Register</h1>
      <div className="grid gap-4 grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...form.register("firstName")} />
          {form.formState.errors.firstName ? (
            <span className="text-red-500 h-10">
              {form.formState.errors.firstName.message}
            </span>
          ) : (
            <span className="h-10"></span>
          )}

          <Label htmlFor="middleName">Middle Name</Label>
          <Input id="middleName" {...form.register("middleName")} />
          {form.formState.errors.middleName ? (
            <span className="text-red-500 h-10">
              {form.formState.errors.middleName.message}
            </span>
          ) : (
            <span className="h-10"></span>
          )}

          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...form.register("lastName")} />
          {form.formState.errors.lastName ? (
            <span className="text-red-500 h-10">
              {form.formState.errors.lastName.message}
            </span>
          ) : (
            <span className="h-10"></span>
          )}
        </div>

        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
            {form.formState.errors.email ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.email.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
            />
            {form.formState.errors.password ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.password.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword ? (
              <p className="text-red-500 h-10">
                {form.formState.errors.confirmPassword.message}
              </p>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
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
