import React, { Component } from "react";
import moment from "moment";
import icons from "../icons/icons";

export default class Forecast extends Component {
  state = {
    apiKey: "9efbc6fe71feedee8977557b7c4d4103",
    cityId: this.props.cityId,
    loading: false,
    forecast: Object
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?id=${this.state.cityId}&appid=${this.state.apiKey}&units=metric&cnt=5`
      );

      this.setState({
        forecast: await response.json(),
        loading: true
      });
      console.log(this.state.forecast);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.loading) {
      const forecast = this.state.forecast;
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
        <div className='p-4' style={{ height: "40%" }}>
          LOADING
        </div>
      );
    }
  }
}
