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

  getCard(id) {
    return this.openPile.find(card => card.id == id);
  }

  removeCard(draggedCardId) {
    let removedCards = [this.openPile.find(card => card.id == draggedCardId)];
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
}

export default Foundations;
