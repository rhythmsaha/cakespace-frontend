import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Input from "./Input";

const UpdatePasswordComponent = () => {
  const [updatePassword, setUpdatePassword] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const togglePasswordChangeHandler = () => {
    setUpdatePassword((prev) => !prev);
  };

  return (
    <section className="">
      {!updatePassword && (
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              label="Password"
              type="password"
              placeholder="•••••••••••••••••••"
              disabled={!updatePassword}
              error={false}
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

          <button className="rounded-md bg-indigo-600 text-white block px-6 font-medium py-2 mt-4" type="button">
            Update
          </button>
        </div>
      )}
    </section>
  );
};
export default UpdatePasswordComponent;
