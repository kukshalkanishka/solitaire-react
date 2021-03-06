import deckGenerator from "./deckGenerator";
import { shuffle, last, remove } from "lodash";
import Tableu from "./Tableu";
import Foundations from "./Foundations";

class Deck {
  constructor() {
    this.deck = shuffle(deckGenerator());
    this.tableu = new Tableu(this.deck.slice(0, 28));
    this.foundations = new Foundations(this.deck.slice(28));
  }

  openWastePileCard() {
    this.foundations.openWastePileCard();
  }

  getPiles() {
    return this.tableu.getPiles();
  }

  getWastePile() {
    return this.foundations.getWastePile();
  }

  getOpenPile() {
    return this.foundations.getOpenPile();
  }

  getFoundations() {
    return this.foundations.getFoundations();
  }

  isCardPlayable(draggedCard, targetPileNum) {
    if (targetPileNum.toString().startsWith("_")) {
      return this.foundations.isCardPlayable(
        draggedCard,
        targetPileNum.slice(1)
      );
    }
    return this.tableu.isCardPlayable(draggedCard, targetPileNum);
  }

  getCard(id) {
    let card = this.tableu.getCard(id);
    if (!card) {
      card = this.foundations.getCard(id);
    }
    return card;
  }

  setInitialOpenCards() {
    this.tableu.setInitialOpenCards();
  }

  removeCard(draggedCardId) {
    let removedCards = this.tableu.removeCard(draggedCardId);
    if (removedCards.length == 0) {
      removedCards = this.foundations.removeCard(draggedCardId);
    }
    return removedCards;
  }

  addCards(targetPileNum, cards) {
    if (targetPileNum.toString().startsWith("_")) {
      this.foundations.addCards(targetPileNum.slice(1), cards);
      return;
    }
    this.tableu.addCards(targetPileNum, cards);
  }
}

export default Deck;
