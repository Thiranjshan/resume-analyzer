import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuthStore } from "../hooks/authStore";
import axios from "axios";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type FormData = z.infer<typeof schema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/register", data);
      setAuth(res.data.token, res.data.userId);
      navigate("/dashboard");
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            alert(err.response?.data?.error || "Registration failed");
        }else {
            alert("An unexpected error occurred");
        }

    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name")} placeholder="Name" className="w-full border p-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("password")} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}