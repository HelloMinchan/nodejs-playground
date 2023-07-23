/**
 * The Node.js Event emitter
 * https://nodejs.dev/en/api/v20/events/
 */

const EventEmitter = require("node:events");

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

/**
 * Event emitter my usage
 */
let serviceEvent = null;

function getServiceEvent() {
  if (serviceEvent) {
    return serviceEvent;
  }

  return (serviceEvent = new ServiceEvent());
}

const eventTypes = {
  USER_SIGNUP: "SIGNUP",
  USER_INVITE_EVENT_CODE_REGISTER: "USER_INVITE_EVENT_CODE_REGISTER",
  SYSTEM_CREATE_DEFAULT_PROFILE: "SYSTEM_CREATE_DEFAULT_PROFILE",
  SYSTEM_PUSH_SIGNUP_CELEBRATION: "SYSTEM_PUSH_SIGNUP_CELEBRATION",
  SYSTEM_SEND_SIGNUP_EVENT_TO_AMPLITUDE:
    "SYSTEM_SEND_SIGNUP_EVENT_TO_AMPLITUDE",
};

class ServiceEvent extends EventEmitter {
  constructor() {
    super();

    /**
     * User Events
     */
    this.on(eventTypes.USER_SIGNUP, (data) => {
      try {
        console.log("processing user signup...", data);
      } catch (error) {
        console.error(error);
      }
    });

    this.on(eventTypes.USER_INVITE_EVENT_CODE_REGISTER, (data) => {
      try {
        console.log("processing user invite event code register...", data);
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * System Events
     */
    this.on(eventTypes.SYSTEM_CREATE_DEFAULT_PROFILE, (data) => {
      try {
        console.log("processing system create default profile...", data);
      } catch (error) {
        console.error(error);
      }
    });

    this.on(eventTypes.SYSTEM_PUSH_SIGNUP_CELEBRATION, (data) => {
      try {
        console.log("processing system push signup celebration...", data);
      } catch (error) {
        console.error(error);
      }
    });

    this.on(eventTypes.SYSTEM_SEND_SIGNUP_EVENT_TO_AMPLITUDE, (data) => {
      try {
        console.log(
          "processing system send signup event to amplitude...",
          data
        );
      } catch (error) {
        console.error(error);
      }
    });
  }
}

getServiceEvent();

(async function signupPostAPI(data) {
  serviceEvent.emit(eventTypes.USER_SIGNUP, data);
  serviceEvent.emit(eventTypes.USER_INVITE_EVENT_CODE_REGISTER, data);
  serviceEvent.emit(eventTypes.SYSTEM_CREATE_DEFAULT_PROFILE, data);
  serviceEvent.emit(eventTypes.SYSTEM_PUSH_SIGNUP_CELEBRATION, data);
  serviceEvent.emit(eventTypes.SYSTEM_SEND_SIGNUP_EVENT_TO_AMPLITUDE, data);

  return "200 OK";
})({ id: 123, name: "hello" }).then((res) => console.log(res));
