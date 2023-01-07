import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateProfile } from "../../store/slices/auth/slice";
import { FieldError } from "../../types/ErrorTypes";
import { User } from "../../types/userTypes";
import { axios } from "../../utils";
import Input from "./Input";
import VerifyEmail from "./VerifyEmail";

const UpdateEmailComponent = () => {
  const [updateEmail, setUpdateEmail] = useState(false);
  const [verifyMode, setVerifyMode] = useState(false);
  const [OTP, setOTP] = useState();

  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; otp: number }>();

  const enableEmailChangeHandler = () => {
    setUpdateEmail(true);
  };

  const cancelEmailChangeHandler = () => {
    setUpdateEmail(false);
    setVerifyMode(false);
  };

  const submitHandler = async ({ email }: { email: string }) => {
    if (isSubmitting) return;
    toast.dismiss();

    try {
      const response = await axios.put("/auth/updateemail", {
        email,
      });

      interface ResponseType {
        message: string;
        verifyMode: boolean;
      }

      const data = (await response.data) as ResponseType;

      if (data.verifyMode) {
        setVerifyMode(true);
      }
    } catch (error: any) {
      if (error?.fields && error.fields.length > 0) {
        interface FieldErrorPath extends FieldError {
          path: "email";
        }

        error.fields.forEach((field: FieldErrorPath) => {
          setError(field.path, { type: field.type, message: field.message });
        });
      } else {
        toast.error(error?.message || error || "Something went wrong!");
      }
    }
  };

  return (
    <div>
      <VerifyEmail open={verifyMode} onCancel={cancelEmailChangeHandler} />

      <form onSubmit={handleSubmit(submitHandler)}>
        {!updateEmail && (
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input label="Email Address" type="email" defaultValue={user?.email} disabled={!updateEmail} />
            </div>

            <button
              type="button"
              className="rounded-md bg-indigo-600 hover: text-white block px-6 font-medium py-2 mt-2"
              onClick={enableEmailChangeHandler}
            >
              Change
            </button>
          </div>
        )}

        {updateEmail && (
          <section>
            <Input
              label="Email Address"
              type="email"
              defaultValue={user?.email}
              disabled={!updateEmail}
              error={errors.email}
              {...register("email", {
                required: "Email is required!",
              })}
            />

            <div className="flex items-center justify-end gap-4">
              <button
                onClick={cancelEmailChangeHandler}
                className="rounded-md bg-red-600 text-white block px-6 font-medium py-2 mt-4"
                type="button"
              >
                Cancel
              </button>

              <button className="rounded-md bg-indigo-600 text-white block px-6 font-medium py-2 mt-4" type="submit">
                Update
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};
export default UpdateEmailComponent;
