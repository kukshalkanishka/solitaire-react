import React from "react";
import { flattenDeep, remove } from "lodash";
import Piles from "./Piles";

class PilesView extends React.Component {
  constructor(props) {
    super(props);
    this.piles = new Piles(this.props.deck);
    this.state = { piles: this.piles.getPiles() };
  }

  getCardJSX(card) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `${card.unicode}`
        }}
        className="card"
        draggable="true"
        onDragStart={this.drag.bind(this)}
        id={card.id}
        key={card.id}
        style={{ color: `${card.color}` }}
      />
    );
  }

  getCard(id) {
    let flatStack = flattenDeep(this.state.piles);
    let card = flatStack.filter(card => card.id == id);
    return card[0];
  }

  drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
  }

  drop(pileNum, ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("id");
    let pile = this.state.piles[pileNum];
    let lastCardOnPile = pile[pile.length - 1];
    let isPlayable = this.getCard(id).canPlayOnTopOf(lastCardOnPile);
    if (isPlayable) {
      let draggedCard = this.getCard(id);
      this.piles.removeCard(id);
      this.piles.addCard(pileNum, draggedCard);

      this.setState({ piles: this.piles.getPiles() });
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  getPileView(pileJSX, pileNum) {
    return (
      <div
        key={pileNum}
        id={pileNum}
        onDrop={this.drop.bind(this, pileNum)}
        onDragOver={this.allowDrop.bind(this)}
      >
        {pileJSX}
      </div>
    );
  }

  render() {
    this.piles.setInitialOpenCards();
    let pilesView = [];
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      let pileView = [];
      let cardsInPile = this.state.piles[pileNum].length;
      for (let cardNum = 0; cardNum < cardsInPile; cardNum++) {
        let card = this.state.piles[pileNum][cardNum];
        let cardJSX = this.getCardJSX(card);
        if (card.isOpen) {
          pileView.push(cardJSX);
        }
      }
      pilesView.push(this.getPileView(pileView, pileNum));
    }
    return pilesView;
  }
}

export default PilesView;
