import React, { Component } from 'react';
import img from "./img/Fluffex.png"
export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <img src={img} id="bg" alt="" style={{ height: "100%", width: "100%", position: 'fixed', top: 56, left: 0}}/>
      )
  }
}
