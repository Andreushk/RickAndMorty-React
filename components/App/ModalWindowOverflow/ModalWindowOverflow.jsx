/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import events */
import { appEvents, closeCharacterModal } from "../../../events/events.js";

/* import necessary components */
import { CharacterModal } from "./CharacterModal/CharacterModal.jsx";

/* import styles */
import "./ModalWindowOverflow.css";


export class ModalWindowOverflow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  closeModalWindow = (e) => {
    e.preventDefault();
    appEvents.emit(closeCharacterModal);
  };

  render() {
    return (
      <section className="overflow" onClick={this.closeModalWindow}>
        <CharacterModal id={this.props.id} />
      </section>
    );
  };

};