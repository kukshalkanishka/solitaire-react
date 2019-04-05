import { last, remove } from "lodash";

class Foundations {
  constructor(wastePile) {
    this.foundations = [[], [], [], []];
    this.wastePile = wastePile;
    this.openPile = [];
  }

  getFoundations() {
    return this.foundations;
  }

  getWastePile() {
    return this.wastePile;
  }

  getOpenPile() {
    return this.openPile;
  }

  getCardFromOpenPile(id) {
    return this.openPile.find(card => card.id == id);
  }

  getCardFromFoundation(id) {
    let requiredPile = this.foundations.find(pile =>
      pile.find(card => card.id == id)
    );
    return last(requiredPile);
  }

  getCard(id) {
    let card = this.getCardFromOpenPile(id);
    if (!card) {
      card = this.getCardFromFoundation(id);
    }
    return card;
  }

  addCards(pileNum, removedCards) {
    this.foundations[pileNum] = this.foundations[pileNum].concat(removedCards);
  }

  removeCard(draggedCardId) {
    let removedCards = this.getCardFromOpenPile(draggedCardId);
    if (!removedCards) {
      removedCards = this.getCardFromFoundation(draggedCardId);
      this.foundations.forEach(pile =>
        remove(pile, card => card.id == draggedCardId)
      );
    }
    remove(this.openPile, card => card.id == draggedCardId);
    return removedCards;
  }

  openWastePileCard() {
    if (this.wastePile.length == 0) {
      this.wastePile = this.openPile.slice();
      this.openPile = [];
      return;
    }
    let card = last(this.wastePile);
    card.setIsOpen();
    this.openPile.push(card);
    this.wastePile.pop();
  }

  isCardPlayable(draggedCard, targetPileNum) {
    let lastCardOfPile = last(this.foundations[targetPileNum]);
    return draggedCard.canPlayBelow(lastCardOfPile);
  }
}

export default Foundations;
