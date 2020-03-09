import React, { Component } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";
import GridLoader from "react-spinners/GridLoader";

class Main extends Component {
  state = {
    currentWeather: {},
    apiKey: "1ffbe8f54b8f87482ca96356aa6d91c0",
    cityId: 2618425,
    loading: false
  };

  componentDidMount() {
    try {
      this.fetchDataAsync(this.state.cityId).then(data =>
        this.setState({ currentWeather: data, loading: true })
      );
    } catch (err) {
      console.log("An error has occured: ", err);
    }
  }

  fetchDataAsync = async cityId => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.state.apiKey}&units=metric`
    );
    return await response.json();
  };

  onCityChange = geonameId => {
    this.setState({ loading: false });
    try {
      this.fetchDataAsync(geonameId).then(data =>
        this.setState({
          currentWeather: data,
          loading: true,
          cityId: geonameId
        })
      );
    } catch (err) {
      console.log("An error has occured: ", err);
    }
  };

  onForecastChange = currentForecast => {
    currentForecast.sys.sunrise = this.state.currentWeather.sys.sunrise;
    currentForecast.sys.sunset = this.state.currentWeather.sys.sunset;
    currentForecast.name = this.state.currentWeather.name;
    currentForecast.sys.country = this.state.currentWeather.sys.country;
    currentForecast.cod = this.state.currentWeather.cod;
    this.setState({ currentWeather: currentForecast });
  };

  render() {
    const { loading, currentWeather } = this.state;
    console.log(loading, ",", currentWeather.cod);
    if (
      (loading && currentWeather.cod === 200) ||
      currentWeather.cod === "200"
    ) {
      return (
        <div
          className='flex relative max-w-5xl w-full m-auto items-center'
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
                apiKey={this.state.apiKey}
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
            className='border flex justify-center items-center border-gray-600 text-center rounded-lg shadow-md'
            style={{ width: "100%", height: "60vh" }}>
            <div>
              <GridLoader color={"#123abc"} />
              <p className='mt-4'>Loading...</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Main;
