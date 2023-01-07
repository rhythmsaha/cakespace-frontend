import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Input from "./Input";
import SectionHeading from "./SectionHeading";

const LoginInfoForm = () => {
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const toggleEmailChangeHandler = () => {
    setUpdateEmail((prev) => !prev);
  };

  const togglePasswordChangeHandler = () => {
    setUpdatePassword((prev) => !prev);
  };

  return (
    <section className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <SectionHeading
          heading="Login Information"
          paragraph="Specify or update your email and password for login process."
        />
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="overflow-hidden shadow-md rounded-lg">
          <div className="bg-white px-4 py-5 sm:p-6 space-y-6">
            <section className="">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input label="Email Address" type="email" defaultValue={user?.email} disabled={!updateEmail} />
                </div>

                {!updateEmail && (
                  <button
                    className="rounded-md bg-indigo-600 text-white block px-6 font-medium py-2 mt-4"
                    type="button"
                    onClick={toggleEmailChangeHandler}
                  >
                    Change
                  </button>
                )}
              </div>

              {updateEmail && (
                <div className="flex items-center justify-end gap-4">
                  <button
                    onClick={toggleEmailChangeHandler}
                    className="rounded-md bg-red-600 text-white block px-6 font-medium py-2 mt-4"
                    type="button"
                  >
                    Cancel
                  </button>

                  <button
                    className="rounded-md bg-indigo-600 text-white block px-6 font-medium py-2 mt-4"
                    type="button"
                  >
                    Update
                  </button>
                </div>
              )}
            </section>

            <section className="">
              {!updatePassword && (
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="•••••••••••••••••••"
                      disabled={!updatePassword}
                    />
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

              {updatePassword && (
                <div className="space-y-2">
                  <Input label="Current Password" type="password" autoComplete="off" disabled={!updatePassword} />
                  <Input label="New Password" type="password" autoComplete="off" disabled={!updatePassword} />
                  <Input label="Confirm Password" type="password" autoComplete="off" disabled={!updatePassword} />
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

                  <button
                    className="rounded-md bg-indigo-600 text-white block px-6 font-medium py-2 mt-4"
                    type="button"
                  >
                    Update
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginInfoForm;
