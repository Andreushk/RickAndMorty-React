/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import events */
import { appEvents, hideBackToTopButton } from "../../../events/events.js";

/* import styles */
import "./BackToTop.css";


export class BackToTop extends React.Component {

  static propTypes = {
    removeButton: PropTypes.func.isRequired,
  };

  state = {
    isVisible: false,
  };

  timerID = null;

  componentDidMount() {
    appEvents.addListener(hideBackToTopButton, this.hideBackToTopButton);

    this.timerID = setTimeout(() => {
      clearTimeout(this.timerID);
      this.setState({isVisible: true});
    }, 50);
  };

  componentWillUnmount() {
    appEvents.removeListener(hideBackToTopButton, this.hideBackToTopButton);
  };

  hideBackToTopButton = () => {
    this.setState({isVisible: false});
    this.timerID = setTimeout(() => this.props.removeButton(), 350);
  };

  scrollToTop = () => {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({top: 0, behavior: "smooth"});
    } else {
      window.scrollTo(0, 0);
    };
  };

  render() {
    return (
      <div className={`back-to-top__button ${this.state.isVisible && "bttb-active"}`}>
        <button className="back-to-top-btn" type="button" onClick={this.scrollToTop}>Back To Top</button>
      </div>
    );
  };

};