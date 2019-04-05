import React from "react";
import "./game.css";

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { card: this.props.card };
  }

  drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
  }

  getOpenCardView(card) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `${card.unicode}`
        }}
        className="card"
        draggable="true"
        onDragStart={this.drag.bind(this)}
        id={card.id}
        key={card.id}
        style={{
          color: `${card.color}`
        }}
      />
    );
  }

  getClosedCardView() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: "&#x1F0A0"
        }}
        className="card"
      />
    );
  }

  render() {
    if (this.state.card.isOpen) {
      return this.getOpenCardView(this.state.card);
    }
    return this.getClosedCardView();
  }
}

export default CardView;
