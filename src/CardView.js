import React from "react";
import "./game.css";

class CardView extends React.Component {
  constructor(props) {
    super(props);
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
    if (this.props.card && this.props.card.isOpen) {
      return this.getOpenCardView(this.props.card);
    }
    return this.getClosedCardView();
  }
}

export default CardView;
