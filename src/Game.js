import React from "react";
import "./cardStyle.css";
import "./pilesStyle.css";
import deckGenerator from "./deckGenerator";
import { shuffle, flattenDeep, remove } from "lodash";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deck = shuffle(deckGenerator());
    this.state = { piles: this.setPiles() };
    this.wastePile = [];
  }

  setPiles() {
    let piles = new Array(7).fill(0).map(() => []);
    for (let stackPos = 0; stackPos < 7; stackPos++) {
      for (let cardNum = 0; cardNum <= stackPos; cardNum++) {
        piles[stackPos].push(this.deck.pop());
      }
    }
    this.wastePile = this.deck.slice();
    return piles;
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

  getCardJSX(card, pileNum) {
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

  render() {
    let pilesJSX = [];
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      let pileJSX = [];
      let cardsInPile = this.state.piles[pileNum].length;
      for (let cardNum = 0; cardNum < cardsInPile; cardNum++) {
        let card = this.state.piles[pileNum][cardNum];
        let cardJSX = this.getCardJSX(card, pileNum);
        pileJSX.push(cardJSX);
      }
      pilesJSX.push(
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
    return <div className="piles">{pilesJSX}</div>;
  }
}

export default Game;
