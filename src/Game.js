import React from "react";
import "./cardStyle.css";
import "./pilesStyle.css";
import deckGenerator from "./deckGenerator";
import { shuffle } from "lodash";
import PilesView from "./PilesView";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deck = shuffle(deckGenerator());
    this.wastePile = [];
  }

  render() {
    return (
      <div className="piles">
        <PilesView deck={this.deck} />
      </div>
    );
  }
}

export default Game;
