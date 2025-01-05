import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
const buttonVariant = {
  primary:
    "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  menu: "text-white hover:bg-teal-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  secondary:
    "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  success:
    "text-white bg-gradient-to-br from-green-700 to-green-300 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  warning:
    "text-white bg-gradient-to-br from-yellow-600 to-orange-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  danger:
    "text-white bg-gradient-to-br from-red-600 to-red-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
};
const buttonSize = {
  small: "text-sm px-3 py-1.5",
  medium: "text-md px-5 py-2.5",
  large: "text-lg px-6 py-3",
};

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "menu" | "secondary" | "success" | "warning" | "danger";
  text: string;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
}

export const Button = ({
  variant = "primary",
  size = "medium",
  text,
  icon,
  ...props
}: IButton) => {
  return (
    <button
      className={clsx(buttonVariant[variant], buttonSize[size])}
      aria-label={text}
      {...props}
    >
      {text} {icon && <span className="me-2">{icon}</span>}
    </button>
  );
};
