import SwaggerUI from "swagger-ui-react";
import { ProjectContext } from "../App";

export default function SwaggerDisplay() {
  return (
    <ProjectContext.Consumer>
      {({ project }) => (
        <>
          <SwaggerUI spec={JSON.stringify(project)} />
        </>
      )}
    </ProjectContext.Consumer>
  );
}
