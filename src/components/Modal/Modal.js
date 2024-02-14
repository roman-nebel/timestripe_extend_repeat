import "./Modal.css"
import { useState, useContext } from "react";
import { DropdownButton, DropdownSubfolder } from "../Button/Button"
import { ruleParser, ruleCreator } from "../../utils/parsers";
import { AppContext } from "../../Context/Context";

function RecurrencePicker() {
  const { appState, setAppState } = useContext(AppContext);
  const { rule } = appState?.recurrence
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

  function handleChange(value) {
    //Rule creator
    //POST fetch
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
          onSelect={setSelectedItem}
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
          onSelect={setSelectedItem}
        />
    </>
  )
}

export default function Modal({task, updateTask}) {
  return(
    <div className="theme_dark ContextMenu Dropdown Dropdown-menu Recurrence-menu _open" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="right-start">
      <RecurrencePicker task={task} onUpdateTask={updateTask} />
    </div>
  )
}