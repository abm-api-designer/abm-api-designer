import React from 'react';

import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css";

class SwaggerVisualizer extends React.Component {

  render(){
    return (
      <div>
        <SwaggerUI spec={JSON.stringify(this.props.project)}/>
      </div>
    )
  }

}


export default SwaggerVisualizer;
