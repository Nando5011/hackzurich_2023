import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import store from "../../js/store";

const TaskTypeDistributionGraph = () => {
  const [statMatrix, setStatMatrix] = useState({});
  useEffect(() => {
    setStatMatrix(store.getters.stats);
  }, []);

  const dataForGraph = Object.keys(statMatrix).map((year) => {
    let yearData = { name: year };

    Object.keys(statMatrix[year]).forEach((month) => {
      Object.keys(statMatrix[year][month]).forEach((day) => {
        statMatrix[year][month][day].forEach((task) => {
          if (!yearData[task.type]) yearData[task.type] = 0;
          yearData[task.type]++;
        });
      });
    });

    return yearData;
  });

  return (
    <BarChart
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
      {/* Assuming task types are 'TaskType1', 'TaskType2', add or remove as necessary */}
      <Bar dataKey="TaskType1" stackId="a" fill="#8884d8" />
      <Bar dataKey="TaskType2" stackId="a" fill="#82ca9d" />
      {/* ... add more Bar components as per your task types */}
    </BarChart>
  );
};

export default TaskTypeDistributionGraph;
