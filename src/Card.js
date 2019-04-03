class Card {
  constructor(suite, color, cardNum, unicode, id) {
    this.suite = suite;
    this.color = color;
    this.cardNum = cardNum;
    this.unicode = unicode;
    this.id = id;
  }

  canPlayOnTopOf(card) {
    return card.color != this.color && this.cardNum + 1 == card.cardNum;
  }
}

export default Card;
