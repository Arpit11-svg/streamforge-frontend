import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Input } from "../ui";

import authService from "../../services/auth.service";

function SignupForm() {
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
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

      <form onSubmit={handleSubmit(create)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="John Doe"
          {...register("fullName", {
            required: true,
          })}
        />

        <Input
          label="Username"
          placeholder="john_doe"
          {...register("username", {
            required: true,
          })}
        />

        <Input
          type="email"
          label="Email"
          placeholder="john@gmail.com"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Invalid Email",
            },
          })}
        />

        <Input
          type="password"
          label="Password"
          placeholder="********"
          {...register("password", {
            required: true,
          })}
        />

        <Input
          label="Avatar"
          type="file"
          accept="image/*"
          {...register("avatar", {
            required: true,
          })}
        />

        <Input
          label="Cover Image (Optional)"
          type="file"
          accept="image/*"
          {...register("coverImage")}
        />

        <Button type="submit" disabled={loading} className="mt-4 w-full">
          {loading ? "Creating Account..." : "Create Account"}
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
    </>
  );
}

export default SignupForm;
