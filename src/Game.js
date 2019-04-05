import React from "react";
import "./game.css";
import deckGenerator from "./deckGenerator";
import { shuffle } from "lodash";
import PilesView from "./PilesView";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deck = shuffle(deckGenerator());
    this.wastePile = this.deck.splice(0, 24);
  }
  render() {
    return (
      //   <div>
      //     <div>
      //       hi
      //       <div className="foundation" />
      //     </div>
      //       //tableu
      <div className="piles">
        <PilesView deck={this.deck} />
      </div>
    );
  }
}

export default Game;
