import React, { Component } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";

class Main extends Component {
  state = {
    currentWeather: Object,
    apiKey: "1ffbe8f54b8f87482ca96356aa6d91c0",
    cityId: "2643743",
    loading: false
  };

  async componentWillMount() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${this.state.cityId}&appid=${this.state.apiKey}&units=metric`
      );

      this.setState({ currentWeather: await response.json(), loading: true });
      console.log(this.state.currentWeather);
    } catch (error) {
      console.log(error);
    }
  }

  onCityChange = geonameId => {
    this.setState({ cityId: geonameId });
    console.log("new city geonameid: ", geonameId);
    this.componentWillMount();
  };

  onForecastChange = currentForecast => {
    console.log("new forecast: ", currentForecast);
    currentForecast.sys.sunrise = this.state.currentWeather.sys.sunrise;
    currentForecast.sys.sunset = this.state.currentWeather.sys.sunset;
    currentForecast.name = this.state.currentWeather.name;
    currentForecast.sys.country = this.state.currentWeather.sys.country;
    this.setState({ currentWeather: currentForecast });
  };

  render() {
    if (this.state.loading) {
      return (
        <div
          className='flex max-w-5xl m-auto items-center'
          style={{ height: "90vh" }}>
          <div>
            <SearchBar handleSearchCity={this.onCityChange} />
            <div
              className='mt-12 border border-gray-600 text-center rounded-lg shadow-md'
              style={{ width: "100%", height: "auto" }}>
              <CurrentWeather currentWeather={this.state.currentWeather} />
              <Forecast
                handleForecastChange={this.onForecastChange}
                cityId={this.state.cityId}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className='flex max-w-5xl m-auto items-center'
          style={{ height: "90vh" }}>
          <div
            className='border border-gray-600 text-center rounded-lg shadow-md'
            style={{ width: "100%", height: "60vh" }}>
            <div>LOADING</div>
          </div>
        </div>
      );
    }
  }
}

export default Main;
