import React, { Component } from "react";
import icons from "../icons/icons";
import moment from "moment";

class CurrentWeather extends Component {
  state = {
    loading: this.props.currentWeather ? true : false
  };

  render() {
    const weather = this.props.currentWeather;

    if (this.state.loading) {
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
                      if (weather.weather[0].icon === icon.id) {
                        return process.env.PUBLIC_URL + icon.pathJs;
                      } else {
                        return "";
                      }
                    })
                    .join("")}
                  alt='weather-icon'
                />
              </div>
              <h3>{weather.weather[0].main}</h3>
            </div>
          </div>
          <div className=' grid' style={{ gridTemplateRows: "60% 40%" }}>
            <div className='grid' style={{ gridTemplateColumns: "40% 60%" }}>
              <div className='flex items-center justify-center'>
                <div>
                  <p id='tempMain'>{Math.floor(weather.main.temp)}&#xb0;C</p>
                  <p id='minMaxMain'>
                    {Math.floor(weather.main.temp_min)}&#xb0;/
                    {Math.floor(weather.main.temp_max)}&#xb0;
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h2>{weather.name + ", " + weather.sys.country}</h2>
                  <h3>
                    {moment(weather.dt * 1000).format("dddd")}{" "}
                    {moment(weather.dt * 1000).format("LT")}
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
                    {moment(weather.sys.sunrise * 1000).format("LT")}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>SETS</h4>
                  <p className='specificsMain'>
                    {moment(weather.sys.sunset * 1000).format("LT")}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>HUM.</h4>
                  <p className='specificsMain'>{weather.main.humidity}%</p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>WIND</h4>
                  <p className='specificsMain'>{weather.wind.speed} m/s</p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div>
                  <h4>PRESS.</h4>
                  <p className='specificsMain'>{weather.main.pressure} hPa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='p-4 grid' style={{ height: "60%" }}>
          LOADING
        </div>
      );
    }
  }
}

export default CurrentWeather;
