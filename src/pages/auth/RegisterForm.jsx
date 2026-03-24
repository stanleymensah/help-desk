import { useForm } from "react-hook-form";

export default function RegisterForm() {

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

  const onSubmit = () => {};

  return (
    <>
    <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Join us!</h1>
              <p className="text-xs text-gray-600">
                Register and get unlimited access to data & information
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 text-xs"
            >
              <div className="flex flex-col gap-2">
                <label className=" font-semibold">Username</label>
                <input
                  {...register("username", {
                    required: "Username is required!",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter a username"
                  className={`p-3 border rounded-lg focus:outline-none focus:border-primary ${errors.username ? "border-red-500" : "border-primary/50"}`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" font-semibold">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required!",
                    minLength: {
                      value: 8,
                      message: "Email must be at least 8 characters",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email address"
                  className={`p-3 border rounded-lg focus:outline-none focus:border-primary ${errors.email ? "border-red-500" : "border-primary/50"}`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" font-semibold">Password</label>
                <input
                  {...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className={`p-3 border rounded-lg focus:outline-none focus:border-primary ${errors.password ? "border-red-500" : "border-primary/50"}`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" font-semibold">Confirm Password</label>
                <input
                  {...register("confirmPassword", {
                    required: "Confirm Password!",
                    validate: (value, formValues) => {
                      return (
                        value === formValues.password ||
                        "Passwords do not match!"
                      );
                    },
                  })}
                  type="password"
                  placeholder="Confirm your password"
                  className={`p-3 border rounded-lg focus:outline-none focus:border-primary ${errors.confirmPassword ? "border-red-500" : "border-primary/50"}`}
                />
              </div>

              <button
                type="submit"
                className="text-white bg-primary py-3 w-full rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-4"
              >
                Sign Up
              </button>
            </form>
    </>
  )
}
