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
        <Route path="/search/:type/:location/:ids?" component={SearchPage} />
        <Route path="/performers/:id" component={PerformerPage} />
        <Route path="/venues/:id" component={VenuePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin" component={AdminPage} />
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
