import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Router className='fixed'>
        <div className='px-32 py-8'>
          <div className='float-left nav'>
            <ul>
              <Link className='inline' to='/'>
                <p> Weather App </p>
              </Link>
            </ul>
          </div>
          <div className='float-right nav'>
            <Link to='https://github.com/bertearazvan/react-weather-app.git'>
              <p> GitHub repo </p>
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path='/' component={props => <Main {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
