/* import React */
import React from "react";

/* import styles */
import "./CharacterModalLoader.css";


export class CharacterModalLoader extends React.Component {
  
  render() {
    return (
      <div className="character-modal__loader">
        <div className="loader"><div></div><div></div><div></div></div>
      </div>
    );
  };

};