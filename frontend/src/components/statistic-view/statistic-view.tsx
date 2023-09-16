import { Block, BlockTitle, Icon, List, ListInput } from "framework7-react";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { User } from "firebase/auth";
import { firestore } from "../../js/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { StatRecord, months } from "../../js/types";
import YearTimeline from "../timeline/year";
import store from "../../js/store";
const StatisticView = ({ currentUser }) => {
  const [user, setCurrentUser] = useState<User>(currentUser);
  const [statMatrix, setStatMatrix] = useState({});
  const [selectedDevice, setSelectedDevice] = useState("x");
  const [devicesRef, setDevicesRef] = useState(
    "users/" + user.email + "/devices"
  );

  const [value, loading, error] = useCollection(
    collection(firestore, devicesRef)
  );

  useEffect(() => {
    fetchData();
  }, [selectedDevice]);

  const fetchData = () => {
    const matrix = {};
    const qRecords = query(
      collection(firestore, devicesRef + "/" + selectedDevice + "/records")
    );
    getDocs(qRecords).then((qS) => {
      qS.forEach((doc) => {
        const qTimestamps = query(
          collection(
            firestore,
            devicesRef +
              "/" +
              selectedDevice +
              "/records/" +
              doc.id +
              "/timestamps"
          )
        );
        getDocs(qTimestamps)
          .then((qS2) => {
            const dateSplit = doc.id.split("-");
            qS2.docs.map((doc3) => {
              if (!matrix[dateSplit[0]]) {
                matrix[dateSplit[0] + ""] = [];
              }
              if (!matrix[dateSplit[0]][months[dateSplit[1]]]) {
                matrix[dateSplit[0] + ""][months[dateSplit[1] + ""]] = [];
              }
              if (
                !matrix[dateSplit[0]][months[dateSplit[1]]][dateSplit[2] + ""]
              ) {
                matrix[dateSplit[0] + ""][months[dateSplit[1] + ""]][
                  dateSplit[2] + ""
                ] = [];
              }

              // Push doc3.data() into the array
              matrix[dateSplit[0] + ""][months[dateSplit[1] + ""]][
                dateSplit[2] + ""
              ].push({ ...doc3.data(), timestamp: doc3.id });
            });
          })
          .then(() => {
            store.dispatch("setStatsMatrix", matrix);
            setStatMatrix({ ...(matrix as StatRecord) });
          });
      });
    });
    /*return onSnapshot(
      collection(firestore, devicesRef + "/" + selectedDevice + "/records"),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          onSnapshot(
            collection(
              firestore,
              devicesRef +
                "/" +
                selectedDevice +
                "/records/" +
                doc.id +
                "/timestamps"
            ),
            (querySnapshot) => {
              const dateSplit = doc.id.split("-");
              querySnapshot.docs.map((doc3) => {
                if (!matrix[dateSplit[0]]) {
                  matrix[dateSplit[0] + ""] = [];
                }
                if (!matrix[dateSplit[0]][months[dateSplit[1]]]) {
                  matrix[dateSplit[0] + ""][months[dateSplit[1] + ""]] = [];
                }
                if (
                  !matrix[dateSplit[0]][months[dateSplit[1]]][dateSplit[2] + ""]
                ) {
                  matrix[dateSplit[0] + ""][months[dateSplit[1] + ""]][
                    dateSplit[2] + ""
                  ] = [];
                }

                // Push doc3.data() into the array
                matrix[dateSplit[0] + ""][months[dateSplit[1] + ""]][
                  dateSplit[2] + ""
                ].push({ ...doc3.data(), timestamp: doc3.id });
              });
              store.dispatch("setStatsMatrix", matrix);
              setStatMatrix(matrix as StatRecord);
            }
          );
        });
      }
    );*/
  };

  useEffect(() => {
    setStatMatrix({});
    fetchData();
  }, [selectedDevice]);
  return (
    <Block>
      <BlockTitle>My Timeline</BlockTitle>
      <List>
        <ListInput
          label="Device"
          type="select"
          placeholder="Please choose device"
          onChange={(event) => setSelectedDevice(event.target.value)}
        >
          <Icon icon="demo-list-icon" slot="media" />
          <option value={"-"}></option>
          {value &&
            value.docs.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.id}
              </option>
            ))}
        </ListInput>
      </List>
      <div
        className="timeline timeline-horizontal timeline-cols-2 medium-timeline-cols-3"
        style={{ overflow: "auto" }}
      >
        {Object.keys(statMatrix).map((year) => (
          <YearTimeline
            key={year}
            year={year}
            statRecObject={statMatrix[year]}
          />
        ))}
      </div>
    </Block>
  );
};

export default StatisticView;
