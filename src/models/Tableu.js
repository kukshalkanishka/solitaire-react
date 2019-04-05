import { flattenDeep, last } from "lodash";

class Tableu {
  constructor(pilesCards) {
    this.pilesCards = pilesCards;
    this.piles = this.createInitialPiles();
  }

  createInitialPiles() {
    let piles = [];
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      piles.push(this.pilesCards.splice(0, pileNum + 1));
    }
    return piles;
  }

  getCard(cardId) {
    let flatStack = flattenDeep(this.piles);
    return flatStack.find(card => card.id == cardId);
  }

  addCards(pileNum, removedCards) {
    this.piles[pileNum] = this.piles[pileNum].concat(removedCards);
  }

  getPiles() {
    return this.piles;
  }

  isCardPlayable(draggedCard, targetPileNum) {
    let lastCardOnPile = last(this.piles[targetPileNum]);
    return draggedCard.canPlayOnTopOf(lastCardOnPile);
  }

  setInitialOpenCards() {
    for (let pileNum = 0; pileNum < 7; pileNum++) {
      let pile = this.piles[pileNum];
      let lastCardOnPile = pile[pile.length - 1];
      if (lastCardOnPile) {
        lastCardOnPile.setIsOpen();
      }
    }
  }

  removeCard(cardId) {
    let requiredPile = this.piles.find(pile =>
      pile.find(card => card.id == cardId)
    );
    if (requiredPile) {
      let cardIndex = requiredPile.findIndex(card => card.id == cardId);
      return requiredPile.splice(cardIndex);
    }
    return [];
  }
}

export default Tableu;
