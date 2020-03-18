import React from "react";
import RenderLineChart from "./charts/LineChart";
import GridLoader from "react-spinners/GridLoader";
import moment from "moment";

export default class ChartsContainer extends React.Component {
  state = {
    lat: this.props.lat,
    lon: this.props.lon,
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
    }
  }

  fetchDataForecastAsync = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&appid=${this.props.apiKey}&units=metric`
    );
    return await response.json();
  };

  render() {
    const { lat, lon, loading, forecast } = this.state;
    if (loading) {
      return (
        <div
          className='grid p-8 overflow-y-auto'
          style={{ gridTemplateRows: "auto auto" }}>
          <div
            className='flex items-center'
            style={{ width: "35vw", height: "25vh" }}>
            {<RenderLineChart data={forecast.list} />}
          </div>
          <div className='' style={{ width: "35vw", height: "25vh" }}>
            {<RenderLineChart data={forecast.list} />}
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
