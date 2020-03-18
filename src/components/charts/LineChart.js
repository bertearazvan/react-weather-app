import React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Bar
} from "recharts";

function RenderLineChart(props) {
  console.log(props.data);
  // const data = [{ name: "Humidity & temperature", temp: 1 }];
  const data = [];
  console.log(data + "asdaadsassd");
  props.data.map((forecast, index) => {
    console.log(moment(forecast.dt * 1000).format("LT"));
    return data.push({
      wind: forecast.wind.speed,
      temp: forecast.main.temp,
      time: moment(forecast.dt * 1000).calendar()
    });
  });
  return (
    <ResponsiveContainer width={600} height='100%'>
      <ComposedChart
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Bar dataKey='temp' barSize={14} fill='#F8AB11' />
        <Line type='natural' dataKey='wind' strokeWidth='2' stroke='#0E34A0' />

        <CartesianGrid stroke='#ccc' strokeDasharray='8' />
        <XAxis dataKey='time' />
        <Legend verticalAlign='bottom' height={36} />
        <YAxis />
        <Tooltip />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default RenderLineChart;
