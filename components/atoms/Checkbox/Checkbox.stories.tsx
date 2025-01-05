import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Name attribute for the radio button",
      defaultValue: undefined,
    },
    label: {
      control: "text",
      description: "Label text for the radio button",
      required: true,
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "error"],
      description: "Visual style variant of the radio button",
      defaultValue: "primary",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio button is disabled",
      defaultValue: false,
    },
    checked: {
      control: "boolean",
      description: "Controls the checked state of the radio button",
      defaultValue: false,
    },
    round: {
      control: "boolean",
      description: "Control the borderd of the box ",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "radio-primary",
    label: "Primary Radio",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    name: "radio-secondary",
    label: "Secondary Radio",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    name: "radio-success",
    label: "Success Radio",
    variant: "success",
  },
};

export const Error: Story = {
  args: {
    name: "radio-error",
    label: "Error Radio",
    variant: "error",
  },
};

export const Checked: Story = {
  args: {
    name: "radio-checked",
    label: "Checked Radio",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: "radio-disabled",
    label: "Disabled Radio",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    name: "radio-disabled-checked",
    label: "Disabled Checked Radio",
    disabled: true,
    checked: true,
  },
};

export const LongLabel: Story = {
  args: {
    name: "radio-long-label",
    label:
      "This is a very long label text to demonstrate how the radio button handles wrapping of longer content in its label",
  },
};
