import React, { Component } from "react";
import icons from "../icons/icons";
import moment from "moment";
import GridLoader from "react-spinners/GridLoader";

class CurrentWeather extends Component {
  state = {
    loading: this.props.currentWeather.cod === 200 ? true : false
  };

  render() {
    const { currentWeather } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div
          className='p-4 grid'
          style={{ height: "60%", gridTemplateColumns: "35% 65%" }}>
          <div className='flex items-center justify-center'>
            <div>
              <div className='flex justify-center'>
                <img
                  className='weatherImg'
                  // eslint-disable-next-line array-callback-return
                  src={icons
                    .map(icon => {
                      if (currentWeather.weather[0].icon === icon.id) {
                        return process.env.PUBLIC_URL + icon.pathJs;
                      } else {
                        return "";
                      }
                    })
                    .join("")}
                  alt='weather-icon'
                />
              </div>
              <h3>{currentWeather.weather[0].main}</h3>
            </div>
          </div>
          <div className=' grid' style={{ gridTemplateRows: "60% 40%" }}>
            <div className='grid' style={{ gridTemplateColumns: "40% 60%" }}>
              <div className='flex items-center justify-center'>
                <div>
                  <p id='tempMain'>
                    {Math.floor(currentWeather.main.temp)}&#xb0;C
                  </p>
                  <p id='minMaxMain'>
                    {Math.floor(currentWeather.main.temp_min)}&#xb0;/
                    {Math.floor(currentWeather.main.temp_max)}&#xb0;
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h2>
                    {currentWeather.name + ", " + currentWeather.sys.country}
                  </h2>
                  <h3>
                    {moment(currentWeather.dt * 1000).format("dddd")}{" "}
                    {moment(currentWeather.dt * 1000).format("LT")}
                  </h3>
                </div>
              </div>
            </div>
            <div
              className='grid mx-20'
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>RISES</h4>
                  <p className='specificsMain'>
                    {moment(currentWeather.sys.sunrise * 1000).format("LT")}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>SETS</h4>
                  <p className='specificsMain'>
                    {moment(currentWeather.sys.sunset * 1000).format("LT")}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>HUM.</h4>
                  <p className='specificsMain'>
                    {currentWeather.main.humidity}%
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>WIND</h4>
                  <p className='specificsMain'>
                    {currentWeather.wind.speed} m/s
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>PRESS.</h4>
                  <p className='specificsMain'>
                    {currentWeather.main.pressure} hPa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className='p-4 flex justify-center items-center'
          style={{ height: "60%" }}>
          <div>
            <GridLoader color={"#123abc"} />
            <p className='mt-4'>Loading...</p>
          </div>
        </div>
      );
    }
  }
}

export default CurrentWeather;
