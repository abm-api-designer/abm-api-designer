import React from 'react'

class CustomTooltip extends React.Component {

  render() {
    return (
      <span className="bi bi-info-circle-fill tt-container">
        <div className="t-text">{this.props.text}</div>
      </span>
    )
  }

}

export default CustomTooltip
