import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Molecules/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "success", "warning", "danger"],
      description: "Style variant for the input",
      defaultValue: "primary",
    },
    width: {
      control: "select",
      options: ["w-full", "w-1/2", "w-1/3"],
      description: "Width of the input",
      defaultValue: "w-full",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    label: {
      control: "text",
      description: "Label for the input field",
    },
    errorMessage: {
      control: "text",
      description: "Error message displayed below the input",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryInput: Story = {
  args: {
    variant: "primary",
    label: "Primary Input",
    placeholder: "Enter text",
    width: "w-full",
  },
};
export const PasswrodInput: Story = {
  args: {
    variant: "primary",
    label: "Password Input",
    placeholder: "Enter text",
    width: "w-full",
    type: "password",
  },
};

export const SecondaryInput: Story = {
  args: {
    variant: "secondary",
    label: "Secondary Input",
    placeholder: "Enter text",
    width: "w-1/2",
  },
};

export const SuccessInput: Story = {
  args: {
    variant: "success",
    label: "Success Input",
    placeholder: "Enter text",
    errorMessage: "This is a success message.",
  },
};

export const WarningInput: Story = {
  args: {
    variant: "warning",
    label: "Warning Input",
    placeholder: "Enter text",
    errorMessage: "This is a warning message.",
  },
};

export const DangerInput: Story = {
  args: {
    variant: "danger",
    label: "Danger Input",
    placeholder: "Enter text",
    errorMessage: "This is an error message.",
  },
};
