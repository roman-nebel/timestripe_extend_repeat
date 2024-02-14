import "./Modal.css"
import { useState, useContext } from "react";
import { DropdownButton, DropdownSubfolder } from "../Button/Button"
import { ruleParser, ruleCreator, updateRuleObject } from "../../utils/parsers";
import { AppContext } from "../../Context/Context";

function RecurrencePicker() {
  const { appState, updateTask } = useContext(AppContext);
  const [ selectedItem, setSelectedItem ] = useState(ruleParser(appState?.recurrence?.rule));

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
    if (selectedItem.freq !== value.freq) {
      updateRuleObject(value, appState)
    }
    setSelectedItem(value)
    updateTask({recurrence: value.freq === "OFF" ? undefined : {
      ...appState.recurrence,
      rule: ruleCreator(value)
      }})
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
          rule={selectedItem}
          selected={selectedItem?.freq === item.value}
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
          selected={selectedItem?.freq === "OFF"}
          onChange={handleChange}
        />
    </>
  )
}

export default function Modal({task, updateTask}) {
  return(
    <div className="demo theme_dark ContextMenu Dropdown Dropdown-menu Recurrence-menu _open" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="right-start">
      <RecurrencePicker task={task} onUpdateTask={updateTask} />
    </div>
  )
}