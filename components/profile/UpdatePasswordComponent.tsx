import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FieldError, useForm } from "react-hook-form";
import Input from "./Input";
import { toast } from "react-hot-toast";
import { axios } from "../../utils";

interface UpdatePasswordFormFields {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface FieldErrorPath extends FieldError {
  path: "password" | "newPassword" | "confirmPassword";
}

const UpdatePasswordComponent = () => {
  const [updatePassword, setUpdatePassword] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormFields>();

  const togglePasswordChangeHandler = () => {
    setUpdatePassword((prev) => !prev);
  };

  const submitHandler = async ({ password, newPassword, confirmPassword }: UpdatePasswordFormFields) => {
    if (isSubmitting) return;
    toast.dismiss();

    try {
      const response = await axios.put("/auth/password", {
        password,
        newPassword,
        confirmPassword,
      });

      interface ResponseType {
        message: string;
      }

      const data = (await response.data) as ResponseType;

      toast.success(data.message);
    } catch (error: any) {
      if (error?.fields && error.fields.length > 0) {
        error.fields.forEach((field: FieldErrorPath) => {
          setError(field.path, { type: field.type, message: field.message });
        });
      } else {
        toast.error(error?.message || error || "Something went wrong!");
      }
    }
  };

  return (
    <section className="">
      {!updatePassword && (
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input label="Password" type="password" placeholder="•••••••••••••••••••" disabled={!updatePassword} />
          </div>

          <button
            className="rounded-md bg-indigo-600 text-white block px-6 font-medium py-2 mt-4"
            type="button"
            onClick={togglePasswordChangeHandler}
          >
            Change
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandler)}>
        {updatePassword && (
          <div className="space-y-2">
            <Input
              label="Current Password"
              type="password"
              autoComplete="off"
              disabled={!updatePassword}
              error={errors.password}
              {...register("password", {
                required: "Password is required!",
              })}
            />

            <Input
              label="New Password"
              type="password"
              autoComplete="off"
              disabled={!updatePassword}
              error={errors.newPassword}
              {...register("newPassword", {
                required: "New Password is required!",
              })}
            />

            <Input
              label="Confirm Password"
              type="password"
              autoComplete="off"
              disabled={!updatePassword}
              error={errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Please Confirm Password!",
              })}
            />
          </div>
        )}

        {updatePassword && (
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={togglePasswordChangeHandler}
              className="rounded-md bg-red-600 text-white block px-6 font-medium py-2 mt-4"
              type="button"
            >
              Cancel
            </button>

            <button className="rounded-md bg-indigo-600 text-white block px-6 font-medium py-2 mt-4" type="submit">
              Update
            </button>
          </div>
        )}
      </form>
    </section>
  );
};
export default UpdatePasswordComponent;
