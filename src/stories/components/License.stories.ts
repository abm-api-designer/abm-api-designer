import { Meta, StoryObj } from "@storybook/react";
import License from "../../components/License";
import { createContext } from "react";

const meta = {
  title: "Components/License",
  component: License,
} satisfies Meta<typeof License>;

export default meta;

type Story = StoryObj<typeof meta>;

const MockProjectContext = createContext({});

export const Default: Story = {};
