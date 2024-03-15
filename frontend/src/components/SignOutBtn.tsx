import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export default function SignOutBtn(): React.ReactElement {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => apiClient.signOut(),
    onSuccess: async () => {
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validate-token"] });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center bg-white rounded-md text-blue-600 
            px-3 font-bold hover:bg-gray-300 justify-center min-w-[100px] 
            cursor-pointer"
    >
      Logout
    </div>
  );
}
