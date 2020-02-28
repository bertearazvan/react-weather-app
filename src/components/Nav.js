import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <div className='px-32 py-8'>
        <div className='float-left nav'>
          <p>Weather App</p>
        </div>
        <div className='float-right nav'>
          <a href='https://github.com/'>GitHub</a>
        </div>
      </div>
    );
  }
}

export default Nav;
