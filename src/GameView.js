import React from "react";
import { last } from "lodash";

import "./game.css";

import Deck from "./models/Deck";
import TableuView from "./TableuView";
import FoundationLayer from "./FoundationLayer";

class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.state = {
      piles: this.deck.getPiles(),
      wastePile: this.deck.getWastePile(),
      openPile: this.deck.getOpenPile(),
      foundations: this.deck.getFoundations()
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

  updatePiles(draggedCardId, targetPileNum) {
    let removedCards = this.deck.removeCard(draggedCardId);
    this.deck.addCards(targetPileNum, removedCards);

    this.setState({ piles: this.state.piles });
  }

  drop(targetPileNum, ev) {
    ev.preventDefault();
    let draggedCardId = ev.dataTransfer.getData("id");
    let targetPile = this.state.piles[targetPileNum];
    let lastCardOnPile = targetPile[targetPile.length - 1];
    let draggedCard = this.deck.getCard(draggedCardId);
    let isCardPlayable = draggedCard.canPlayOnTopOf(lastCardOnPile);
    if (isCardPlayable) this.updatePiles(draggedCardId, targetPileNum);
  }

  render() {
    return (
      <div className="game">
        <FoundationLayer
          deck={this.deck}
          drop={this.drop.bind(this)}
          openTopCard={this.openTopCard.bind(this)}
          openCard={last(this.state.openPile)}
          foundations={this.state.foundations}
        />

        <div className="piles">
          <TableuView
            drop={this.drop.bind(this)}
            piles={this.state.piles}
            setInitialOpenCards={this.deck.setInitialOpenCards.bind(this.deck)}
          />
        </div>
      </div>
    );
  }
}

export default GameView;