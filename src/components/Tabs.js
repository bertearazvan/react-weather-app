import React from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function CenteredTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleTabChange(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered>
        <Tab
          label='Weather'
          component={Link}
          to={process.env.PUBLIC_URL + "/main"}
        />
        <Tab
          label='Statistics'
          component={Link}
          to={process.env.PUBLIC_URL + "/charts"}
        />
      </Tabs>
    </Paper>
  );
}
