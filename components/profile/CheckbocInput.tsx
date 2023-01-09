/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  paragraph: String;
  error?: any;
}

const CheckbocInput = forwardRef<HTMLInputElement, Props>(({ label, paragraph, ...rest }, ref) => {
  const id = useId();

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-transparent transition cursor-pointer"
          {...rest}
        />
      </div>

      <div className="text-sm leading-none ">
        <label htmlFor={id} className="font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
        <p className="text-gray-500 mt-1.5">{paragraph}</p>
      </div>
    </div>
  );
});

export default CheckbocInput;
