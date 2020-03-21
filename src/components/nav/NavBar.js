import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "../Main";
import CityList from "../CityList";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  text: {
    fontWeight: 600
  }
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Router>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered>
          <Tab
            className={classes.text}
            label='Current weather'
            component={Link}
            to={process.env.PUBLIC_URL}
          />
          <Tab
            className={classes.text}
            label='City list'
            component={Link}
            to={process.env.PUBLIC_URL + "/city-list"}
          />
        </Tabs>
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL}
            component={props => <Main {...props} />}
          />

          <Route
            exact
            path={process.env.PUBLIC_URL + "/city-list"}
            component={props => <CityList {...props} />}
          />
        </Switch>
      </Router>
    </Paper>
  );
}
