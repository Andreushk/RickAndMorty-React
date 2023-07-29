/* import React */
import React from "react";

/* import events */
import { appEvents, showBackToTopButton, hideBackToTopButton } from "../../../events/events.js";

/* import necessary components */
import { CharactersContainerLoading } from "./CharactersContainerLoading/CharactersContainerLoading.jsx";
import { CharactersSectionError } from "./CharactersSectionError/CharactersSectionError.jsx";
import { CharactersContainer } from "./CharactersContainer/CharactersContainer.jsx";
import { CharactersLoader } from "./CharactersLoader/CharactersLoader.jsx";


export class CharactersSection extends React.Component {

  state = {
    isContainerFirstLoad: true,

    isСharactersDataNowLoading: false,
    isСharactersDataLoaded: false,

    paginationPage: 1,
    charactersData: [],

    error: {
      isError: false,
      errorMessage: null,
    },
  };

  settings = {
    scrollEventListener: null,
    timerIDForDebounce: null,

    isBackToTopButtonOnPage: false,
  };

  fetchSettings = {
    URLForFetch: "https://rickandmortyapi.com/api/character/?page=",
    isNowFetching: false,
    timerIDForAbort: null,
  };

  errorMessages = {
    abort: "The wait time is over, maybe the server is overloaded. Try again later.",
    default: "There was an error. Try again later.",
  };

  shouldComponentUpdate(newProps, newState) {
    if (newState !== this.state) return true;
    return false;
  };

  componentDidMount() {
    this.getDataAboutCharacters();

    this.settings.scrollEventListener = this.debounce(this.checkScroll, 100).bind(this);
    window.addEventListener("scroll", this.settings.scrollEventListener);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.settings.scrollEventListener);
  };

  debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(this.settings.timerIDForDebounce);
      this.settings.timerIDForDebounce = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  checkScroll = (e) => {
    e.preventDefault();
  
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollFromTop = window.scrollY;
    const footerHeight = document.getElementsByTagName("footer")[0].offsetHeight;

    if (scrollFromTop > 300 && !this.settings.isBackToTopButtonOnPage) {
      this.settings.isBackToTopButtonOnPage = true;
      appEvents.emit(showBackToTopButton);
    };

    if (scrollFromTop < 300 && this.settings.isBackToTopButtonOnPage) {
      this.settings.isBackToTopButtonOnPage = false;
      appEvents.emit(hideBackToTopButton);
    };

    if (scrollFromTop + windowHeight + footerHeight/2 >= documentHeight) {
      this.fetchSettings.isNowFetching ? null : this.getDataAboutCharacters();      
    };
  
  };

  getDataAboutCharacters = async () => {

    try {

      if (this.state.paginationPage !== 1) {
        this.setState({isСharactersDataNowLoading: true});
      };

      const data = await this.requestCharactersData();
      if (data.status === "error") throw data.error;
      this.putCharactersDataInState(data.response.results);

    } catch(error) {

      if (error.name === "AbortError") {
        console.warn(error);
        this.setState({error: {isError: true, errorMessage: this.errorMessages.abort}, isContainerFirstLoad: false, isСharactersDataNowLoading: false});
      } else {
        console.warn(error);
        this.setState({error: {isError: true, errorMessage: this.errorMessages.default}, isContainerFirstLoad: false, isСharactersDataNowLoading: false});
      };

    };

  };

  requestCharactersData = async () => {

    try {
      this.fetchSettings.isNowFetching = true;

      const controller = new AbortController();
      const signal = controller.signal;

      this.fetchSettings.timerIDForAbort = setTimeout(() => {
        controller.abort();
      }, 8000);

      const response = await fetch(`${this.fetchSettings.URLForFetch}+${this.state.paginationPage}`, {signal});
      const data = await response.json();
      
      clearTimeout(this.fetchSettings.timerIDForAbort);
      return {status: "ok", response: data};

    } catch(error) {
      return {status: "error", error};
    } finally {
      this.fetchSettings.isNowFetching = false;
    };

  };

  putCharactersDataInState = (data) => {
    const characterDataCopy = [...this.state.charactersData];

    data.forEach(character => {
      const characterDataObject = {id: character.id, name: character.name, image: character.image};
      characterDataCopy.push(characterDataObject);
    });

    this.setState((prevState) => ({
      charactersData: characterDataCopy,
      isСharactersDataNowLoading: false,
      isContainerFirstLoad: false, 
      isСharactersDataLoaded: true, 
      paginationPage: prevState.paginationPage+1,
    }));
  };

  render() {
    return (
      <section className="characters">
        { this.state.isContainerFirstLoad && <CharactersContainerLoading /> }
        { this.state.error.isError && <CharactersSectionError errorMessage={this.state.error.errorMessage} /> }
        { this.state.isСharactersDataLoaded && <CharactersContainer charactersData={this.state.charactersData} /> }
        { this.state.isСharactersDataNowLoading && <CharactersLoader /> }
      </section>
    );
  };

};