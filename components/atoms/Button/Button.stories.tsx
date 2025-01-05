import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "menu", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    text: "Primary Button",
  },
};
export const Menu: Story = {
  args: {
    variant: "menu",
    size: "medium",
    text: "menu Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    text: "Secondary Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    size: "medium",
    text: "Success Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    size: "medium",
    text: "Warning Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    size: "medium",
    text: "Danger Button",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
    text: "Large Button",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    text: "Small Button",
  },
};
