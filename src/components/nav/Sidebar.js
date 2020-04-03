import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

const useStyles = makeStyles({
  list: {
    width: "100%"
  },
  fullList: {
    width: "auto"
  },
  text: {
    textAlign: "center",
    fontWeight: 600
  },
  icon: {
    margin: "10px",
    color: "white"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <React.Fragment key={"left"}>
        <div
          className='mx-6 my-6 sm:mx-10 sm:my-10 z-10 absolute flex items-center cursor-pointer'
          onClick={toggleDrawer("left", true)}>
          <div style={{ backgroundColor: "#3742fa", borderRadius: "60%" }}>
            <MenuOutlinedIcon
              data-cy='sidebarIcon'
              className={classes.icon}
              fontSize='large'
            />
          </div>
        </div>

        <Drawer
          data-cy='sidebarDrawer'
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}>
          <h2
            className='m-4'
            data-cy='sidebarTitle'
            style={{ color: "#3742fa" }}>
            Weather app
          </h2>
          <div
            className={clsx(classes.list)}
            role='presentation'
            onClick={toggleDrawer("left", false)}
            onKeyDown={toggleDrawer("left", false)}>
            <List data-cy='sidebarList'>
              <ListItem
                className={classes.text}
                button
                key='Weather'
                component={Link}
                to={process.env.PUBLIC_URL}>
                <ListItemText primary='Weather' />
              </ListItem>
              <ListItem
                className={classes.text}
                button
                key='City List'
                component={Link}
                to={process.env.PUBLIC_URL + "/city-list"}>
                <ListItemText primary='City List' />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
