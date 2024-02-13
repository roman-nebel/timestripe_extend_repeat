import "./Button.css"
import { useState } from "react";

function SelectorButton({label, width}) {
  const [state, updateState] = useState(false)

  function clickHandler() {
    updateState(!state)
  }
  return (
    <div className={`DurationPicker-button _${width} RecurrenceSelector-button${state ? " _active" : "" }`} onClick={clickHandler}>{label}</div>
  )
}

function DaysSelector() {
  const days = ["M", "T", "W", "T", "F", "S", "S"]
  return(
    <div className="RecurrenceSettings">
      <span className="Recurrence-text_secondary">Repeat on:</span>
      <div className="RecurrenceSelectorList">
        {days.map((item, index) => {
          return(<SelectorButton key={index} label={item} width={"small"}/>)
        })}
      </div>
    </div>
  )
}

function MonthsSelector() {
  const days = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return(
    <div className="RecurrenceSettings">
      <span className="Recurrence-text_secondary">Repeat in:</span>
      <div className="RecurrenceSelectorList">
        {days.map((item, index) => {
          return(<SelectorButton key={index} label={item} width={"large"}/>)
        })}
      </div>
    </div>
  )
}

function ReccurentExpand({type, value}) {
  switch (type) {
    case "counter":
      return <>Counter</>
    case "selector":
      if (value === "weekdays") {
        return <DaysSelector />
      }
      if (value === "months") {
        return <MonthsSelector />
      }
    default: 
      return <></>
  }
}

export function DropdownButton({type, label, value, selected, onSelect}) {
  return(
    <div className={`RecurrenceItem${selected ? " _selected" : "" } RecurrenceItem-${type}`}>
      <button 
        type="button" 
        role="radio" 
        value={value} 
        onClick={() => onSelect(value)} 
        className="DropdownButton _size_default"
      >
        {label}
        {selected && 
          <svg className="Icon AssigneeDropdown-check" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.86304L6 11.863L14 3.86304" stroke="currentColor" strokeWidth="2"/>
          </svg>}
      </button>
      {selected && <ReccurentExpand type={type} value={value} />}
    </div>
  )
}