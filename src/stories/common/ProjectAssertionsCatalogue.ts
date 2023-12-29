import { expect } from "@storybook/jest";
import { ProjectInfoPayload } from "../../data/payload/ProjectInfoPayload";

export default function assertProjectInfoPayload(actual: ProjectInfoPayload) {
  expect(actual.title).toEqual("My first project");
  expect(actual.description).toEqual("The demo project for testing storybook");
  expect(actual.version).toEqual("1.2.1");
  expect(actual.termsOfService).toEqual("http://www.cman.com/terms");
  expect(actual.contactEmail).toEqual("helpdesk@clinicmanagement.com");
}
