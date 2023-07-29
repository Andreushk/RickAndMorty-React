/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharacterModalData.css";


export class CharacterModalData extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      origin: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
    }),
  };

  render() {
    return (
      <React.Fragment>
        <div className="character-modal__img">
          <img src={ this.props.data.image } alt={`${this.props.data.name} image`} />
          <div></div>
        </div>
        <div className="character-modal__info">
          <div>
            <h2>Name:</h2>
            <p> {this.props.data.name} </p>
          </div>
          <div>
            <h2>Origin:</h2>
            <p> {this.props.data.origin} </p>
          </div>
          <div>
            <h2>Status:</h2>
            <p> {this.props.data.status} </p>
          </div>
          <div>
            <h2>Location:</h2>
            <p> {this.props.data.location} </p>
          </div>
          <div>
            <h2>Species:</h2>
            <p> {this.props.data.species} </p>
          </div>
          <div>
            <h2>Gender:</h2>
            <p> {this.props.data.gender} </p>
          </div>
        </div>
      </React.Fragment>
    );
  };

};