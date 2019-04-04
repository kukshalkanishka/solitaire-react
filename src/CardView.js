import React from "react";

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { card: this.props.card };
  }

  drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
  }

  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `${this.state.card.unicode}`
        }}
        className="card"
        draggable="true"
        onDragStart={this.drag.bind(this)}
        id={this.state.card.id}
        key={this.state.card.id}
        style={{ color: `${this.state.card.color}` }}
      />
    );
  }
}

export default CardView;


// drop(pileNum, ev) {
//   ev.preventDefault();
//   let id = ev.dataTransfer.getData("id");
//   let dragStartPile = this.state.piles[id];
//   let droppedCard = dragStartPile[dragStartPile.length - 1];
//   let targetPile = this.state.piles[pileNum];
//   let lastCardOnPile = targetPile[targetPile.length - 1];
//   let isCardPlayable = droppedCard.canPlayOnTopOf(lastCardOnPile);
//   if (isCardPlayable) {
//     this.piles.removeCard(droppedCard.id);
//     this.piles.addCard(pileNum, droppedCard);

//     this.setState({ piles: this.piles.getPiles() });
//   }
// }