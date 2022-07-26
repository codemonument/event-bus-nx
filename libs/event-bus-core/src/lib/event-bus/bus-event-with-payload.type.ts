import { BusEvent } from "./bus-event.type";

/**
 * I am the sub-class / base-class for all of the payload-heavy events that this
 * application pushes onto the MessageQueue. This class guarantees a payload with a
 * given interface.
 *
 * Was called 'EventWithPayload' in original article
 */
export abstract class BusEventWithPayload<T> extends BusEvent {
  public readonly payload: T;

  constructor(payload: T) {
    super();
    this.payload = payload;
  }
}
