import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "pages/Home";
import Settings from "pages/Settings";

const App = () => {
  return (
    <Router>
      <Navigation version="0.01" />
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
