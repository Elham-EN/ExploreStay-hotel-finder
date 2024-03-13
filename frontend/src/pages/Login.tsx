import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormData } from "../types/LoginUser";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export default function Login(): React.ReactElement {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation({
    mutationFn: (newData: LoginFormData) => {
      return apiClient.loginUser(newData);
    },
    onSuccess: () => {
      showToast({ message: "Sign in Succcessfull", type: "SUCCESS" });
      navigate("/");
      // instructing React Query to mark the validate-token query as invalid
      // and refetch toaken validation
      queryClient.invalidateQueries({ queryKey: ["validate-token"] });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: LoginFormData) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 px-4">
      <h2 className="text-4xl font-bold">Sign In</h2>
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
      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded font-bold 
            hover:bg-blue-500 text-xl"
      >
        Login
      </button>
      <p className="mt-10">
        Don't have an Account?{" "}
        <span className="font-semibold text-blue-800">
          <Link to={"/register"}>Sign up here</Link>
        </span>
      </p>
    </form>
  );
}
