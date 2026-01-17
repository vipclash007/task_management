import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    await dispatch(loginUser(data));
    navigate("/tasks");
  };

  return (
    <div className="h-screen flex items-center justify-center">
        <div className="page-container">
            <form onSubmit={handleSubmit(onSubmit)} className="card">
                <div className="flex gap-3 flex-col justify-center items-center">
                <h2 className="text-xl font-600 mb-4">Login to your account</h2>
                </div>
                
                <span className="flex gap-3 flex-col">
                    <label className="text-xl font-500 block">Username</label>
                    <input {...register("username")} placeholder="Username" className="input" />
                </span>

                <span className="flex gap-3 flex-col">
                    <label className="text-xl font-500 block">Password</label>
                    <input {...register("password")} type="password" placeholder="Password" className="input" />
                </span>

              <button className="btn mt-4">Login</button>

              <p onClick={() => navigate("/signup")} className="link">
                Don’t have an account? Signup
              </p>
            </form>
        </div>
    </div>
  );
};

export default Login;
