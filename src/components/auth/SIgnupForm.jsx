import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input } from "../ui";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ shouldFocusError: true });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    if (error || success) {
      window.scrollTo(0, 0);
    }
  }, [error, success]);

  const navigate = useNavigate();

  const create = async (data) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);

      formData.append("username", data.username);

      formData.append("email", data.email);

      formData.append("password", data.password);

      formData.append("avatar", data.avatar[0]);

      if (data.coverImage?.length > 0) {
        formData.append("coverImage", data.coverImage[0]);
      }

      await authService.register(formData);

      setSuccess("Account created successfully!");
      navigate("/login");
      reset();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="
                mt-4
                mb-6
                text-center
                text-2xl
                text-slate-400
                "
      >
        Already have an account?
        <Link
          to="/login"
          className="
                    ml-2
                    font-semibold
                    text-blue-400
                    transition
                    hover:text-cyan-300
                    "
        >
          Sign In
        </Link>
      </div>
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

      {success && (
        <div
          className="
      mb-6
      rounded-xl
      border
      border-green-500/30
      bg-green-500/10
      px-4
      py-3
      text-sm
      text-green-300
    "
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(create)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="John Doe"
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
        )}

        <Input
          label="Username"
          placeholder="john_doe"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
        )}

        <Input
          type="email"
          label="Email"
          placeholder="john@gmail.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}

        <Input
          type="password"
          label="Password"
          placeholder="********"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}

        <Input
          label="Avatar"
          type="file"
          accept="image/*"
          {...register("avatar", {
            required: "Please upload an avatar",
          })}
        />
        {errors.avatar && (
          <p className="mt-1 text-sm text-red-400">{errors.avatar.message}</p>
        )}

        <Input
          label="Cover Image (Optional)"
          type="file"
          accept="image/*"
          {...register("coverImage")}
        />

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </>
  );
}

export default SignupForm;
