import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import styled from "styled-components";
import Home from "./Container2/Home";
import Posting from "./Container/Posting";
import Search from "./Container/Search";
import Header from "./Components/header";

const ForMargin = styled.div`
  @media (max-width: 640px) {
    margin-top: 101px;
  }
`;

const AppRoute = () => {
  return (
    <Router>
      {/* <Header /> */}
      <ForMargin></ForMargin>
      <Route path="/" exact component={Home} />
      <Route path="/posting/:id" component={Posting} />
      <Route path="/search/:keyword" component={Search} />
    </Router>
  );
};

ReactDOM.render(<AppRoute />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
