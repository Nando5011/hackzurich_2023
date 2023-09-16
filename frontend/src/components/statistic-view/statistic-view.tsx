import { Icon, List, ListInput } from "framework7-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { User } from "firebase/auth";
import { firestore } from "../../js/firebase";
import { collection, doc } from "firebase/firestore";
import { Stat } from "../../js/types";
const StatisticView = ({ currentUser }) => {
  const [user, setCurrentUser] = useState<User>(currentUser);
  const [statMatrix, setStatMatrix] = useState<Stat | null>(null);
  const [selectedDevice, setSelectedDevice] = useState("x");
  const [devicesRef, setDevicesRef] = useState(
    "users/" + user.email + "/devices"
  );

  const [value, loading, error] = useCollection(
    collection(firestore, devicesRef),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [snapshot, loadingDevice, errorDevice] = useCollection(
    collection(firestore, devicesRef + "/" + selectedDevice + "/records")
  );

  console.log(snapshot?.docs);

  doc(firestore, devicesRef + "/" + selectedDevice);

  return (
    <>
      <List>
        <ListInput
          label="Device"
          type="select"
          placeholder="Please choose device"
          onChange={(event) => setSelectedDevice(event.target.value)}
        >
          <Icon icon="demo-list-icon" slot="media" />
          <option></option>
          {value &&
            value.docs.map((doc) => (
              <option
                key={doc.id}
                value={doc.id}
                onSelect={(event) => console.log(event)}
              >
                {doc.id}
              </option>
            ))}
        </ListInput>
      </List>
      <div className="timeline timeline-horizontal timeline-cols-2 medium-timeline-cols-3">
        <div className="timeline-year">
          <div className="timeline-year-title">
            <span>2016</span>
          </div>
          <div className="timeline-month">
            <div className="timeline-month-title">
              <span>December</span>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">20</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">8:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">21</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">22</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">23:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">23</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">12:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">11:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">24</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">18:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">25</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">11:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">26</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">8:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">27</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">17:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">28</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">9:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">21:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">29</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">12:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">8:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">30</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">21:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">31</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline-year">
          <div className="timeline-year-title">
            <span>2017</span>
          </div>
          <div className="timeline-month">
            <div className="timeline-month-title">
              <span>January</span>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">1</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">2</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">4:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">3</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">16:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">9:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">4</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">8:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">18:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">5</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">6</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">7</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">8</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">9</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">21:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">10</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">11</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">16:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">12</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">13</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">11:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">4:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">14</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">18:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">15</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">16</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">16:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">17</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">18</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">16:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">19</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">20</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">21</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">8:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">22</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">9:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">11:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">23</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">16:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">24</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">25</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">26</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">22:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">17:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">21:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">27</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">17:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">28</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">29</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">30</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">4:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">16:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">31</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
          </div>
          <div className="timeline-month">
            <div className="timeline-month-title">
              <span>February</span>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">1</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">2</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">3</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">9:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">4</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">9:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">4:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">11:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">17:00</div>
                <div className="timeline-item-text">Task 4</div>
                <div className="timeline-item-time">23:00</div>
                <div className="timeline-item-text">Task 5</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">5</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">9:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">6</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">11:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">12:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">7</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">8</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">9</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">22:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">10</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">8:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">8:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">11</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">4:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">18:00</div>
                <div className="timeline-item-text">Task 4</div>
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 5</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">12</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">17:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">23:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">13</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">18:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">14</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">17:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">15</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">16</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">4:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">22:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">17</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">10:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">23:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 4</div>
                <div className="timeline-item-time">12:00</div>
                <div className="timeline-item-text">Task 5</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">18</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">12:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">19</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">16:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">12:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">1:00</div>
                <div className="timeline-item-text">Task 4</div>
                <div className="timeline-item-time">9:00</div>
                <div className="timeline-item-text">Task 5</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">20</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">19:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">14:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">17:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">21</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">4:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">11:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">22</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">22:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 3</div>
                <div className="timeline-item-time">6:00</div>
                <div className="timeline-item-text">Task 4</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">23</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">0:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">24</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">7:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">25</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">5:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">26</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">13:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">18:00</div>
                <div className="timeline-item-text">Task 2</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">27</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">2:00</div>
                <div className="timeline-item-text">Task 1</div>
                <div className="timeline-item-time">20:00</div>
                <div className="timeline-item-text">Task 2</div>
                <div className="timeline-item-time">3:00</div>
                <div className="timeline-item-text">Task 3</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-date">28</div>
              <div className="timeline-item-content">
                <div className="timeline-item-time">15:00</div>
                <div className="timeline-item-text">Task 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticView;
