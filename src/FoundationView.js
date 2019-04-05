import React from "react";

import "./game.css";
import CardView from "./CardView";

class FoundationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unwantedPile: this.props.unwantedPile
    };
  }

  render() {
    return (
      <div className="foundation">
        <CardView card={{ isOpen: false }} />
        <CardView card={{ isOpen: false }} />
      </div>
    );
  }
}

export default FoundationView;
