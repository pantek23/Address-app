import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Address from "./components/pages/Address";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Switch>
            <Route exact path="/address" component={Address} />
          </Switch>
          <Switch>
            <Route exact path="/about" component={About} />
          </Switch>
          <Switch>
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
