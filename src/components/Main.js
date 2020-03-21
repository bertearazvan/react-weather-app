import React, { Component } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import ChartsContainer from "./Statistics";
import GridLoader from "react-spinners/GridLoader";
import Map from "./Map";
import CenteredTabs from "./Tabs";

class Main extends Component {
  state = {
    currentWeather: Object,
    apiKey: process.env.REACT_APP_API_KEY,
    lat: 52.35,
    lon: 4.916667,
    loading: false,
    activeTab: 0,
    forecast: Object
  };

  uberSearch = React.createRef();

  componentDidMount() {
    try {
      this.fetchDataAsync(this.state.lat, this.state.lon).then(data =>
        this.setState({ currentWeather: data, loading: true })
      );
      this.fetchDataForecastAsync(this.state.lat, this.state.lon).then(data => {
        this.setState({
          forecast: data,
          loading: true
        });
      });
    } catch (err) {
      console.log("An error has occured: ", err);
    }
  }

  fetchDataForecastAsync = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.state.apiKey}&units=metric`
    );
    return await response.json();
  };

  fetchDataAsync = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.state.apiKey}&units=metric`
    );
    return await response.json();
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

          lat: lat,
          lon: long
        });
      });

      this.fetchDataForecastAsync(lat, long).then(data => {
        this.setState({
          forecast: data,

          lat: lat,
          lon: long
        });
      });
    } catch (err) {
      alert("An error has occured: ", err);
    }
  };

  onTabChange = tabIndex => {
    return this.setState({ activeTab: tabIndex });
  };

  render() {
    const { loading, currentWeather, lat, lon } = this.state;

    if (
      (loading && currentWeather.cod === 200) ||
      currentWeather.cod === "200"
    ) {
      return (
        <div className='flex relative w-full h-screen  m-auto justify-center items-center'>
          <div className='h-full sm:h-screen flex sm:items-center justify-center'>
            {/* <SearchBar/> */}
            <div className='w-screen'>
              <div
                id='container-geocode'
                className='flex justify-center m-auto'
                ref={this.uberSearch}
              />
              <div
                id='mapDiv'
                className='grid h-auto w-full md:w-10/12 sm:grid-cols-5 shadow-md m-auto md:mt-16'>
                <div
                  id='mapContainer'
                  className='sm:col-span-2 h-screen md:h-auto flex-1'>
                  <Map
                    lon={lon}
                    lat={lat}
                    handleMapChange={this.onMapChange}
                    refD={this.uberSearch}
                  />
                </div>
                <div className='flex-1 sm:col-span-3 overflow-y-auto w-full h-full text-center rounded-lg'>
                  <div className='flex justify-center z-10'>
                    <CenteredTabs handleTabChange={this.onTabChange} />
                  </div>
                  {this.state.activeTab === 0 ? (
                    <div className='grid grid-rows-7'>
                      <div className='row-span-4 h-full'>
                        <CurrentWeather
                          currentWeather={this.state.currentWeather}
                        />
                      </div>
                      <div className='row-span-3 h-full'>
                        <Forecast
                          handleForecastChange={this.onForecastChange}
                          lat={this.state.lat}
                          lon={this.state.lon}
                          apiKey={this.state.apiKey}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='row-span-5'>
                      <ChartsContainer
                        lat={this.state.lat}
                        lon={this.state.lon}
                        apiKey={this.state.apiKey}
                        forecast={this.state.forecast.list}
                      />
                    </div>
                  )}
                </div>
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
