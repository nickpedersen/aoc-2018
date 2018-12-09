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

// This is similar to part one, except we do it in a map so that we can evaluate all guards
const guardSleepMinutes = Object.values(guardSleepCounts).map(guard => {
  const sleepMinutes = guard.minutesAsleep.reduce((data, current) => {
    return Object.assign({}, data, {
      [current]: (data[current] || 0) + 1
    });
  }, {});

  const [mostOccuringSleepMinute, timesAsleepOnMinute] = Object.entries(
    sleepMinutes
  ).sort((a, b) => b[1] - a[1])[0];

  // Store the data slightly differently, we need `timesAsleepOnMinute` so that we can find the maximum
  // And mostOccuringSleepMinute to generate the answer at the end
  return Object.assign({}, guard, {
    sleepMinutes,
    mostOccuringSleepMinute,
    timesAsleepOnMinute
  });
});

const mostOccuringSleepGuard = guardSleepMinutes.sort(
  (a, b) => b.timesAsleepOnMinute - a.timesAsleepOnMinute
)[0];

const answer =
  mostOccuringSleepGuard.id * mostOccuringSleepGuard.mostOccuringSleepMinute;

console.log(answer);
