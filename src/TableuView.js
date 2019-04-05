import React from "react";
import { flattenDeep } from "lodash";
import CardView from "./CardView";
import "./game.css";

class TableuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { piles: this.props.tableu.getPiles() };
    this.tableu = this.props.tableu;
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
    this.tableu.setInitialOpenCards();
    return this.state.piles.map((pile, pileNum) => {
      let cardsView = pile.map(card => {
        return <CardView card={card} />;
      });
      return this.getPileView(cardsView, pileNum);
    });
  }
}

export default TableuView;
