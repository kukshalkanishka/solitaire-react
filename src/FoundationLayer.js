import React from "react";
import { last } from "lodash";

import "./game.css";
import CardView from "./CardView";
import Card from "./models/Card";

class FoundationView extends React.Component {
  allowDrop(ev) {
    ev.preventDefault();
  }

  render() {
    return (
      <div
        onDrop={this.props.drop.bind(null, "_" + this.props.pileNum)}
        onDragOver={this.allowDrop.bind(this)}
        id={"_" + this.props.pileNum}
      >
        <CardView card={this.props.lastCard} />
      </div>
    );
  }
}

class FoundationsView extends React.Component {
  render() {
    let foundations = this.props.foundations.map((pile, pileNum) => (
      <FoundationView
        pileNum={pileNum}
        lastCard={last(pile)}
        drop={this.props.drop}
      />
    ));
    return <div className="foundationPiles"> {foundations}</div>;
  }
}

class FoundationLayer extends React.Component {
  render() {
    return (
      <div className="foundation">
        <div className="wasteCardPiles">
          <div className="card" onClick={this.props.openTopCard} />
          <CardView card={this.props.openCard} />
        </div>
        <FoundationsView
          foundations={this.props.foundations}
          drop={this.props.drop}
        />
      </div>
    );
  }
}

export default FoundationLayer;
