import type { Meta, StoryObj } from "@storybook/react";
import { ButtonList } from "./ButtonList";

const meta = {
  title: "Molecules/ButtonList",
  component: ButtonList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["vertical", "inline"],
      description: "Layout direction of the list",
      defaultValue: "vertical",
    },
    buttonVariant: {
      control: "select",
      options: ["primary", "menu", "secondary", "success", "warning", "danger"],
      description: "Style variant for buttons",
      defaultValue: "menu",
    },
    listItems: {
      control: "object",
      description: "Array of items (buttons, radio buttons, or checkboxes)",
    },
  },
} satisfies Meta<typeof ButtonList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for different list types
const buttonItems = [
  {
    text: "Profile",
    onClick: () => console.log("Profile clicked"),
  },
  {
    text: "Settings",
    onClick: () => console.log("Settings clicked"),
  },
  {
    text: "Messages",
    onClick: () => console.log("Messages clicked"),
    disabled: true,
  },
];

const radioItems = [
  {
    name: "radio-group",
    label: "Option 1",
    type: "radio",
  },
  {
    name: "radio-group",
    label: "Option 2",
    type: "radio",
  },
  {
    name: "radio-group",
    label: "Option 3",
    type: "radio",
    disabled: true,
  },
];

const checkboxItems = [
  {
    label: "Remember me",
    name: "remember",
  },
  {
    label: "Subscribe to newsletter",
    name: "subscribe",
  },
  {
    label: "Agree to terms",
    name: "terms",
    disabled: true,
  },
];

export const ButtonsList: Story = {
  args: {
    listItems: buttonItems,
    variant: "vertical",
    buttonVariant: "menu",
  },
};

export const RadioButtonsList: Story = {
  args: {
    listItems: radioItems,
    variant: "vertical",
  },
};

export const CheckboxList: Story = {
  args: {
    listItems: checkboxItems,
    variant: "vertical",
  },
};

export const InlineButtons: Story = {
  args: {
    listItems: buttonItems,
    variant: "inline",
    buttonVariant: "primary",
  },
};

export const InlineRadioButtons: Story = {
  args: {
    listItems: radioItems,
    variant: "inline",
  },
};

export const InlineCheckboxes: Story = {
  args: {
    listItems: checkboxItems,
    variant: "inline",
  },
};
