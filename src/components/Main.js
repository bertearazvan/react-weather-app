import React, { Component } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import ChartsContainer from "./Statistics";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import Map from "./Map";
import CenteredTabs from "./Tabs";

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

  onTabChange = tabIndex => {
    console.log(tabIndex);
  };

  render() {
    const { loading, currentWeather, lat, lon } = this.state;

    if (
      (loading && currentWeather.cod === 200) ||
      currentWeather.cod === "200"
    ) {
      return (
        <div className='flex relative w-full h-screen m-auto justify-center items-center'>
          <div className='' style={{ height: "90vh" }}>
            {/* <SearchBar handleSearchCity={this.onCityChange} /> */}
            <div
              id='container-geocode'
              className='flex justify-center m-auto'
              ref={this.uberSearch}
            />
            <div
              className='grid  shadow-md m-auto mt-16'
              style={{
                gridTemplateColumns: "40% 60%",
                height: "65vh",
                width: "70vw"
              }}>
              <div className='flex-1'>
                <Map
                  lon={lon}
                  lat={lat}
                  handleMapChange={this.onMapChange}
                  refD={this.uberSearch}
                />
              </div>
              <div className='flex-1 overflow-y-auto w-full text-center rounded-lg'>
                <Router>
                  <div className='flex justify-center z-10'>
                    <CenteredTabs handleTabChange={this.onTabChange} />
                  </div>
                  <Switch>
                    <Route
                      path={process.env.PUBLIC_URL + "/main"}
                      active
                      render={props => (
                        <div>
                          <CurrentWeather
                            currentWeather={this.state.currentWeather}
                            {...props}
                          />
                          <Forecast
                            handleForecastChange={this.onForecastChange}
                            lat={this.state.lat}
                            lon={this.state.lon}
                            apiKey={this.state.apiKey}
                            {...props}
                          />
                        </div>
                      )}></Route>
                    <Route
                      path={process.env.PUBLIC_URL + "/charts"}
                      render={props => (
                        <ChartsContainer
                          lat={this.state.lat}
                          lon={this.state.lon}
                          apiKey={this.state.apiKey}
                          {...props}
                        />
                      )}></Route>
                  </Switch>
                </Router>
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
