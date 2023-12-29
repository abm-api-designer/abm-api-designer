import { userEvent, within } from "@storybook/testing-library";

export const UI_ANIMATION_DELAY_MILLIS = 30;

export async function enterInputValue(
  canvasElement: HTMLElement,
  testId: string,
  value: string
) {
  const canvas = within(canvasElement);
  const field = canvas.getByTestId(testId);
  await userEvent.type(field, value, { delay: UI_ANIMATION_DELAY_MILLIS });
}
