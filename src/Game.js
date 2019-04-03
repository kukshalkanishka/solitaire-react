import React from "react";
import "./cardStyle.css";
import "./pilesStyle.css";
import deckGenerator from "./deckGenerator";
import { shuffle } from "lodash";
import Piles from "./Piles";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deck = shuffle(deckGenerator());
    this.wastePile = [];
  }

  render() {
    return (
      <div className="piles">
        <Piles deck={this.deck} />
      </div>
    );
  }
}

export default Game;
