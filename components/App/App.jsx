/* import React */
import React from "react";

/* import events */
import { appEvents, showBackToTopButton, showCharacterModal, closeCharacterModal } from "../../events/events.js";

/* import necessary components */
import { Header } from "./Header/Header.jsx";
import { CharactersSection } from "./CharactersSection/СharactersSection.jsx";
import { Footer } from "./Footer/Footer.jsx";
import { ModalWindowOverflow } from "./ModalWindowOverflow/ModalWindowOverflow.jsx";
import { BackToTop } from "./BackToTop/BackToTop.jsx";


export class App extends React.Component {

  state = {
    isBackToTopButtonRender: false,
    characterIDForModal: null,
  };

  componentDidMount() {
    appEvents.addListener(showBackToTopButton, this.showBackToTopButton);
    appEvents.addListener(showCharacterModal, this.showCharacterModal);
    appEvents.addListener(closeCharacterModal, this.removeCharacterModal);
  };

  componentWillUnmount() {
    appEvents.removeListener(showBackToTopButton, this.showBackToTopButton);
    appEvents.removeListener(showCharacterModal, this.showCharacterModal);
    appEvents.removeListener(closeCharacterModal, this.removeCharacterModal);
  };

  showBackToTopButton = () => {
    this.setState({isBackToTopButtonRender: true});
  };

  removeBackToTopButton = () => {
    this.setState({isBackToTopButtonRender: false});
  };

  showCharacterModal = (id) => {
    this.setState({characterIDForModal: id});
  };

  removeCharacterModal = () => {
    this.setState({characterIDForModal: null});
  };

  render() {
    return (
      <React.Fragment>
        { this.state.characterIDForModal && <ModalWindowOverflow id={this.state.characterIDForModal}/> }
        <Header />
        <CharactersSection />
        <Footer />
        { this.state.isBackToTopButtonRender && <BackToTop removeButton={this.removeBackToTopButton} /> }
      </React.Fragment>
    );
  };
};