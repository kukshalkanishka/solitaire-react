import React from "react";
import { flattenDeep, remove } from "lodash";

class Piles extends React.Component {
  constructor(props) {
    super(props);
    this.deck = props.deck;
    this.state = { piles: this.setPiles() };
  }

  setPiles() {
    let piles = new Array(7).fill(0).map(() => []);
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      for (let cardPos = 0; cardPos <= pileNum; cardPos++) {
        let card = this.deck.pop();
        piles[pileNum].push(card);
      }
    }
    this.wastePile = this.deck.slice();
    return piles;
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

  removeCard(id) {
    this.state.piles.forEach(pile =>
      remove(pile, function(card) {
        return card.id == id;
      })
    );
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
      this.removeCard(id);
      this.setState(state => {
        state.piles[pileNum].push(draggedCard);
        return { piles: state.piles };
      });
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  getPileJSX(pileJSX, pileNum) {
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

  setInitialOpenCards() {
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      let pile = this.state.piles[pileNum];
      let lastCardOnPile = pile[pile.length - 1];
      if (lastCardOnPile) lastCardOnPile.setIsOpen();
    }
  }

  render() {
    this.setInitialOpenCards();
    let pilesJSX = [];
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      let pileJSX = [];
      let cardsInPile = this.state.piles[pileNum].length;
      for (let cardNum = 0; cardNum < cardsInPile; cardNum++) {
        let card = this.state.piles[pileNum][cardNum];
        let cardJSX = this.getCardJSX(card);
        if (card.isOpen) {
          pileJSX.push(cardJSX);
        }
      }
      pilesJSX.push(this.getPileJSX(pileJSX, pileNum));
    }
    return pilesJSX;
  }
}

export default Piles;
