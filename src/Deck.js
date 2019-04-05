import deckGenerator from "./deckGenerator";
import { shuffle } from "lodash";
import Tableu from "./Tableu";

class Deck {
  constructor() {
    this.deck = shuffle(deckGenerator());
    this.tableu = new Tableu(this.deck.slice(0, 28));
    this.wastePile = this.deck.slice();
  }
  getTableu() {
    return this.tableu;
  }
}

export default Deck;
