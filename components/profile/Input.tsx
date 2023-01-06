import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: () => {};
}

const Input: FC<Props> = ({ label, name, register, ...rest }) => {
  return (
    <div className="">
      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
        First name
      </label>
      <input
        type="text"
        name="first-name"
        id="first-name"
        autoComplete="given-name"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};
export default Input;
