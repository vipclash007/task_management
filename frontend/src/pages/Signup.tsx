import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await dispatch(signupUser(data));
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="page-container">
        
        <form onSubmit={handleSubmit(onSubmit)} className="card">
          <div className="flex gap-3 flex-col justify-center items-center">
          <h2 className="text-xl font-600 mb-4">Create your account</h2>
          </div>
          
          <span className="flex gap-3 flex-col">
            <label className="text-xl font-500 block">Username</label>
            <input {...register("username")} placeholder="Username" className="input" />
          </span>
          <span className="flex gap-3 flex-col">
            <label className="text-xl font-500 block">Password</label>
            <input {...register("password")} type="password" placeholder="Password" className="input" />
          </span>
        
        <button className="btn mt-4">Signup</button>
        <p onClick={() => navigate("/login")} className="link">
          Already have an account? Login
        </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
