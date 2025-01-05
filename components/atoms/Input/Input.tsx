import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

const inputVariant = {
  primary:
    "pt-5 p-3 bg-blue-600/[.06] border-b-4 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-600/[.06] dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",
  secondary:
    "pt-5 p-3 bg-gray-100/[.06] border-b-4 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-800/[.06] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500",
  success:
    "pt-5 p-3 bg-green-600/[.06] border-b-4 border-green-500 text-green-700 text-sm rounded-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700/[.06] dark:border-green-600 dark:text-green-400 dark:focus:ring-green-500 dark:focus:border-green-500",
  warning:
    "pt-5 p-3 bg-orange-600/[.06] border-b-4 border-orange-500 text-orange-700 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700/[.06] dark:border-orange-600 dark:text-orange-400 dark:focus:ring-orange-500 dark:focus:border-orange-500",
  danger:
    "pt-5 p-3 bg-red-600/[.06] border-b-4 border-red-500 text-red-700 text-sm rounded-sm focus:ring-red-500 focus:border-red-500 dark:bg-gray-700/[.06] dark:border-red-600 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500",
};

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  width?: "w-full" | "w-1/2" | "w-1/3";
}

export const Input = ({
  variant = "primary",
  width = "w-full",
  placeholder = "",
  label,
  errorMessage,
  ...props
}: IInput) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={clsx(inputVariant[variant], width, "focus:outline-none")}
        placeholder={placeholder}
        {...props}
      />
      {errorMessage && (
        <span className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
