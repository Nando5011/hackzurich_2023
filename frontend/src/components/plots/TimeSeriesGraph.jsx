import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Block,
  BlockTitle,
} from "framework7-react";
import store from "../../js/store";

const TimeSeriesGraph = () => {
  const [statMatrix, setStatMatrix] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setStatMatrix(store.getters.stats.value);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const dataForGraph = [];

  Object.keys(statMatrix).forEach((year) => {
    Object.keys(statMatrix[year]).forEach((month) => {
      Object.keys(statMatrix[year][month]).forEach((day) => {
        const dayRecord = statMatrix[year][month][day];
        const taskCount = dayRecord.reduce((sum, record) => sum + 1, 0);
        const dateString = `${day}/${month}/${year}`;
        const existingDayData = dataForGraph.find((data) => data.name === dateString);

        if (existingDayData) {
          existingDayData.taskCount += taskCount;
        } else {
          dataForGraph.push({
            name: dateString,
            taskCount,
          });
        }
      });
    });
  });


  return (
    <Block>
      <LineChart
        width={windowSize.width * 0.80}
        height={windowSize.height * 0.75}
        style={{ margin: "auto" }}
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
        <Line type="monotone" dataKey="taskCount" stroke="#8884d8"  activeDot={{ r: 12}} strokeWidth={10} />
      </LineChart>
    </Block >
  );
};

export default TimeSeriesGraph;
