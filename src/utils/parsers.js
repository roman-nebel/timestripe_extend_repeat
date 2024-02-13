function hexToBinary(hexString) {
  if (!/^[0-9A-Fa-f]+$/.test(hexString)) {
    throw new Error('Неверный формат шестнадцатеричной строки');
  }

  const decimalValue = parseInt(hexString, 16);
  const binaryString = decimalValue.toString(2);
  const binaryArray = binaryString.split('').map(Number);

  return binaryArray;
}

function truncatedMask(mask, type) {
  const arr = hexToBinary(mask)
  let n = 0
  if (type === "DAILY") n = 7
  if (type === "MONTHLY") n = 12
  {
    if (n >= arr.length) {
      return arr;
    }
  
    const truncatedArray = arr.slice(arr.length - n);
    return truncatedArray;
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