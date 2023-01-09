import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OtpInput from "react-otp-input";
import { toast } from "react-hot-toast";
import { axios } from "../../utils";
import { User } from "../../types/userTypes";
import { useAppDispatch } from "../../hooks";
import { updateProfile } from "../../store/slices/auth/slice";
import { FieldError } from "../../types/ErrorTypes";

interface Props {
  email?: string;
  onCancel: () => void;
  open: boolean;
}

const VerifyEmail = ({ onCancel, open, email }: Props) => {
  const [otp, setOtp] = useState<string>();
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      setOtp(e.target.value);
    }
  };

  const closeHandler = () => {
    setOtp("");
    onCancel();
  };

  const submitHandler = async () => {
    if (loading) return;

    setLoading(true);
    toast.dismiss();

    try {
      const response = await axios.post("/auth/verifyemail", {
        email,
        code: otp,
      });
      interface ResponseType extends User {
        message: string;
      }
      const data = (await response.data) as ResponseType;

      dispatch(
        updateProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          gender: data.gender,
        })
      );

      closeHandler();
    } catch (error: any) {
      if (error?.fields && error.fields.length > 0) {
        interface FieldErrorPath extends FieldError {
          path: "otp" | "email";
        }
        error.fields.forEach((field: FieldErrorPath) => {
          toast.error(field.message);
        });
      } else {
        toast.error(error?.message || error || "Something went wrong!");
      }
    }

    setLoading(false);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Verify Email Address
                </Dialog.Title>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    We&apos;ve sent you an email with an one time passcode to verify your email address.
                  </p>
                </div>

                <div className="my-8 flex items-center justify-center">
                  <input
                    type="text"
                    className="rounded-md text-indigo-600 font-medium text-center border-indigo-600 tracking-widest w-36"
                    maxLength={6}
                    value={otp}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-0"
                    onClick={submitHandler}
                  >
                    Verify
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-6 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-0"
                    onClick={closeHandler}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default VerifyEmail;
