import { InputHTMLAttributes } from "react";
import clsx from "clsx";

const baseInputStyles = clsx(
  "relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5",
  "appearance-none rounded-full border-2 border-solid",
  "before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0",
  "before:rounded-full before:bg-transparent before:opacity-0",
  "before:shadow-[0px_0px_0px_13px_transparent] before:content-['']",
  "after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-['']",
);

const baseLabelStyles = "mt-px inline-block pl-[0.15rem] hover:cursor-pointer";

const RadioButtonVariant = {
  primary: {
    input: clsx(
      baseInputStyles,
      "border-blue-500",
      "checked:border-blue-600",
      "checked:before:opacity-[0.16]",
      "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2",
      "checked:after:h-[0.625rem] checked:after:w-[0.625rem]",
      "checked:after:rounded-full checked:after:border-blue-600",
      "checked:after:bg-blue-600 checked:after:[transform:translate(-50%,-50%)]",
      "hover:cursor-pointer hover:border-blue-600",
      "hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(59,113,202,0.2)]",
      "focus:outline-none focus:ring-0",
      "dark:border-blue-400 dark:checked:border-blue-500",
    ),
    label: clsx(baseLabelStyles, "text-black dark:text-white"),
  },
  secondary: {
    input: clsx(
      baseInputStyles,
      "border-gray-500",
      "checked:border-gray-600",
      "checked:before:opacity-[0.16]",
      "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2",
      "checked:after:h-[0.625rem] checked:after:w-[0.625rem]",
      "checked:after:rounded-full checked:after:border-gray-600",
      "checked:after:bg-gray-600 checked:after:[transform:translate(-50%,-50%)]",
      "hover:cursor-pointer hover:border-gray-600",
      "hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(75,85,99,0.2)]",
      "dark:border-gray-400 dark:checked:border-gray-500",
    ),
    label: clsx(baseLabelStyles, "text-gray-700 dark:text-gray-300"),
  },
  success: {
    input: clsx(
      baseInputStyles,
      "border-green-500",
      "checked:border-green-600",
      "checked:before:opacity-[0.16]",
      "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2",
      "checked:after:h-[0.625rem] checked:after:w-[0.625rem]",
      "checked:after:rounded-full checked:after:border-green-600",
      "checked:after:bg-green-600 checked:after:[transform:translate(-50%,-50%)]",
      "hover:cursor-pointer hover:border-green-600",
      "hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(22,163,74,0.2)]",
      "dark:border-green-400 dark:checked:border-green-500",
    ),
    label: clsx(baseLabelStyles, "text-green-700 dark:text-green-300"),
  },
  error: {
    input: clsx(
      baseInputStyles,
      "border-red-500",
      "checked:border-red-600",
      "checked:before:opacity-[0.16]",
      "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2",
      "checked:after:h-[0.625rem] checked:after:w-[0.625rem]",
      "checked:after:rounded-full checked:after:border-red-600",
      "checked:after:bg-red-600 checked:after:[transform:translate(-50%,-50%)]",
      "hover:cursor-pointer hover:border-red-600",
      "hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(220,38,38,0.2)]",
      "dark:border-red-400 dark:checked:border-red-500",
    ),
    label: clsx(baseLabelStyles, "text-red-700 dark:text-red-300"),
  },
};

export interface IRadioButton extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label: string;
  variant?: keyof typeof RadioButtonVariant;
}

export const RadioButton = ({
  name,
  label,
  id,
  variant = "primary",
  ...props
}: IRadioButton) => {
  return (
    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
      <input
        id={id || `radio-${name}`}
        type="radio"
        value=""
        name={name ? name : label}
        className={RadioButtonVariant[variant].input}
        {...props}
      />
      <label
        className={RadioButtonVariant[variant].label}
        htmlFor={id || `radio-${name}`}
      >
        {label}
      </label>
    </div>
  );
};
