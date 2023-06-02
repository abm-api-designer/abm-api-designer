import SwaggerUI from "swagger-ui-react";
import { ProjectContext } from "../App";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerDisplay() {
  return (
    <ProjectContext.Consumer>
      {({ project }) => (
        <div>
          <SwaggerUI spec={project} />
        </div>
      )}
    </ProjectContext.Consumer>
  );
}
