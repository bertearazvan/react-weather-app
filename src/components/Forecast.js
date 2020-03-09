import React, { Component } from "react";
import moment from "moment";
import icons from "../icons/icons";
import GridLoader from "react-spinners/GridLoader";

export default class Forecast extends Component {
  state = {
    cityId: this.props.cityId,
    loading: false,
    forecast: Object
  };

  componentDidMount() {
    try {
      this.fetchDataForecastAsync().then(data =>
        this.setState({
          forecast: data,
          loading: true
        })
      );
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      });
    }
  }

  fetchDataForecastAsync = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${this.state.cityId}&appid=${this.props.apiKey}&units=metric&cnt=5`
    );
    return await response.json();
  };

  render() {
    const { forecast, loading } = this.state;

    if (loading && forecast.cod === "200") {
      return (
        <div className='p-4 m-2' style={{ height: "40%" }}>
          <div
            className='grid h-full pt-4'
            style={{
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              borderTop: "3px solid black"
            }}>
            {forecast.list.map((item, index) => {
              return (
                <div
                  key={("forecast-", index)}
                  className='flex items-center justify-center p-4 forecastItem'
                  onClick={() => this.props.handleForecastChange(item)}
                  style={
                    index !== 0
                      ? { borderLeft: "3px solid black" }
                      : { borderLeft: "0px solid black" }
                  }>
                  <div>
                    <h4>
                      {moment(new Date()).format("dddd") ===
                      moment(item.dt * 1000).format("dddd")
                        ? "Today"
                        : moment(item.dt * 1000).format("dddd")}{" "}
                      {moment(item.dt * 1000)
                        .format("LT")
                        .replace(":00", "")}
                    </h4>
                    <div className='flex justify-center'>
                      <img
                        className='forecastImg'
                        // eslint-disable-next-line array-callback-return
                        src={icons
                          .map(icon => {
                            if (item.weather[0].icon === icon.id) {
                              return process.env.PUBLIC_URL + icon.pathJs;
                            } else {
                              return "";
                            }
                          })
                          .join("")}
                        alt='weather-icon'
                      />
                    </div>
                    <p className='forecastTemp'>
                      {Math.floor(item.main.temp)}&#xb0;C
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className='p-4 flex justify-center items-center'
          style={{ height: "40%" }}>
          <div>
            <GridLoader color={"#123abc"} />
            <p className='mt-4'>Loading...</p>
          </div>
        </div>
      );
    }
  }
}
