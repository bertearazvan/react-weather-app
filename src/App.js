import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import Main from "./components/Main";
import CityList from "./components/CityList";
import "./App.css";
import DotEmv from "dotenv";
DotEmv.config();

function App() {
  return (
    <div className='App'>
      <Router className=''>
        <div className='w-full z-10 relative px-32 py-8'>
          <div className='float-left nav'>
            <ul>
              <Link
                className='inline-block'
                to={process.env.PUBLIC_URL + "/main"}>
                <p> Weather App </p>
              </Link>
              <Link
                className='inline-block ml-8'
                to={process.env.PUBLIC_URL + "/city-list"}>
                <p> City list </p>
              </Link>
            </ul>
          </div>
          <div className='float-right nav'>
            <a href='https://github.com/bertearazvan/react-weather-app.git'>
              <p> GitHub repo </p>
            </a>
          </div>
        </div>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"}>
            <Redirect to={process.env.PUBLIC_URL + "/main"} />
          </Route>
          <Route
            exact
            path={process.env.PUBLIC_URL + "/main"}
            component={props => <Main {...props} />}
          />

          <Route
            exact
            path={process.env.PUBLIC_URL + "/charts"}
            component={props => <Main {...props} />}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/city-list"}
            component={props => <CityList {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
