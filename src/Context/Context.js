import { createContext, useState } from "react";

const exampleTask = {
  id: "recurrence:47612:2024-02-13",
  space: "ZReLTfsC",
  parent: null,
  subgoals: [],
  column: 1,
  doneDate: "2024-02-13",
  dueDate: "2024-02-13",
  datetimeFr: "2024-02-12T23:39:00Z",
  datetimeTo: "2024-02-13T00:09:00Z",
  modifiedDatetime: "2024-02-13T20:12:16.888475+03:00",
  name: "Example Task",
  thoughts: "",
  richThoughts: "{\"ops\":[{\"insert\":\"\"}]}",
  type: null,
  encryptionSalt: null,
  encryptedName: null,
  encryptedThoughts: null,
  climbSubscription: null,
  climbStep: null,
  sequenceNo: 2000,
  horizonSequenceNo: 101,
  bucketSequenceNo: 2000,
  subgoalSequenceNo: 2000,
  tags: [],
  locked: false,
  lockedTillDatetime: null,
  insight: null,
  bucket: null,
  color: null,
  imageExpanded: true,
  canHaveSubgoals: false,
  canBeRecurrent: true,
  canBeEdited: true,
  recurrence: {
      rule: "FREQ=DAILY;MASK=24",
      dateFr: "2024-02-13",
      dateTo: null,
      name: "Example Task",
      richThoughts: "{\"ops\":[{\"insert\":\"\"}]}",
      color: null,
      columnId: 1
  },
  assignee: null
}

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [appState, setAppState] = useState(exampleTask);

  function updateTask(newValue) {
    setAppState((prevState) => ({
      ...prevState,
      ...newValue
    }));
  };

  return (
    <AppContext.Provider value={{ appState, updateTask }}>
      {children}
    </AppContext.Provider>
  );
}