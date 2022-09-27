import { UserIcon } from "@heroicons/react/24/outline";

interface Props {
  size: "sm" | "md" | "lg";
}

const Avatar = ({ size = "sm" }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <UserIcon
        className={`${size === "sm" ? "h-5 w-5" : size === "md" ? "h-6 w-6" : size === "lg" ? "h-7 w-7" : "h-5 w-5"}`}
      />
      <p className="text-xs font-semibold text-gray-600 leading-none">Profile</p>
    </div>
  );
};
export default Avatar;
