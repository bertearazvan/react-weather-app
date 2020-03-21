import React from "react";
import moment from "moment";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  Legend,
  AreaChart
} from "recharts";

function ChartHum(props) {
  console.log(props.data);

  // const data = [{ name: "Humidity & temperature", temp: 1 }];
  const data = [];
  console.log(data + "asdaads");

  console.log(data + "asdaadsassd");

  props.data.map((forecast, index) => {
    console.log(moment(forecast.dt * 1000).format("LT"));
    return data.push({
      "Humidity(%)": forecast.main.humidity,
      time: moment(forecast.dt * 1000).calendar()
    });
  });
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#5C63F2' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#5C63F2' stopOpacity={0.4} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke='#ccc' strokeDasharray='8' />
        <XAxis dataKey='time' />
        <Legend verticalAlign='bottom' height={36} />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='Humidity(%)'
          stroke='#5C63F2'
          fillOpacity={1}
          fill='url(#colorUv)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ChartHum;
