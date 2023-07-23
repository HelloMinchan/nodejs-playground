/**
 * The Node.js Event emitter
 * https://nodejs.dev/en/api/v20/events/
 */

const EventEmitter = require("events");

// init eventEmitter
const eventEmitter = new EventEmitter();

// create event listener (type 1)
eventEmitter.on("TEST_EVENT", () => {
  console.log("Hello Event1!");
});

// create event listener (type 2)
eventEmitter.addListener("TEST_EVENT", () => {
  console.log("Hello Event2!");
});

// create event one-time listener (type 3)
eventEmitter.once("TEST_EVENT", () => {
  console.log("Hello Event3!");
});

// trigger event
eventEmitter.emit("TEST_EVENT"); // Hello Event1! \n Hello Event2! \n Hello Event3!
eventEmitter.emit("TEST_EVENT"); // Hello Event1! \n Hello Event2!

/**
 * send paramters to event listener
 */
eventEmitter.on("TEST_PARAMETERS", (arg1, arg2) => {
  console.log(`arg1 : ${arg1}, arg2 : ${arg2}`);
});

eventEmitter.emit("TEST_PARAMETERS", 123, "hello"); // arg1 : 123, arg2 : hello

/**
 * get event listeners count
 */
let listenerCount = eventEmitter.listenerCount("TEST_EVENT");

console.log(listenerCount); // 2

/**
 * remove event listners
 */
const removeEventCallback = () => {
  console.log("Remove Test!");
};

// remove only one listener in runtime (type1)
eventEmitter.on("REMOVE_EVENT", removeEventCallback);

console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 1
eventEmitter.removeListener("REMOVE_EVENT", removeEventCallback);
console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 0

// remove only one listener in runtime (type2)
eventEmitter.on("REMOVE_EVENT", removeEventCallback);

console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 1
eventEmitter.off("REMOVE_EVENT", removeEventCallback);
console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 0

// remove all listener in runtime
eventEmitter.on("REMOVE_EVENT", removeEventCallback);
eventEmitter.on("REMOVE_EVENT", removeEventCallback);
eventEmitter.on("REMOVE_EVENT", removeEventCallback);

console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 3
eventEmitter.off("REMOVE_EVENT", removeEventCallback);
console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 2

console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 2
eventEmitter.removeAllListeners("REMOVE_EVENT");
console.log(eventEmitter.listenerCount("REMOVE_EVENT")); // 0
