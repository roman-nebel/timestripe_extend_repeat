function hexToBinary(hexString) {
  if (!/^[0-9A-Fa-f]+$/.test(hexString)) {
    throw new Error('Неверный формат шестнадцатеричной строки');
  }

  const decimalValue = parseInt(hexString, 16);
  const binaryString = decimalValue.toString(2);
  const binaryArray = binaryString.split('').map(Number);

  return binaryArray;
}

export function truncatedMask(mask, type) {
  const arr = hexToBinary(mask)
  let n = 0

  if (type === "DAILY") n = 7
  if (type === "MONTHLY") n = 12

  if (n >= arr.length) {
    const shiftedArray = new Array(n - arr.length).fill(0)
    return [...shiftedArray, ...arr];
  }

  const truncatedArray = arr.slice(arr.length - n);
  return truncatedArray;
}

export function ruleCreator(ruleObject) {
  try {
    let ruleString = `FREQ=${ruleObject.freq}`

    if (ruleObject.interval) {
      ruleString += `;INTERVAL=${ruleObject.interval}`
    }

    if (ruleObject.mask) {
      ruleString += `;MASK=${maskToRule(ruleObject.mask)}`
    }
    return ruleString
  } catch (e) {
    console.error("Error in ruleCreator!", e);
  }
}

export function ruleParser(rule) {
  try {
    if (!rule) {
      return {
        freq: "OFF"
      }
    }
    const [freq, period] = rule.split(";")
    const freqValue = freq.split("=")[1]
    const [periodType, periodValue] = period ? period.split("=") : []

    const ruleOject = {
      freq: freqValue,
    }

    if (freqValue === "MONTHLY" && periodValue === "3") {
      ruleOject.freq = "QUARTERLY"
    }

    if (freqValue === "YEARLY" && periodValue === "10") {
      ruleOject.freq = "DECADE"
    }
    
    if (periodType === "MASK") {
      ruleOject.mask = truncatedMask(periodValue, freqValue)

      if (freqValue === "DAILY") {
        ruleOject.freq = "WEEKDAYS"
      }
  
      if (freqValue === "MONTHLY") {
        ruleOject.freq = "MONTHS"
      }
    } else {
      ruleOject.interval = periodValue || "1"
    }
    return ruleOject
  } catch (e) {
    console.error("Error in ruleParser!", e);
    return {
      freq: "OFF"
    }
  }
}

export function maskToRule(binaryArray) {
  if (!binaryArray.every(bit => bit === 0 || bit === 1)) {
    throw new Error('Only 1 and 0 must be in the mask array!');
  }

  const binaryString = binaryArray.join('');

  const hexString = parseInt(binaryString, 2).toString(16).toUpperCase();

  return hexString;
}

export function updateRuleObject(value, appState) {
  if (value.freq === "WEEKDAYS") {
    const taskDate = new Date(appState.dueDate).getDay()
    const mask = new Array(7).fill(0)
    mask[taskDate] = 1
    value.mask = mask
    delete value.interval
  } else if (value.freq === "MONTHS") {
    const taskDate = new Date(appState.dueDate).getMonth()
    const mask = new Array(12).fill(0)
    mask[taskDate] = 1
    value.mask = mask
    delete value.interval
  } else if (value.freq === "OFF") {
    delete value.interval
    delete value.mask
  } else {
    value.interval = 1
    delete value.mask
  }
}