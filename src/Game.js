import React from "react";
import { flattenDeep, last } from "lodash";

import "./game.css";

import Deck from "./Deck";
import FoundationView from "./FoundationView";
import TableuView from "./TableuView";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.tableu = this.deck.getTableu();
    this.state = {
      piles: this.tableu.getPiles(),
      wastePile: this.deck.getWastePile(),
      openPile: this.deck.getOpenPile()
    };
  }

  openTopCard() {
    this.deck.openWastePileCard();
    this.setState(state => {
      state.wastePile = this.deck.getWastePile();
      state.openPile = this.deck.getOpenPile();
      return state;
    });
  }

  getCard(id) {
    let flatStack = flattenDeep(this.state.piles);
    let card = flatStack.filter(card => card.id == id);
    return card[0];
  }

  updatePiles(draggedCardId, targetPileNum) {
    let removedCards = this.tableu.removeCard(draggedCardId);
    this.tableu.addCard(targetPileNum, removedCards);

    this.setState({ piles: this.state.piles });
  }

  drop(targetPileNum, ev) {
    ev.preventDefault();
    let draggedCardId = ev.dataTransfer.getData("id");
    let targetPile = this.state.piles[targetPileNum];
    let lastCardOnPile = targetPile[targetPile.length - 1];
    let isCardPlayable = this.getCard(draggedCardId).canPlayOnTopOf(
      lastCardOnPile
    );
    if (isCardPlayable) this.updatePiles(draggedCardId, targetPileNum);
  }

  render() {
    return (
      <div className="game">
        <FoundationView
          deck={this.deck}
          openTopCard={this.openTopCard.bind(this)}
          openCard={last(this.state.openPile)}
        />

        <div className="piles">
          <TableuView
            tableu={this.state.tableu}
            drop={this.drop.bind(this)}
            piles={this.state.piles}
            setInitialOpenCards={this.tableu.setInitialOpenCards}
          />
        </div>
      </div>
    );
  }
}

export default Game;
