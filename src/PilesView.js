import React from "react";
import { flattenDeep, remove } from "lodash";
import Piles from "./Piles";
import CardView from "./CardView";
import "./game.css";

class PilesView extends React.Component {
  constructor(props) {
    super(props);
    this.piles = new Piles(this.props.deck);
    this.state = { piles: this.piles.getPiles() };
  }

  getCard(id) {
    let flatStack = flattenDeep(this.state.piles);
    let card = flatStack.filter(card => card.id == id);
    return card[0];
  }

  updatePiles(draggedCardId, targetPileNum) {
    let removedCards = this.piles.removeCard(draggedCardId);
    this.piles.addCard(targetPileNum, removedCards);

    this.setState({ piles: this.piles.getPiles() });
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

  allowDrop(ev) {
    ev.preventDefault();
  }

  getPileView(cardsView, pileNum) {
    return (
      <div
        key={pileNum}
        id={pileNum}
        onDrop={this.drop.bind(this, pileNum)}
        onDragOver={this.allowDrop.bind(this)}
        className="pile"
      >
        {cardsView}
      </div>
    );
  }

  drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
  }

  render() {
    this.piles.setInitialOpenCards();
    return this.state.piles.map((pile, pileNum) => {
      let cardsView = pile.map((card, cardNum) => {
        return <CardView card={card} cardNum={cardNum} />;
      });
      return this.getPileView(cardsView, pileNum);
    });
  }
}

export default PilesView;
