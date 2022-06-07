import React, { Component } from "react";
import A from "@/components/A";
// import B from "@/components/B";
// import C from "@/components/C";
import TodoList from "../../components/TodoList";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <div>
        <A />
        <TodoList />
      </div>
    );
  }
}
