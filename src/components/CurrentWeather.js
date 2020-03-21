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
        <div className='p-4 grid grid-cols-1 h-full sm:grid-cols-7'>
          <div className='flex sm:col-span-2 items-center justify-center'>
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
          <div className='grid row-start-1 md:row-auto grid-rows-12 gap-4 sm:col-span-5'>
            <div className='grid grid-cols-12 row-span-4'>
              <div className='flex col-span-4 items-center justify-center'>
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
              <div className='flex col-span-8 items-center justify-center'>
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
            <div className='grid grid-cols-5 row-span-8 mx-2'>
              <div className='flex justify-center'>
                <div>
                  <h4>RISES</h4>
                  <p className='specificsMain'>
                    {moment(currentWeather.sys.sunrise * 1000).format("LT")}
                  </p>
                </div>
              </div>
              <div className='flex justify-center'>
                <div>
                  <h4>SETS</h4>
                  <p className='specificsMain'>
                    {moment(currentWeather.sys.sunset * 1000).format("LT")}
                  </p>
                </div>
              </div>
              <div className='flex justify-center'>
                <div>
                  <h4>HUM.</h4>
                  <p className='specificsMain'>
                    {currentWeather.main.humidity}%
                  </p>
                </div>
              </div>
              <div className='flex justify-center'>
                <div>
                  <h4>WIND</h4>
                  <p className='specificsMain'>
                    {currentWeather.wind.speed} m/s
                  </p>
                </div>
              </div>
              <div className='flex justify-center'>
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
