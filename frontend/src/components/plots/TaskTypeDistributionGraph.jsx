import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Block } from "framework7-react";
import store from "../../js/store";

const TaskTypeDistributionGraph = () => {
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const taskTypeCounts = {};

  Object.keys(statMatrix).forEach((year) => {
    Object.keys(statMatrix[year]).forEach((month) => {
      Object.keys(statMatrix[year][month]).forEach((day) => {
        statMatrix[year][month][day].forEach((task) => {
          if (!taskTypeCounts[task.taskType]) taskTypeCounts[task.taskType] = 0;
          taskTypeCounts[task.taskType]++;
        });
      });
    });
  });

  const dataForGraph = Object.keys(taskTypeCounts).map((taskType) => ({
    name: taskType,
    value: taskTypeCounts[taskType],
  }));

  return (
    <Block>
      <PieChart
        width={windowSize.width * 0.8}
        height={windowSize.height * 0.55}
        style={{ margin: "auto" }}
      >
        <Pie
          data={dataForGraph}
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
        >
          {dataForGraph.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColorByIndex(index)} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Block>
  );
};

const getColorByIndex = (index) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#a4de6c", "#d0ed57"];
  return colors[index % colors.length];
};

export default TaskTypeDistributionGraph;
