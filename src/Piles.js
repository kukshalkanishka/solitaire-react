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

  addCard(pileNum, removedCards) {
    this.piles[pileNum] = this.piles[pileNum].concat(removedCards);
  }

  getPiles() {
    return this.piles;
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
    let cardIndex = requiredPile.findIndex(card => card.id == cardId);
    return requiredPile.splice(cardIndex);
  }
}

export default Piles;
