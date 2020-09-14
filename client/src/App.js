import React from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {


  return (
    <Router>
      <div className="App">
        <Link to="/bubblepage">Bubble page</Link>
        <Route exact path="/" component={Login} />
        <PrivateRoute 
        path="/bubblepage" 
        component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
