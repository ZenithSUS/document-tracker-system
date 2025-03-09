import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite";
import { Error } from "@/lib/types";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      await account.createEmailPasswordSession(data.email, data.password);
      toast.success("Logged in successfully");
      console.log(account.get());
      navigate("/");
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err.response);
      toast.error(err.response.data.error.auth_error);
    }
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
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...form.register("password")} />
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
