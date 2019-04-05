import React from "react";

import "./game.css";

import Deck from "./Deck";
import FoundationView from "./FoundationView";
import TableuView from "./TableuView";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.tableu = this.deck.getTableu();
  }
  render() {
    return (
      <div className="game">
        <FoundationView wastePile={this.deck.wastePile} />
        <div className="piles">
          <TableuView tableu={this.tableu} />
        </div>
      </div>
    );
  }
}

export default Game;

{
  /* //     </div>
        <div>
      //     <div>
      //       hi
      //       <div className="foundation" />
      //     </div>
      //       //tableu */
}
