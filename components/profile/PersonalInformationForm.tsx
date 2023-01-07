import Input from "./Input";
import { FieldError, useForm } from "react-hook-form";
import type { User } from "../../types/userTypes";
import { toast } from "react-hot-toast";
import { axios } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import SectionHeading from "./SectionHeading";
import { updateProfile } from "../../store/slices/auth/slice";

interface FieldErrorPath extends FieldError {
  path: "firstName" | "lastName" | "gender";
}

const PersonalInformationForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  const submitHandler = async ({ firstName, lastName, gender }: User) => {
    if (isSubmitting) return;
    toast.dismiss();

    try {
      const response = await axios.put("/auth/profile", {
        firstName,
        lastName,
        gender,
      });

      interface ResponseType extends User {
        message: string;
      }

      const data = (await response.data) as ResponseType;
      dispatch(
        updateProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          email: data.email,
        })
      );

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
    <section className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <SectionHeading heading="Personal Information" paragraph="Specify your personal details." />
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="overflow-hidden shadow-md rounded-lg">
            <div className="bg-white px-4 py-5 sm:p-6">
              <section className="space-y-4">
                <Input
                  label="First Name"
                  defaultValue={user?.firstName}
                  {...register("firstName", {
                    required: "First Name is required!",
                  })}
                />

                <Input
                  label="Last Name"
                  defaultValue={user?.lastName}
                  {...register("lastName", {
                    required: "Last Name is required!",
                  })}
                />
              </section>

              <section className="mt-6">
                <fieldset>
                  <legend className="contents text-base font-medium text-gray-700">Gender</legend>
                  <div className="mt-2 flex gap-6">
                    <div className="flex gap-2 items-center">
                      <input
                        id="push-everything"
                        type="radio"
                        value="male"
                        defaultChecked={user?.gender === "male"}
                        {...register("gender", {
                          required: "Gender is required!",
                        })}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-transparent transition cursor-pointer"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Male
                      </label>
                    </div>

                    <div className="flex gap-2 items-center">
                      <input
                        {...register("gender", {
                          required: "Gender is required!",
                        })}
                        id="push-email"
                        type="radio"
                        value={"female"}
                        defaultChecked={user?.gender === "female"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-transparent transition cursor-pointer"
                      />
                      <label htmlFor="push-email" className="block text-sm font-medium text-gray-700 cursor-pointer">
                        Female
                      </label>
                    </div>

                    <div className="flex gap-2 items-center">
                      <input
                        id="push-nothing"
                        value={"other"}
                        type="radio"
                        defaultChecked={user?.gender === "other"}
                        {...register("gender", {
                          required: "Gender is required!",
                        })}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-transparent transition cursor-pointer"
                      />
                      <label htmlFor="push-nothing" className="block text-sm font-medium text-gray-700 cursor-pointer">
                        Other
                      </label>
                    </div>
                  </div>
                </fieldset>
              </section>

              <section className="mt-6 text-right">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 py-2.5 px-8 text-sm font-medium text-white hover:bg-indigo-500 active:bg-indigo-600 transition w-full xl:w-auto"
                >
                  Save
                </button>
              </section>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default PersonalInformationForm;
