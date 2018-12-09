const fs = require("fs");

const input = fs.readFileSync("./input.txt");

let currentGuard = "";
const parsedInput = input
  .toString()
  .split("\n")
  // We can just sort the strings alphabetically since the timestamp occurs first
  .sort((a, b) => a.localeCompare(b))
  .map(line => {
    const [
      dateWithOpenBracket,
      timeWithCloseBracket,
      ...actionParts
    ] = line.split(" ");
    const action =
      actionParts[0] === "falls"
        ? "sleeps"
        : actionParts[0] === "wakes"
        ? "wakes"
        : "begins";

    // A begin action indicates the following actions belong to a new guard
    if (action === "begins") {
      currentGuard = actionParts[1];
    }
    return {
      date: dateWithOpenBracket.replace("[", ""),
      time: timeWithCloseBracket.replace("]", ""),
      action,
      guard: Number(currentGuard.replace("#", ""))
    };
  });

// Log all of the minutes guards are asleep
let lastSleep = null;
const guardSleepCounts = parsedInput
  .filter(a => a.action === "sleeps" || a.action === "wakes")
  .reduce((state, current) => {
    if (current.action === "sleeps") {
      lastSleep = current.time;
      return state;
    }
    if (current.action === "wakes") {
      const sleepMinute = Number(lastSleep.split(":")[1]);
      const wakeMinute = Number(current.time.split(":")[1]);
      const sleepDuration = wakeMinute - sleepMinute;
      const minutesAsleep = [...Array(sleepDuration).keys()].map(
        i => i + sleepMinute
      );
      return Object.assign({}, state, {
        [current.guard]: {
          totalSleepTime:
            ((state[current.guard] || {}).totalSleepTime || 0) + sleepDuration,
          minutesAsleep: [
            ...((state[current.guard] || {}).minutesAsleep || []),
            ...minutesAsleep
          ],
          id: current.guard
        }
      });
    }
  }, {});

// Find the guard that slept the most
const longestSleepingGuard = Object.values(guardSleepCounts).sort(
  (a, b) => b.totalSleepTime - a.totalSleepTime
)[0];

const guardSleepMinutes = longestSleepingGuard.minutesAsleep.reduce(
  (data, current) => {
    return Object.assign({}, data, {
      [current]: (data[current] || 0) + 1
    });
  },
  {}
);

const mostOccuringSleep = Object.entries(guardSleepMinutes).sort(
  (a, b) => b[1] - a[1]
)[0][0];

const answer = longestSleepingGuard.id * mostOccuringSleep;

console.log(answer);
