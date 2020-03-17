import React, { Component } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";
import GridLoader from "react-spinners/GridLoader";
import Map from "./Map";

class Main extends Component {
  state = {
    currentWeather: Object,
    apiKey: process.env.REACT_APP_API_KEY,
    lat: 52.35,
    lon: 4.916667,
    loading: false
  };

  uberSearch = React.createRef();

  componentDidMount() {
    try {
      this.fetchDataAsync(this.state.lat, this.state.lon).then(data =>
        this.setState({ currentWeather: data, loading: true })
      );
    } catch (err) {
      console.log("An error has occured: ", err);
    }
  }

  fetchDataAsync = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.state.apiKey}&units=metric`
    );
    return await response.json();
  };

  onCityChange = city => {
    this.setState({ loading: false });
    try {
      this.fetchDataAsync(city.lat, city.lng).then(data =>
        this.setState({
          currentWeather: data,
          loading: true,
          lat: city.lat,
          lon: city.lng
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

  onMapChange = (lat, long) => {
    // this.setState({ loading: false });
    try {
      this.fetchDataAsync(lat, long).then(data => {
        this.setState({
          currentWeather: data,
          loading: true,
          lat: lat,
          lon: long
        });
      });
    } catch (err) {
      alert("An error has occured: ", err);
    }
  };

  render() {
    const { loading, currentWeather, lat, lon } = this.state;

    if (
      (loading && currentWeather.cod === 200) ||
      currentWeather.cod === "200"
    ) {
      return (
        <div className='flex relative w-full h-screen m-auto justify-center items-center'>
          <div className=''>
            {/* <SearchBar handleSearchCity={this.onCityChange} /> */}
            <div
              id='container-geocode'
              className='flex justify-center m-auto'
              ref={this.uberSearch}
            />
            <div
              className='grid m-auto border h-auto mt-16 border-gray-600 w-5/6'
              style={{ gridTemplateColumns: "40% 60%" }}>
              <div className='flex-1'>
                <Map
                  lon={lon}
                  lat={lat}
                  handleMapChange={this.onMapChange}
                  refD={this.uberSearch}
                />
              </div>
              <div className='flex-1 w-full text-center rounded-lg shadow-md'>
                <CurrentWeather currentWeather={this.state.currentWeather} />
                <Forecast
                  handleForecastChange={this.onForecastChange}
                  lat={this.state.lat}
                  lon={this.state.lon}
                  apiKey={this.state.apiKey}
                />
              </div>
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
            className='border flex w-full justify-center items-center border-gray-600 text-center rounded-lg shadow-md'
            style={{ height: "60vh" }}>
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
