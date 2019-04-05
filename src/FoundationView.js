import React from "react";
import { last } from "lodash";

import "./game.css";
import CardView from "./CardView";

class FoundationView extends React.Component {
  render() {
    return (
      <div className="foundation">
        <div className="card" onClick={this.props.openTopCard} />
        <CardView card={this.props.openCard} />
      </div>
    );
  }
}

export default FoundationView;
