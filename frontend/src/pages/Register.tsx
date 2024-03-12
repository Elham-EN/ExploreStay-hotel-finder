import React from "react";
import { useForm } from "react-hook-form";
import RegisterFormData from "../types/RegisterUser";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register(): React.ReactElement {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  //  mutations are typically used to create data or perform server side-effects.
  const mutation = useMutation({
    mutationFn: (newData: RegisterFormData) => {
      return apiClient.registerUser(newData);
    },
    onSuccess: () => {
      showToast({ message: "User registered successfully", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 px-4">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <label className="text-gray-700 font-bold flex-1" htmlFor="">
          First Name
          <input
            type="text"
            className="border rounded-md w-full py-1 px-2"
            {...register("firstname", { required: "This field is required" })}
          />
          {errors.firstname && (
            <span className="text-red-500">{errors.firstname.message}</span>
          )}
        </label>
        <label className="text-gray-700 font-bold flex-1" htmlFor="">
          Last Name
          <input
            type="text"
            className="border rounded-md w-full py-1 px-2"
            {...register("lastname", { required: "This field is required" })}
          />
          {errors.lastname && (
            <span className="text-red-500">{errors.lastname.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 font-bold flex-1" htmlFor="">
        Email
        <input
          type="email"
          className="border rounded-md w-full py-1 px-2"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>
      <label className="text-gray-700 font-bold flex-1" htmlFor="">
        Password
        <input
          type="password"
          className="border rounded-md w-full py-1 px-2"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-bold flex-1" htmlFor="">
        Confirm Password
        <input
          type="password"
          className="border rounded-md w-full py-1 px-2"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <span className="">
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded font-bold 
            hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
}
