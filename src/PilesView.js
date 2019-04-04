import React from "react";
import { flattenDeep, remove } from "lodash";
import Piles from "./Piles";
import CardView from "./CardView";
import "./pilesStyle.css";

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

  getPileView(pileView, pileNum) {
    return (
      <div
        key={pileNum}
        id={pileNum}
        onDrop={this.drop.bind(this, pileNum)}
        onDragOver={this.allowDrop.bind(this)}
        className="pile"
      >
        {pileView}
      </div>
    );
  }

  drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
  }

  render() {
    this.piles.setInitialOpenCards();
    let pilesView = [];
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      let pileView = [];
      let cardsInPile = this.state.piles[pileNum].length;
      for (let cardNum = 0; cardNum < cardsInPile; cardNum++) {
        let card = this.state.piles[pileNum][cardNum];

        let cardJSX = <CardView card={card} />;
        pileView.push(cardJSX);
      }
      pilesView.push(this.getPileView(pileView, pileNum));
    }
    return pilesView;
  }
}

export default PilesView;
