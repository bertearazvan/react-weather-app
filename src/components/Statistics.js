import React from "react";
import ChartTempWind from "./charts/ChartTempWind";
import ChartHum from "./charts/ChartHum";

export default class ChartsContainer extends React.Component {
  state = {
    lat: this.props.lat,
    lon: this.props.lon,
    cityId: this.props.cityId,
    forecast: this.props.forecast
  };

  render() {
    return (
      <div className='grid grid-rows-2 sm:p-8 overflow-y-auto'>
        <div className='chart flex items-center h-full w-full '>
          {<ChartTempWind data={this.props.forecast} />}
        </div>
        <div className=' flex h-full w-full items-center'>
          {<ChartHum data={this.props.forecast} />}
        </div>
      </div>
    );

    // return (
    //   <div
    //     className=' flex items-center justify-center'
    //     style={{ height: "70%" }}>
    //     <div>
    //       <GridLoader color={"#123abc"} />
    //       <p className='mt-4'>Loading...</p>
    //     </div>
    //   </div>
    // );
  }
}
