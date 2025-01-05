import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label: string;
  variant?: keyof typeof checkboxVariant;
  round?: boolean;
}

const baseInputStyles = (round: boolean = false) =>
  clsx(
    "relative appearance-none border-2 border-solid h-6 w-6",
    round ? "rounded-full" : "rounded-md", // Adjust shape
    "checked:bg-blue-600 checked:border-blue-600",
    "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
    "checked:after:border-white checked:after:border-r-2 checked:after:border-b-2",
    "checked:after:rotate-45 checked:after:h-[12px] checked:after:w-[6px]",
  );

const baseLabelStyles =
  "ml-3 text-lg font-medium text-gray-900 dark:text-gray-300";

const checkboxVariant = {
  primary: {
    input: clsx(
      baseInputStyles(false),
      "border-blue-500",
      "hover:border-blue-600",
    ),
    label: clsx(baseLabelStyles),
  },
  secondary: {
    input: clsx(
      baseInputStyles(false),
      "border-gray-500",
      "hover:border-gray-600",
    ),
    label: clsx(baseLabelStyles, "text-gray-700 dark:text-gray-400"),
  },
  success: {
    input: clsx(
      baseInputStyles(false),
      "border-green-500",
      "hover:border-green-600",
    ),
    label: clsx(baseLabelStyles, "text-green-700 dark:text-green-300"),
  },
  error: {
    input: clsx(
      baseInputStyles(false),
      "border-red-500",
      "hover:border-red-600",
    ),
    label: clsx(baseLabelStyles, "text-red-700 dark:text-red-300"),
  },
};

export const Checkbox = ({
  name,
  label,
  id,
  variant = "primary",
  round = false,
  ...props
}: ICheckbox) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        id={id || `checkbox-${name}`}
        type="checkbox"
        value=""
        name={name ? name : label}
        className={clsx(baseInputStyles(round), checkboxVariant[variant].input)}
        {...props}
      />
      <label
        className={checkboxVariant[variant].label}
        htmlFor={id || `checkbox-${name}`}
      >
        {label}
      </label>
    </div>
  );
};
