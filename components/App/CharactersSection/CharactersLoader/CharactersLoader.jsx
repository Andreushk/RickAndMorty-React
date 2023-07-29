/* import React */
import React from "react";

/* import styles */
import "./CharactersLoader.css";


export class CharactersLoader extends React.Component { 

  render() {
    return (
      <section className="characters__loading-section">
        <div className="loader"><div></div><div></div><div></div></div>
      </section>
    );
  };

};