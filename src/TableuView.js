import React from "react";
import CardView from "./CardView";
import "./game.css";

class TableuView extends React.Component {
  allowDrop(ev) {
    ev.preventDefault();
  }

  getPileView(cardsView, pileNum) {
    return (
      <div
        key={pileNum}
        id={pileNum}
        onDrop={this.props.drop.bind(null, pileNum)}
        onDragOver={this.allowDrop.bind(this)}
        className="pile"
      >
        {cardsView}
      </div>
    );
  }

  render() {
    this.props.setInitialOpenCards();
    return this.props.piles.map((pile, pileNum) => {
      let cardsView = pile.map(card => {
        return <CardView card={card} />;
      });
      return this.getPileView(cardsView, pileNum);
    });
  }
}

export default TableuView;
