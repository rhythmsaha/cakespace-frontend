/* eslint-disable react/display-name */
import { FC, InputHTMLAttributes, useId, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
  register?: () => {};
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, type, error, ...rest }, ref) => {
  const id = useId();

  return (
    <div className="space-y-1 ">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type || "text"}
        id={id}
        ref={ref}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 ${
          error
            ? "focus:border-red-500 focus:outline-none focus:ring-red-600 border-red-500"
            : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300"
        }`}
        {...rest}
      />

      {error && <span className="px-1 text-xs text-red-600">{error.message}</span>}
    </div>
  );
});
export default Input;
