import React, { Component } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

class Main extends Component {
  state = {
    currentWeather: Object,
    apiKey: "9efbc6fe71feedee8977557b7c4d4103",
    cityId: "2643743",
    loading: false
  };
  async componentDidMount() {
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
          <div
            className='border border-gray-600 text-center rounded-lg shadow-md'
            style={{ width: "100%", height: "auto" }}>
            <CurrentWeather currentWeather={this.state.currentWeather} />
            <Forecast
              handleForecastChange={this.onForecastChange}
              cityId={this.state.cityId}
            />
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
            style={{ width: "100%", height: "auto" }}>
            <div>LOADING</div>
          </div>
        </div>
      );
    }
  }
}

export default Main;
