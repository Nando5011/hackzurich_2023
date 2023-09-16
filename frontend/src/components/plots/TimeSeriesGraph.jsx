import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import store from "../../js/store";

const TimeSeriesGraph = () => {
  const [statMatrix, setStatMatrix] = useState({});
  useEffect(() => {
    setStatMatrix(store.getters.stats);
  }, []);
  const dataForGraph = Object.keys(statMatrix).map((year) => {
    let yearData = { name: year };

    Object.keys(statMatrix[year]).forEach((month) => {
      yearData[month] = Object.keys(statMatrix[year][month]).reduce(
        (acc, day) => acc + statMatrix[year][month][day].length,
        0
      );
    });

    return yearData;
  });

  return (
    <LineChart
      width={500}
      height={300}
      data={dataForGraph}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* Assuming 'January', 'February', etc. as month keys */}
      <Line
        type="monotone"
        dataKey="January"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="February" stroke="#82ca9d" />
      {/* ... add lines for other months */}
    </LineChart>
  );
};

export default TimeSeriesGraph;
