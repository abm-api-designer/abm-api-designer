import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./how-to-use.css";

export default function HowToUse() {
  return (
    <>
      <h1>Designer</h1>
      <Button
        style={{ marginBottom: "3%", fontWeight: "bold" }}
        fullWidth
        variant="contained"
        component={Link}
        to="/project"
      >
        Start Designing
      </Button>
      <Button fullWidth variant="contained" style={{ fontWeight: "bold" }}>
        Upload Spec
      </Button>
      <h2>API Design Flow</h2>
      <p style={{ textAlign: "justify" }}>
        The API Design flow to be followed using API Designer starts with
        creation of dependent entities. Below is the order of flow :
      </p>
      <ol style={{ textAlign: "left" }}>
        <li>
          <h4>Basic Config</h4>
          <p>
            You start with basic project configurations configuring below
            details
          </p>
          <ul className="feature-details">
            <li>
              <b>Project: </b>
              Create a project
            </li>
            <li>
              <b>License: </b>
              Define License Info for the Project
            </li>
            <li>
              <b>Tags: </b>
              Create Tags for API categorization
            </li>
            <li>
              <b>Servers: </b>
              Define API servers like Dev, Staging, Production, etc.
            </li>
          </ul>
        </li>
        <li>
          <h4>Components</h4>
          <p>
            Creating resuable components will help in reducing redundancy and
            efforts. In this section you can create below mentioned components
          </p>
          <ul className="feature-details">
            <li>
              <b>Models: </b>
              Define Domain Models for the Project
            </li>
            <li>
              <b>Parameters: </b>
              Define API Parameters like Path, Query, Header, etc.
            </li>
            <li>
              <b>Request Bodies: </b>
              Define the structure of Request Body for API
            </li>
            <li>
              <b>Responses: </b>
              Define the standard responses for the APIs
            </li>
          </ul>
        </li>
        <li>
          <h4>API Specs</h4>
          <p>
            Now you are ready with pre-requisites. You can start designing API
            Resources by clubbing them
          </p>
          <ul className="feature-details">
            <li>
              <b>API Resources: </b>
              Create APIs defining the API resource Endpoints
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
}
