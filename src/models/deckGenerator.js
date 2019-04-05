import Card from "./Card";

const deckGenerator = function() {
  let deck = [];
  let cardSuites = [
    { suit: "Spades", color: "Black", unicode: "&#x1F0A" },
    { suit: "Hearts", color: "Red", unicode: "&#x1F0B" },
    { suit: "Diamond", color: "Red", unicode: "&#x1F0C" },
    { suit: "Club", color: "Black", unicode: "&#x1F0D" }
  ];
  for (let suitNum = 0; suitNum < 4; suitNum++) {
    for (let cardNum = 1; cardNum < 14; cardNum++) {
      let suite = cardSuites[suitNum];
      let hexString = cardNum.toString(16);
      if (cardNum >= 12) {
        hexString = (cardNum + 1).toString(16);
      }
      deck.push(
        new Card(
          suite.suit,
          suite.color,
          cardNum,
          suite.unicode + hexString,
          suitNum + "_" + cardNum
        )
      );
    }
  }
  return deck;
};

export default deckGenerator;
