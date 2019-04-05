import deckGenerator from "./deckGenerator";
import { shuffle, last, flattenDeep } from "lodash";
import Tableu from "./Tableu";

class Deck {
  constructor() {
    this.deck = shuffle(deckGenerator());
    this.tableu = new Tableu(this.deck.slice(0, 28));
    this.wastePile = this.deck.slice(24);
    this.openPile = [];
  }

  removeCardFromOpenPile(draggedCardId) {
    let draggedCard = this.openPile.find(card => card.id == draggedCardId);
    this.openPile.remove(card => card.id == draggedCardId);
    return draggedCard;
  }

  getTableu() {
    return this.tableu;
  }

  getWastePile() {
    return this.wastePile;
  }

  getOpenPile() {
    return this.openPile;
  }

  getCard(id) {
    let flatStack = flattenDeep(this.piles);
    let card = flatStack.find(card => card.id == id);
    if (!card) {
      card = this.openPile.find(card => card.id == id);
    }
    return card;
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

export default Deck;
