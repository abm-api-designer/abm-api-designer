import React from 'react'

class DomainPropertiesBuilder extends React.Component {

  render(){
    return(
      <div>
        <h5>Properties</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Format</th>
            </tr>
          </thead>
          <tr>
            <td>
              <input id="propertyName" className="form-control" placeholder="Ex: Pet" />
            </td>
            <td>
              <select id="propertyType" className="form-select" aria-label="Type of Property">
                <option>select</option>
                <option value="string">String</option>
                <option value="integer">Integer</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
              </select>
            </td>
            <td>
              <select id="propertyFormat" className="form-select" aria-label="Format of Property">
                <option>select</option>
                <option value="string">string</option>
                <option value="integer">integer</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    )
  }

}

export default DomainPropertiesBuilder
