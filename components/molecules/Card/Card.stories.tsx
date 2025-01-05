import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    imageUrl: {
      control: "text",
      description: "Image URL",
    },
    title: {
      constrol: "text",
      description: "card title",
    },
    text: {
      control: "text",
      description: "card text",
    },
    alt: {
      control: "text",
      description: "alt text",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    imageUrl: "https://picsum.photos/500/500",
    title: "title",
    text: "text",
    alt: "text",
    callToAction: <></>,
  },
};
export const CardWithButton: Story = {
  args: {
    imageUrl: "https://picsum.photos/500/500",
    title: "Lorem Ipsum ",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. rised in the 1960Lorem Ipsum",
    alt: "text",
    callToAction: <Button text={"Click me "} />,
  },
};
