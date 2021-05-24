import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import "./components/assets/Home.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route
            exact
            path="/"
            render={(props) => {
              return <Home />;
            }}
          />
          <Route
            exact
            path="/game"
            render={(props) => {
              return <Game />;
            }}
          />
        </Router>
      </div>
    )
  }
}

