import { ReactElement, useEffect } from "react";
import { clsx } from "clsx";

interface ToastProps {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps): ReactElement {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      // Reset the timer, whenever the component is closed
      clearTimeout(timer);
    };
  }, [onClose]);

  const toastStyles = clsx(
    "fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md",
    {
      "bg-green-600": type === "SUCCESS",
      "bg-red-600": type === "ERROR",
    }
  );

  return (
    <div className={toastStyles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
}
