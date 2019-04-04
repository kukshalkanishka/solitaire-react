import { remove } from "lodash";

class Piles {
  constructor(deck) {
    this.deck = deck;
    this.piles = this.createInitialPiles();
  }

  createInitialPiles() {
    let piles = [];
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      piles.push(this.deck.splice(0, pileNum + 1));
    }
    this.wastePile = this.deck.slice();
    return piles;
  }

  addCard(pileNum, card) {
    this.piles[pileNum].push(card);
  }

  getPiles() {
    return this.piles;
  }

  setInitialOpenCards() {
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      let pile = this.piles[pileNum];
      let lastCardOnPile = pile[pile.length - 1];
      if (lastCardOnPile) lastCardOnPile.setIsOpen();
    }
  }
  removeCard(id) {
    this.piles.forEach(pile =>
      remove(pile, function(card) {
        return card.id == id;
      })
    );
  }
}

export default Piles;
