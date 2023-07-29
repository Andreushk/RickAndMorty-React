/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharacterCard.css";


export class CharacterCard extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  };

  shouldComponentUpdate(newProps, newState) {
    if (newProps.data !== this.props.data) return true;
    return false;
  };

  render() {
    return (
      <div className="characters__item" data-id={this.props.data.id}>
        <div>
          <img src={this.props.data.image} alt={`${this.props.data.name} image`} />
        </div>
        <h1> {this.props.data.name} </h1>
      </div>
    );
  };

};