import { useState } from "react";
import { DropdownButton } from "../Button/Button"

function RecurrencePicker({checkedValue = "off"}) {
  const [selectedItem, setSelectedItem] = useState(checkedValue);

  const items = [
    {
      label: "Daily",
      value: "daily",
      type: "counter"
    },
    {
      label: "Weekdays",
      value: "weekdays",
      type: "selector"
    },
    {
      label: "Weekly",
      value: "weekly",
      type: "counter"
    },
    {
      label: "Monthly",
      value: "monthly",
      type: "counter"
    },
    {
      label: "Specific months",
      value: "months",
      type: "selector"
    },
    {
      label: "Quarterly",
      value: "quarterly",
      type: "simple"
    },
    {
      label: "Every decade",
      value: "decade",
      type: "simple"
    },
];

  const handleSelect = (value) => {
    setSelectedItem(value);
  };

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
          selected={selectedItem === item.value}
          onSelect={handleSelect}
        />
      ))}
      </div>
      <hr></hr>
      {selectedItem !== "off" && 
        <>
          <DropdownButton
            key={0}
            type={"simple"}
            label={"End repeat"}
            onSelect={() => {}}
          />
          <hr></hr>
        </>
      }
      <DropdownButton
          key={-1}
          type={"simple"}
          value={"off"}
          label={"Do not repeat"}
          selected={selectedItem === "off"}
          onSelect={handleSelect}
        />
    </>
  )
}

export default function Modal({}) {
  return(
    <div className="theme_dark ContextMenu Dropdown Dropdown-menu _open" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="right-start">
      <RecurrencePicker />
    </div>
  )
}