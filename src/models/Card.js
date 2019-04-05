class Card {
  constructor(suite, color, cardNum, unicode, id) {
    this.suite = suite;
    this.color = color;
    this.cardNum = cardNum;
    this.unicode = unicode;
    this.id = id;
    this.isOpen = false;
  }

  canPlayOnTopOf(card) {
    if (card) {
      return card.color != this.color && this.cardNum + 1 == card.cardNum;
    }
    return this.cardNum == 13;
  }

  canPlayBelow(card) {
    if (card) {
      return card.color == this.color && this.cardNum - 1 == card.cardNum;
    }
    return this.cardNum == 1;
  }

  setIsOpen() {
    this.isOpen = true;
  }
}

export default Card;
