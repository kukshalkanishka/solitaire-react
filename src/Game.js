import React from "react";
import "./cardStyle.css";
import deckGenerator from "./deckGenerator";
import { shuffle } from "lodash";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deck = shuffle(deckGenerator());
  }

  render() {
    const deck = this.deck.map(card => (
      <div
        dangerouslySetInnerHTML={{ __html: `${card.unicode}` }}
        className="card"
      />
    ));
    return deck;
  }
}

export default Game;
