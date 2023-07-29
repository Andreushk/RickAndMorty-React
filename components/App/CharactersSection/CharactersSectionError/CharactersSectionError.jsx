/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharactersSectionError.css";


export class CharactersSectionError extends React.Component {

  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(newProps, newState) {
    if (newProps.errorMessage !== this.props.errorMessage) return true;
    return false;
  };

  render() {
    return (
      <div className="characters__error-section">
        <p> {this.props.errorMessage} </p>
      </div>
    );
  };

};