import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input } from "../ui";
import authService from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      window.scrollTo(0, 0);
    }
  }, [error]);

  const submit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({
        identifier: data.identifier,
        password: data.password,
      });

      if (response.statusCode === 200) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div
          className="
                    mb-6
                    rounded-xl
                    border
                    border-red-500/30
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-300
                    "
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Username or Email"
          placeholder="john_doe or john@gmail.com"
          {...register("identifier", {
            required: "Username or email is required",
          })}
        />
        {errors.identifier && (
          <p className="mt-1 text-sm text-red-400">
            {errors.identifier.message}
          </p>
        )}

        <Input
          type="password"
          label="Password"
          placeholder="********"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div
        className="
                mt-8
                text-center
                text-sm
                text-slate-400
                "
      >
        Don't have an account?
        <Link
          to="/signup"
          className="
                    ml-2
                    font-semibold
                    text-blue-400
                    transition
                    hover:text-cyan-300
                    "
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}

export default LoginForm;
