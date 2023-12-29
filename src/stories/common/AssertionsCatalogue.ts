import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { SimpleServerVariable } from "../../components/servers/ServerURLVariables";

export async function assertInputValue(
  canvasElement: HTMLElement,
  testId: string,
  expectedValue: string
) {
  const canvas = within(canvasElement);
  const actual = await canvas.getByTestId(testId).getAttribute("value");
  await expect(expectedValue).toEqual(actual);
}

export const assertElementIsVisible = async (
  canvasElement: HTMLElement,
  testId: string
) => {
  const canvas = within(canvasElement);
  const foundElement = await canvas.findByTestId(testId);
  await expect(foundElement).toBeInTheDocument();
};

export async function assertTextAreaValue(
  canvasElement: HTMLElement,
  testId: string,
  expectedValue: string
) {
  const canvas = within(canvasElement);
  const actual = await canvas.getByTestId(testId).innerHTML;
  await expect(expectedValue).toEqual(actual);
}

export async function assertServerVariables(data: SimpleServerVariable[]) {
  await expect(data.length).toEqual(1);
  const variable = data[0];
  await expect(variable.name).toEqual("");
  await expect(variable.type).toEqual(1);
  await expect(variable.description).toEqual("");
  await expect(variable.default).toEqual("");
}

export const assertAddServerFormIsReset = async (
  canvasElement: HTMLElement
) => {
  await assertInputValue(canvasElement, "server-name", "");
  await assertInputValue(canvasElement, "server-url", "");
};
