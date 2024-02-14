# Timestripe Extend Repeat

## Links
[Google docs](https://docs.google.com/document/d/1bSqeVhmqKKvOSt69GCAkzanhN3IR7BxhGUxu4Fi5K9Q/edit?usp=sharing) | [Live demo](https://roman-nebel.github.io/timestripe_extend_repeat/) | [Figma file](https://www.figma.com/file/1P33NYZu7678XDKC5OMVNf/Timestripe?type=design&node-id=0%3A1&mode=design&t=aufn3fPivtabZoXL-1) | [Figma proto](https://www.figma.com/proto/1P33NYZu7678XDKC5OMVNf/Timestripe?page-id=0%3A1&type=design&node-id=2-135&viewport=184%2C256%2C0.13&t=RFOv4d9oEEONBEpT-1&scaling=min-zoom&starting-point-node-id=2%3A135&mode=design)

## How it works
I add new types of FREQ: WEEKDAYS and MONTHLY. They have use a new type of intervals, called MASK.

It is a hexadecimal representation of a set of binary values for each day of the week/month of the year. For example, **54** = **1010100** or days of the week (f this is equal to the selected Monday, Wednesday and Friday) or **0000001010100** for months(the selected June, August and October).

This approach ensured backward compatibility.

## Bugs
Yes, it has some.
1. Fix a situation, when I can deselect all the selectors in WEEKDAYS or MONTHS settings
2. Fix FREQ for QUARTERLY and DECADE to current format (with correct INTERVAL parameter)

## Notes
- I don't like the CRA. But it's the fastest way to start the project. In real projects I try no not use it.
- The project has many assumptions and extra code, because I dont know all the processes and agreements.