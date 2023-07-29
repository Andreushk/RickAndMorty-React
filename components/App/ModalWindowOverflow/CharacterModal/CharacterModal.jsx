/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharacterModal.css";

/* import necessary components */
import { CharacterModalLoader } from "./CharacterModalLoader/CharacterModalLoader.jsx";
import { CharacterModalError } from "./CharacterModalError/CharacterModalError.jsx";
import { CharacterModalData } from "./CharacterModalData/CharacterModalData.jsx";


export class CharacterModal extends React.Component {

  constructor() {
    super();
    this.controller = new AbortController();
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  state = {
    isLoading: true,
    characterData: null,

    error: {
      isError: false,
      errorMessage: null,
    },
  };

  settingsForFetch = {
    URLForFetch: "https://rickandmortyapi.com/api/character/",
    timerIDForAbort: null,
    userCloseModal: false,
  };

  errorMessages = {
    abort: "The wait time is over, maybe the server is overloaded. Try again later.",
    default: "There was an error. Try again later.",
  };

  stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  componentDidMount() {
    this.requestCharacterData();
  };

  componentWillUnmount() {
    this.settingsForFetch.userCloseModal = true;
    this.controller.abort();
  };

  requestCharacterData = async () => {

    try {
      const signal = this.controller.signal;

      this.settingsForFetch.timerIDForAbort = setTimeout(() => {
        this.controller.abort();
      }, 8000);

      const response = await fetch(`${this.settingsForFetch.URLForFetch + this.props.id}`, {signal});
      const data = await response.json();

      clearTimeout(this.settingsForFetch.timerIDForAbort);
      this.putCharacterDataInState(data);

    } catch(error) {
      if (error.name === "AbortError" && this.settingsForFetch.userCloseModal) return;

      if (error.name === "AbortError") {
        console.warn(error);
        this.setState({isLoading: false, error: {isError: true, errorMessage: this.errorMessages.abort}});
      } else {
        console.warn(error);
        this.setState({isLoading: false, error: {isError: true, errorMessage: this.errorMessages.default}});
      }
    };

  };

  putCharacterDataInState = (data) => {
    const characterData = {
      name: data.name,
      image: data.image,
      location: data.location.name,
      origin: data.origin.name,
      species: data.species,
      status: data.status,
      gender: data.gender,
    };

    this.setState({isLoading: false, characterData: characterData});
  };

  render() {
    return (
      <div className="character-modal" onClick={this.stopPropagation}>
        <div className="character-modal__body">
          { this.state.isLoading && <CharacterModalLoader/> }
          { this.state.error.isError && <CharacterModalError message={this.state.error.errorMessage} /> }
          { this.state.characterData && <CharacterModalData data={this.state.characterData}/> }
        </div>
      </div>
    );
  };

};