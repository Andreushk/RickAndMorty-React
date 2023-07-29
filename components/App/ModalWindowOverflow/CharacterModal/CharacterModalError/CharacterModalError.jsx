/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharacterModalError.css";


export class CharacterModalError extends React.Component {
  
  static propTypes = {
    message: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="character-modal__message">
        <p> {this.props.message} </p>
      </div>
    );
  };

};