import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Block, BlockTitle } from "framework7-react";
import store from "../../js/store";

const WorkflowRatingGraph = () => {
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

  const dataForGraph = [];

  Object.keys(statMatrix).forEach((year) => {
    Object.keys(statMatrix[year]).forEach((month) => {
      Object.keys(statMatrix[year][month]).forEach((day) => {
        const dayRecord = statMatrix[year][month][day]["workflowRatings"];
        if (dayRecord) {
          dayRecord.forEach((record) => {
            if (record.rating !== undefined && record.timestamp !== undefined) {
              dataForGraph.push({
                timestamp: `${day}/${month.slice(0, 3)}/${year} ${record.timestamp}`,
                rating: record.rating,
              });
            }
          });
        }
      });
    });
  });

  return (
    <>
      <BlockTitle>Workflow Rating</BlockTitle>
      <Block>
        <LineChart
          width={windowSize.width * 0.8}
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
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="rating" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" activeDot={{ r: 12 }} strokeWidth={10} />
        </LineChart>
      </Block>
    </>
  );
};

export default WorkflowRatingGraph;
