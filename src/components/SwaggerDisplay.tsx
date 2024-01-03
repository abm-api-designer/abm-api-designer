import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useAppSelector } from "../data/hooks";

export default function SwaggerDisplay() {
  const project = useAppSelector((state) => state);
  return (
    <div>
      <SwaggerUI spec={project} />
    </div>
  );
}
