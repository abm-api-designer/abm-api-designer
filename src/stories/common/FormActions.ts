import { userEvent, within } from "@storybook/testing-library";

export const clickButton = async (
  canvasElement: HTMLElement,
  testId: string
) => {
  const canvas = within(canvasElement);
  const button = canvas.getByTestId(testId);
  await userEvent.click(button);
};
