import "./Button.css"

function ReccurentSelection({type}) {
  switch (type) {
    case "counter":
      return <>Counter</>
    case "selector":
      return <>Selector</>
    default: 
      return <></>
  }
}

export function DropdownButton({type, label, value, selected, onSelect}) {
  return(
    <div className={`RecurrenceItem${selected ? " RecurrenceItem-selected" : "" } RecurrenceItem-${type}`}>
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
      {selected && <ReccurentSelection type={type} />}
    </div>
  )
}