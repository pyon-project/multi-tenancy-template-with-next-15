import { Button, IButton } from "@/components/atoms/Button";
import {
  RadioButton,
  IRadioButton,
} from "@/components/atoms/RadioButton/RadioButton";
import { Checkbox, ICheckbox } from "@/components/atoms/Checkbox/Checkbox";
import clsx from "clsx";

interface ButtonListProps {
  listItems: IButton[] | ICheckbox[] | IRadioButton[];
  variant?: "vertical" | "inline";
  buttonVariant?: IButton["variant"];
  className?: string;
  gap?: number;
}

export const ButtonList = ({
  listItems,
  variant = "vertical",
  buttonVariant = "menu",
  gap = 10,
}: ButtonListProps) => {
  return (
    <ul
      className={clsx(`text-sm font-medium rounded-lg gap-${gap}`, {
        "flex flex-col": variant === "vertical",
        "flex flex-row flex-wrap ": variant === "inline",
      })}
    >
      {Array.isArray(listItems) &&
        listItems.map((item, index) => (
          <li
            key={index}
            className={clsx(variant === "vertical" ? "w-full" : "w-fit")}
          >
            {"text" in item ? (
              <Button
                onClick={item.onClick}
                disabled={item.disabled}
                variant={buttonVariant}
                text={item.text}
              />
            ) : "label" in item ? (
              "type" in item && item.type === "radio" ? (
                <RadioButton {...item} />
              ) : (
                <Checkbox {...item} />
              )
            ) : null}
          </li>
        ))}
    </ul>
  );
};
