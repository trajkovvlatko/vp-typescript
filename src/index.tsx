import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import FrontPage from "./pages/FrontPage";
import SearchPage from "./pages/SearchPage";
import PerformerPage from "./pages/PerformerPage";
import VenuePage from "./pages/VenuePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminPerformerPage from "./pages/admin/AdminPerformerPage";

import { useLocalStorage } from "./hooks/useLocalStorage";
import UserContext from "./contexts/UserContext";

import "./styles/index.css";
import "./styles/App.css";

import * as serviceWorker from "./serviceWorker";

const App: React.FC = () => {
  const [user, setUser] = useLocalStorage("vp-user", {});

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Route exact path="/search/:type/:location/:ids?" component={SearchPage} />
        <Route exact path="/performers/:id" component={PerformerPage} />
        <Route exact path="/venues/:id" component={VenuePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/admin/performers/new" component={AdminPerformerPage} />
        <Route exact path="/admin/performers/:id/edit" component={AdminPerformerPage} />
        <Route exact path="/" component={FrontPage} />
      </UserContext.Provider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
