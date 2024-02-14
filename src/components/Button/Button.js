import "./Button.css"
import { useState } from "react";

function SelectorButton({index, label, width, selected, onChange}) {
  const [state, updateState] = useState(selected)

  function clickHandler() {
    onChange(index, !state ? 1 : 0)
    updateState(!state)
  }
  return (
    <div className={`DurationPicker-button _${width} RecurrenceSelector-button${state ? " _active" : "" }`} onClick={clickHandler}>{label}</div>
  )
}

function ItemCounter({value, initCounter = 1}) {
  const [counter, setCounter] = useState(initCounter)
  let itemName = ""
  if (value === "DAILY") {
    itemName = "day"
  }
  if (value === "WEEKLY") {
    itemName = "week"
  }
  if (value === "MONTHLY") {
    itemName = "month"
  }
  if (counter > 1) {
    itemName += "s"
  }

  function changeHandler(event) {
    setCounter(event.target.value)
  }

  function blurHandler(event) {
    const num = Number(event.target.value)
    if (num < 1) setCounter(1)
    else if (num > 9) setCounter(9)
    else setCounter(num)
  }

  return(
    <div className="RecurrenceSettings CounterSettings">
      <span className="Recurrence-text_secondary">Repeat every</span>
      <input type="number" min={1} max={9} maxLength={1} className="DurationPicker-input RecurrenceInput" placeholder="0" value={counter} onChange={changeHandler} onBlur={blurHandler} />
      <span className="Recurrence-text_secondary">{itemName}</span>
    </div>
  )
}

function DaysSelector({rule, onChange}) {
  const [mask, changeMask] = useState([...rule?.mask || []])
  const days = ["M", "T", "W", "T", "F", "S", "S"]

  function changeHandler(index, value) {
    const newMask = days.map((item, i) => i === index ? value : mask[i] || 0)
    changeMask(newMask)
    onChange({mask: newMask})
  }
  return(
    <div className="RecurrenceSettings">
      <span className="Recurrence-text_secondary">Repeat on:</span>
      <div className="RecurrenceSelectorList">
        {days.map((item, index) => {
          return(<SelectorButton key={index} index={index} label={item} selected={mask[index]} onChange={changeHandler} width={"small"}/>)
        })}
      </div>
    </div>
  )
}

function MonthsSelector({rule, onChange}) {
  const [mask, changeMask] = useState([...rule?.mask || []])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  function changeHandler(index, value) {
    const newMask = months.map((item, i) => i === index ? value : mask[i] || 0)
    changeMask(newMask)
    onChange({mask: newMask})
  }

  return(
    <div className="RecurrenceSettings">
      <span className="Recurrence-text_secondary">Repeat in:</span>
      <div className="RecurrenceSelectorList">
        {months.map((item, index) => {
          return(<SelectorButton key={index} index={index} label={item} selected={mask[index]} onChange={changeHandler} width={"large"}/>)
        })}
      </div>
    </div>
  )
}

function ReccurentExpand({type, value, rule, onChange}) {
  switch (type) {
    case "counter":
      return <ItemCounter value={value} rule={rule} onChange={onChange} />
    case "selector":
      if (value === "WEEKDAYS") {
        return <DaysSelector rule={rule} onChange={onChange} />
      }
      if (value === "MONTHS") {
        return <MonthsSelector rule={rule} onChange={onChange} />
      }
    default: 
      return <></>
  }
}

export function DropdownButton({type, label, value, selected, rule, onChange}) {
  function selectHandler() {
    onChange({...rule, freq: value})
  }
  function changeHandler(value) {
    onChange({...rule, ...value})
  }
  return(
    <div className={`RecurrenceItem${selected ? " _selected" : "" } RecurrenceItem-${type}`}>
      <button 
        type="button" 
        role="radio" 
        value={value} 
        onClick={selectHandler} 
        className="DropdownButton _size_default"
      >
        {label}
        {selected && 
          <svg className="Icon AssigneeDropdown-check" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.86304L6 11.863L14 3.86304" stroke="currentColor" strokeWidth="2"/>
          </svg>}
      </button>
      {selected && <ReccurentExpand type={type} value={value} rule={rule} onChange={changeHandler} />}
    </div>
  )
}

export function DropdownSubfolder({label}) {
  return(
    <div className={`RecurrenceItem-simple`}>
      <button 
        type="button" 
        role="option" 
        onClick={() => {}} 
        className="DropdownButton _size_default"
      >
        {label}
        <svg className="Icon Dropdown-sub_menu_open_button-arrow TriangleArrowIcon" viewBox="0 -2 23 23" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(90deg)"}}><path d="M7.43408 14.6748L12.4341 9.67481L17.4341 14.6748" stroke="currentColor" strokeWidth="1.8"></path></svg>
      </button>
    </div>
  )
}