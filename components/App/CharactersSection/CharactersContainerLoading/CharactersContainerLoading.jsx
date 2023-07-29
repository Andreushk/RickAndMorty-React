/* import React */
import React from "react";

/* import styles */
import "./CharactersContainerLoading.css";


export class CharactersContainerLoading extends React.Component { 

  render() {
    return (
      <div className="characters__loader-section">
        <div className="loader"><div></div><div></div><div></div></div>
      </div>
    );
  };

};