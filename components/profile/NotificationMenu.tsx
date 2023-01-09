import { FieldError, useForm } from "react-hook-form";
import CheckbocInput from "./CheckbocInput";
import SectionHeading from "./SectionHeading";
import { useState, useEffect } from "react";
import { axios } from "../../utils";
import { toast } from "react-hot-toast";

interface FieldErrorPath extends FieldError {
  path: "email_account" | "email_orders" | "email_offers" | "push_orders" | "push_offers";
}

interface NotificationSettings {
  email_account: boolean;
  email_orders: boolean;
  email_offers: boolean;
  push_orders: boolean;
  push_offers: boolean;
}

const NotificationMenu = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NotificationSettings>();

  useEffect(() => {
    const func = async () => {
      try {
        const response = await axios.get("/auth/notificationsettings");

        const data = (await response.data) as NotificationSettings;

        setValue("email_account", data.email_account);
        setValue("email_offers", data.email_offers);
        setValue("email_orders", data.email_orders);
        setValue("push_offers", data.push_offers);
        setValue("push_orders", data.push_orders);
      } catch (error: any) {
        setValue("email_account", false);
        setValue("email_offers", false);
        setValue("email_orders", false);
        setValue("push_offers", false);
        setValue("push_orders", false);
      }
    };

    func();
  }, []);

  const submitHandler = async ({
    email_account,
    email_offers,
    email_orders,
    push_offers,
    push_orders,
  }: NotificationSettings) => {
    if (isSubmitting) return;
    toast.dismiss();

    try {
      const response = await axios.put("/auth/notificationsettings", {
        email_account,
        email_offers,
        email_orders,
        push_offers,
        push_orders,
      });

      interface ResponseType extends NotificationSettings {
        message: string;
      }

      const data = (await response.data) as ResponseType;
      setValue("email_account", data.email_account);
      setValue("email_offers", data.email_offers);
      setValue("email_orders", data.email_orders);
      setValue("push_offers", data.push_offers);
      setValue("push_orders", data.push_orders);

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
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <SectionHeading
            heading="Notifications"
            paragraph=" Decide which communications you'd like to receive and how."
          />
        </div>

        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="overflow-hidden shadow-lg shadow-gray-200 border border-gray-100 rounded-xl md:p-2">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <fieldset>
                  <legend className="contents text-base font-medium text-gray-900">By Email</legend>
                  <p className="text-sm text-gray-500">These will be delivered to your email address</p>

                  <div className="mt-4 space-y-5">
                    <CheckbocInput
                      label="Orders"
                      paragraph="Get notified for updates regarding your orders."
                      {...register("email_orders")}
                      // defaultChecked={notificationSettings?.email_orders}
                    />
                    <CheckbocInput
                      label="Offers"
                      paragraph="Get notified when offers and discounts are available."
                      {...register("email_offers")}
                      // defaultChecked={notificationSettings?.email_offers}
                    />
                    <CheckbocInput
                      label="Account"
                      paragraph="Get notified for changes in your account."
                      {...register("email_account")}
                      // defaultChecked={notificationSettings?.email_account}
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
                  <p className="text-sm text-gray-500">These are delivered via push notifications.</p>
                  <div className="mt-4 space-y-4">
                    <div className="mt-4 space-y-5">
                      <CheckbocInput
                        label="Orders"
                        paragraph="Get notified for updates regarding your orders."
                        {...register("push_orders")}
                        // defaultChecked={notificationSettings?.push_orders}
                      />
                      <CheckbocInput
                        label="Offers"
                        paragraph="Get notified when offers and discounts are available."
                        {...register("push_offers")}
                        // defaultChecked={notificationSettings?.push_offers}
                      />
                    </div>
                  </div>
                </fieldset>

                <section className="mt-6 text-right">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 py-2.5 px-8 text-sm font-medium text-white hover:bg-indigo-500 active:bg-indigo-600 transition w-full md:w-auto"
                  >
                    Save
                  </button>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NotificationMenu;
