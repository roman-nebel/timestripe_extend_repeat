import "./Modal.css"
import { useState } from "react";
import { DropdownButton, DropdownSubfolder } from "../Button/Button"
import { ruleParser } from "../../utils/parsers";

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
      rule: "FREQ=MONTHLY;MASK=1F",
      dateFr: "2024-02-13",
      dateTo: null,
      name: "Example Task",
      richThoughts: "{\"ops\":[{\"insert\":\"\"}]}",
      color: null,
      columnId: 1
  },
  assignee: null
}

function RecurrencePicker({task, onUpdateTask}) {
  const { rule } = task?.recurrence
  const { freq, interval, mask } = ruleParser(rule)
  const [ selectedItem, setSelectedItem ] = useState(freq);

  const items = [
    {
      label: "Daily",
      value: "DAILY",
      type: "counter"
    },
    {
      label: "Weekdays",
      value: "WEEKDAYS",
      type: "selector"
    },
    {
      label: "Weekly",
      value: "WEEKLY",
      type: "counter"
    },
    {
      label: "Monthly",
      value: "MONTHLY",
      type: "counter"
    },
    {
      label: "Specific months",
      value: "MONTHS",
      type: "selector"
    },
    {
      label: "Quarterly",
      value: "QUARTERLY",
      type: "simple"
    },
    {
      label: "Yearly",
      value: "YEARLY",
      type: "simple"
    },
    {
      label: "Every decade",
      value: "DECADE",
      type: "simple"
    },
];

  function handleSelect(value) {
    setSelectedItem(value);
  };

  function handleChange(value) {
    console.log(value)
  }

  return(
    <>
      <div className="DropdownTitle" role="label">Days Horizon</div>
      <div>
      {items.map((item, index) => (
        <DropdownButton
          key={index}
          type={item.type}
          value={item.value}
          label={item.label}
          rule={mask || interval}
          selected={selectedItem === item.value}
          onSelect={handleSelect}
          onChange={handleChange}
        />
      ))}
      </div>
      <hr></hr>
      {selectedItem !== "OFF" && 
        <>
          <DropdownSubfolder
            key={0}
            type={"simple"}
            label={"End repeat"}
          />
          <hr></hr>
        </>
      }
      <DropdownButton
          key={-1}
          type={"simple"}
          value={"OFF"}
          label={"Do not repeat"}
          selected={selectedItem === "OFF"}
          onSelect={handleSelect}
        />
    </>
  )
}

export default function Modal() {
  const [task, updateTask] = useState(exampleTask)

  return(
    <div className="theme_dark ContextMenu Dropdown Dropdown-menu Recurrence-menu _open" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="right-start">
      <RecurrencePicker task={task} onUpdateTask={updateTask} />
    </div>
  )
}