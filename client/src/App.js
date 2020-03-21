import React, { Component } from "react";
import io from "socket.io-client";
import TotaliserBackground from "./TotaliserBackground";
import TotaliserText from "./TotaliserText";

let socket;

class App extends Component {
  constructor() {
    super();
    this.state = {
      today: 0,
      yesterday: 0
    };
  }


  //hey there it the cloning and git pushing stufff
  

  componentDidMount() {
    socket = io("/", { query: { store: this.props.store } });
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("disconnect", reason => {
      console.log("Disconnected");
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
    socket.on("todaysTotal", total => {
      this.setState({ today: total });
    });
    socket.on("yesterdaysTotal", total => {
      this.setState({ yesterday: total });
    });
  }

  componentWillUnmount() {
    if (socket) socket.close();
  }

  render() {
    return (
      <>
        <TotaliserBackground totals={this.state} />
        <TotaliserText
          totals={this.state}
          currencySymbol={this.props.store.includes("us") ? "$" : "£"}
        />
      </>
    );
  }
}

export default App;
