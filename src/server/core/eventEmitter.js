/* eslint-disable no-unused-vars */
import {default as log} from '../../server/core/logger'
//create logger;
let logger = new log();
//helper function
let isFunction = function(obj) {
    return typeof obj == 'function' || false;
};

class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  addListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }
  removeListener(label, callback) {
      let listeners = this.listeners.get(label),
          index;

      if (listeners && listeners.length) {
          index = listeners.reduce((i, listener, index) => {
              return (isFunction(listener) && listener === callback) ?
                  i = index :
                  i;
          }, -1);

          if (index > -1) {
              listeners.splice(index, 1);
              this.listeners.set(label, listeners);
              return true;
          }
      }
      return false;
  }

  emit(label, ...args) {
      let listeners = this.listeners.get(label);

      if (listeners && listeners.length) {
          listeners.forEach((listener) => {
              listener(...args);
          });
          return true;
      }
      return false;
  }
}


class EventObserver {
  constructor(id, subject) {
    this.id = id;
    this.subject = subject;
    this.subject.addListener("change", (data) => this.onChange(data));
  }
  onChange(data) {
    logger.log(`${this.id} notified of change: ${data}`,'debug');
  }
}
